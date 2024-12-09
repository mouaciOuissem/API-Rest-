package com.quest.etna.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quest.etna.model.Address;
import com.quest.etna.model.JwtUserDetails;
import com.quest.etna.model.User;
import com.quest.etna.model.UserDetails;
import com.quest.etna.model.UserRole;
import com.quest.etna.repositories.UserRepository;

import exception.ErrorResponse;

import java.util.ArrayList;

@CrossOrigin(origins = "http://127.0.01:3000")
@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private  UserRepository userRepository;
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/")
	public ResponseEntity<?> getAllUsers() {
	    Iterable<User> users = userRepository.findAll();
	    List<UserDetails> userDetailsList = new ArrayList<>();
	    for (User user : users) {
	        userDetailsList.add(new UserDetails(user.getUsername(), user.getRole()));
	        
	    }
	    return ResponseEntity.ok(userDetailsList);
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getUserById(@PathVariable int id) {
        User user = userRepository.findById(id);
        if (user!= null) {      	
    		return new ResponseEntity<>(new UserDetails(user.getUsername(),user.getRole()),HttpStatus.OK);   	                       
        } else {
        	String errorMessage = "The requested user was not found.";
            ErrorResponse errorResponse = new ErrorResponse(errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);      
        	}
    }

	@PutMapping("/{id}")
	public ResponseEntity<?> updateUser(@PathVariable int id, @RequestBody User updatedUser) {
	    if(id ==1) {
	    	String errorMessage = "Acces denied";
            ErrorResponse errorResponse = new ErrorResponse(errorMessage);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);     
	    }
	    User user = userRepository.findById(id);
	    if (user != null) {
	        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	        String username = authentication.getName();
	        boolean isAdmin = authentication.getAuthorities().stream()
	                            .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));

	        if(!isAdmin && user.getUsername().equals(username)){
	            // Si l'utilisateur connecté n'est pas un admin, il ne peut modifier que son propre nom d'utilisateur
	            user.setUsername(updatedUser.getUsername());
	            User savedUser = userRepository.save(user);
	            return ResponseEntity.ok(savedUser);
	        }
	        else if (isAdmin) {
	            // Si l'utilisateur connecté est un admin, il peut modifier le nom d'utilisateur et le rôle de l'utilisateur ciblé
	            user.setUsername(updatedUser.getUsername());
	            user.setRole(updatedUser.getRole());
	            User savedUser = userRepository.save(user);
	            return ResponseEntity.ok(savedUser);
	        }
	        else {
	            // Si l'utilisateur connecté n'a ni le rôle admin ni le même nom d'utilisateur que l'utilisateur ciblé, il ne peut pas effectuer la modification
	        	String errorMessage = "Acces denied";
	            ErrorResponse errorResponse = new ErrorResponse(errorMessage);
	            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);     
	        }
	    } else {
        	String errorMessage = "The requested user was not found.";
            ErrorResponse errorResponse = new ErrorResponse(errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);      
	    	}
	}
 
	@DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable int id) {
        User user = userRepository.findById(id);
        if(id ==1) {
        	String errorMessage = "Acces denied";
            ErrorResponse errorResponse = new ErrorResponse(errorMessage);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);     
        }
        if (user != null) {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            boolean isAdmin = authentication.getAuthorities().stream()
                                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
            if (isAdmin || user.getUsername().equals(username)) {
                userRepository.delete(user);
                return ResponseEntity.ok("User has been successfully deleted");
               
            } else {
            	String errorMessage = "Acces denied";
                ErrorResponse errorResponse = new ErrorResponse(errorMessage);
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);                
            	}
        } else {
        	String errorMessage = "The requested user was not found.";
            ErrorResponse errorResponse = new ErrorResponse(errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);          
        	}
    }
	

}
