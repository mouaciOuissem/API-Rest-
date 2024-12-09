package com.quest.etna.controller;
import com.quest.etna.repositories.*;
import java.util.HashMap;
import com.quest.etna.model.*;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class AuthenticationController {
	@Autowired
	private static UserRepository userRepository;

	@Autowired
	public void init(UserRepository userRepository) {
	    AuthenticationController.userRepository = userRepository;
	}

	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody Map<String, String> user) {
	    String username = user.get("username");
	    String password = user.get("password");
	    
	    if (password == null || password.isEmpty()) {
	        Map<String, String> responseBody = new HashMap<>();
	        responseBody.put("error", "Password is required");
	        ObjectMapper mapper = new ObjectMapper();
	        String json = null;
			try {
				json = mapper.writeValueAsString(responseBody);
			} catch (JsonProcessingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(json);
	    }
	    if (username == null || username.isEmpty()) {
	        Map<String, String> responseBody = new HashMap<>();
	        responseBody.put("error", "Username is required");
	        ObjectMapper mapper = new ObjectMapper();
	        String json = null;
			try {
				json = mapper.writeValueAsString(responseBody);
			} catch (JsonProcessingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(json);
	    }

	    //Duplicata 409, un user existe déjà
	    if(userRepository.findByUsername(username) != null) {
	        Map<String, String> responseBody = new HashMap<>();
	        responseBody.put("error", "Username already exists, please try again");
	        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.CONFLICT).body(responseBody);
	        return response;
	    }


	    

	    //Success :
	    if(userRepository.findByUsername(username) == null) {
	        User newUser = new User();
	        newUser.setUsername(username);
	        newUser.setPassword(password);
	        userRepository.save(newUser);
	        

	        UserDetails userDetails = new UserDetails();
	        userDetails.setId(newUser.getId());
	        userDetails.setUsername(username);
	        userRepository.save(userDetails);
	        return ResponseEntity.status(HttpStatus.CREATED).body(userDetails);
	        //return ResponseEntity.status(HttpStatus.CREATED).body(userDetails.getUsername(),userDetails.getRole());
	    }
	    else {
	    	System.out.println("error");
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error");
	        
	    }
	}

}
