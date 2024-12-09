package com.quest.etna;
import java.util.Map;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import com.quest.etna.controller.AuthenticationController;
import com.quest.etna.model.Address;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import static org.hamcrest.CoreMatchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import com.quest.etna.repositories.AddressRepository;
import com.quest.etna.model.User;
import com.quest.etna.repositories.UserRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class ControllerTests {
	@Autowired
	protected MockMvc mockMvc;
	@Autowired
    private PasswordEncoder passwordEncoder;

    @Mock
    private UserRepository userRepository;
    @Mock
    private AddressRepository addressRepository;

    @InjectMocks
    private AuthenticationController authenticationController;

    private User testUser;
    private String token;
    @Before
    public void setUp() {
        testUser = new User();
        testUser.setUsername("testuser");
        testUser.setPassword("testpassword");
        userRepository.save(testUser);
    }
    @Test
    public void testAuthenticate() throws Exception {
        String jsonRequestBody = "{\"username\":\"" + testUser.getUsername() + "\",\"password\":\"" + testUser.getPassword() + "\"}";

        mockMvc.perform(post("/register")        		
        		.header(HttpHeaders.CONTENT_TYPE, "application/json")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRequestBody))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.username", is(testUser.getUsername())))
                .andExpect(jsonPath("$.role", is("ROLE_USER")))
                .andReturn();
                
     
        //conflit (l'user existe déjà)
        mockMvc.perform(post("/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRequestBody))
                .andExpect(status().isConflict());
        
        
        // Authentication Ok
      MvcResult result1 = mockMvc.perform(post("/authenticate")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRequestBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isString())
                .andDo(print())
                .andReturn();  
        
  
        String jsonResponse = result1.getResponse().getContentAsString();
        Map<String, Object> jsonMap = new ObjectMapper().readValue(jsonResponse, new TypeReference<Map<String, Object>>() {});
        this.token = "Bearer " + (String) jsonMap.get("token");

        // test route"/me" avec JWT token
        mockMvc.perform(get("/me")
                .header("Authorization", token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is(testUser.getUsername())))
                .andExpect(jsonPath("$.role", is(testUser.getRole().name())));
    
    }
    
    
    
    //-------------------------------------------------------------------
    @Test
    public void testUser() throws Exception {

        User testUser3 = new User();
        testUser3.setUsername("testuser3");
        testUser3.setPassword("testpassword3");
        
       // Test "/user" sans token
        mockMvc.perform(get("/user/"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.error").value("Unauthorized, JWT invalide ou absent"));
        String jsonRequestBody = "{\"username\":\"" + testUser3.getUsername() + "\",\"password\":\"" + testUser3.getPassword() + "\"}";

        
        // enregistrement 
        mockMvc.perform(post("/register")        		
        		.header(HttpHeaders.CONTENT_TYPE, "application/json")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRequestBody))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.role", is("ROLE_USER")))
                .andReturn();
                
        
        // Authentification avec token
      MvcResult result1 = mockMvc.perform(post("/authenticate")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRequestBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isString())
                .andDo(print())
                .andReturn();  
        
  
        String jsonResponse = result1.getResponse().getContentAsString();
        Map<String, Object> jsonMap = new ObjectMapper().readValue(jsonResponse, new TypeReference<Map<String, Object>>() {});
        this.token = "Bearer " + (String) jsonMap.get("token");

      
        mockMvc.perform(get("/user/")
        		.header("Authorization", token))
                .andExpect(status().isOk()); 
        
        
        
        // Suppression d'un autre user avec ROLE_USER
        mockMvc.perform(delete("/user/1")
        		.header("Authorization", token))
                .andExpect(status().isForbidden());
        
        // Suppression d'un autre user avec ROLE_ADMIN
      MvcResult result3 = mockMvc.perform(post("/authenticate")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\":\"admin" + "\",\"password\":\"password"  + "\"}"))
    		  .andReturn();
      String jsonResponseAdmin = result3.getResponse().getContentAsString();
      Map<String, Object> jsonMap2 = new ObjectMapper().readValue(jsonResponseAdmin, new TypeReference<Map<String, Object>>() {});
      String tokenAdmin = "Bearer " + (String) jsonMap2.get("token");
    
        
        mockMvc.perform(delete("/user/3").header("Authorization", tokenAdmin))
        		.andExpect(status().isOk());
    }
    
    
    
    
    //__________________________________________________________
    @Test
    public void testAddress() throws Exception {
    	 
    	//sans token Bearer
    	mockMvc.perform(get("/address"))
        .andExpect(status().isUnauthorized())
        .andExpect(jsonPath("$.error").value("Unauthorized, JWT invalide ou absent"));
    	
    	//avec un token valide
        String jsonRequestBody = "{\"username\":\"" + testUser.getUsername() + "\",\"password\":\"" + testUser.getPassword() + "\"}";

        MvcResult result1 = mockMvc.perform(post("/authenticate")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRequestBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isString())
                .andDo(print())
                .andReturn();  
        
        String jsonResponse = result1.getResponse().getContentAsString();
        Map<String, Object> jsonMap = new ObjectMapper().readValue(jsonResponse, new TypeReference<Map<String, Object>>() {});
        this.token = "Bearer " + (String) jsonMap.get("token");
       
        mockMvc.perform(get("/address")
        		.header("Authorization", token))
        		.andDo(print())
                .andExpect(status().isOk());
         
        
        //l'ajout d'une adresse avec un token Bearer valide,  : 
        String addressJson = "{"
                + "\"street\": \"rue de la paix\","
                + "\"city\": \"Paris\","
                + "\"country\": \"France\","
                + "\"postalCode\": \"75000\""
                + "}";

      
        mockMvc.perform(post("/address")
        		.header("Authorization", token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(addressJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.street", is("rue de la paix")))
                .andExpect(jsonPath("$.city", is("Paris")))
                .andExpect(jsonPath("$.country", is("France")))
                .andExpect(jsonPath("$.postalCode", is("75000")));
        
      

        // Authenticate with the registered admin
        MvcResult result3 = mockMvc.perform(post("/authenticate")
                  .contentType(MediaType.APPLICATION_JSON)
                  .content("{\"username\":\"admin" + "\",\"password\":\"password"  + "\"}"))
      		  .andReturn();
        String jsonResponseAdmin = result3.getResponse().getContentAsString();
        Map<String, Object> jsonMap2 = new ObjectMapper().readValue(jsonResponseAdmin, new TypeReference<Map<String, Object>>() {});
        String tokenAdmin = "Bearer " + (String) jsonMap2.get("token");
        String addressJson2 = "{"
                + "\"street\": \"rue du soleil \","
                + "\"city\": \"Nice\","
                + "\"country\": \"France\","
                + "\"postalCode\": \"75000\""
                + "}";

      // ajout d'une adresse 
        mockMvc.perform(post("/address")
        		.header("Authorization", tokenAdmin)
                .contentType(MediaType.APPLICATION_JSON)
                .content(addressJson2));
        
        //suppression de l'adresse qui n'appartient pas à l'utilisateur connecté avec ROLE_ADMIN
        mockMvc.perform(delete("/address/1")
        		.header("Authorization", tokenAdmin))
                .andExpect(status().isOk()); 
     
        // Tentative de suppression de l'adresse qui n'appartient pas à l'utilisateur connecté avec ROLE_USER
        mockMvc.perform(delete("/address/2")
        		.header("Authorization", token))
                .andExpect(status().isForbidden());
    }


    }
    
    
   

