package com.quest.etna.controller;
import com.quest.etna.repositories.*;

import java.util.HashMap;

import com.quest.etna.config.JwtRequestFilter;
import com.quest.etna.config.JwtTokenUtil;
import com.quest.etna.config.JwtUserDetailsService;
import com.quest.etna.model.*;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AuthenticationController {
	@Autowired
	private static UserRepository userRepository;

	@Autowired
	public void init(UserRepository userRepository) {
	    AuthenticationController.userRepository = userRepository;
	}
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	@Autowired
	private JwtUserDetailsService jwtUserDetailsService;
	@Autowired
    private PasswordEncoder passwordEncoder;
	private JwtRequestFilter jwtRequestFilter;
	 public AuthenticationController() {
	        this.jwtRequestFilter = new JwtRequestFilter();
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
				e.printStackTrace();
			}
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(json);
	    }

	    //Duplicata 409, si user existe déjà
	    if(userRepository.findByUsername(username) != null) {
	        Map<String, String> responseBody = new HashMap<>();
	        responseBody.put("error", "Username already exists, please try again");
	        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.CONFLICT).body(responseBody);
	        return response;
	    }

	    //Success:  ajout d'un nouveau user
	    if(userRepository.findByUsername(username) == null) {
	        User newUser = new User();
	        newUser.setUsername(username);
	        newUser.setPassword(passwordEncoder.encode(password));
	        userRepository.save(newUser);
	        

	        UserDetails userDetails = new UserDetails(newUser.getUsername(),newUser.getRole());
	        userRepository.save(userDetails);
	        return ResponseEntity.status(HttpStatus.CREATED).body(userDetails);	        
	    }
	    else {
	    	System.out.println("error");
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error");
	        
	    }
	}
	
	@PostMapping("/authenticate")
	public ResponseEntity<?> authenticate(@RequestBody Map<String, String> user) {
		
	    String username = user.get("username");
	    String password = user.get("password");

	    try {
	        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
	        System.out.println("test"+username+password);
	    } catch (BadCredentialsException e) {
	        Map<String, String> responseBody = new HashMap<>();
	        responseBody.put("error", "Invalid username or password");
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
	    }
	    
	    org.springframework.security.core.userdetails.UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(username);
	    
	    final String token = jwtTokenUtil.generateToken(userDetails);
	    
	    Map<String, String> responseBody = new HashMap<>();
	    responseBody.put("token", token);

	    return ResponseEntity.ok(responseBody);
	   
	}

	@GetMapping("/me")
	public ResponseEntity<?> me(){
		JwtUserDetails userDetails= (JwtUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user =userRepository.findByUsername(userDetails.getUsername());
		return new ResponseEntity<>(new UserDetails(user.getUsername(),user.getRole()),HttpStatus.OK);
	}
	 
	}
