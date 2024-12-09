package com.quest.etna.controller;
import com.fasterxml.jackson.databind.node.ObjectNode;
import exception.ErrorResponse;
import com.quest.etna.model.Address;
import java.util.Map;
import java.util.HashMap;
import com.quest.etna.model.User;
import com.quest.etna.model.UserRole;
import com.quest.etna.repositories.AddressRepository;
import com.quest.etna.repositories.UserRepository;
import java.util.Optional;
import java.util.List;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/address")
public class AddressController {
	
	@Autowired
	private AddressRepository addressRepository;
	
	@Autowired
	private static UserRepository userRepository;
    @Autowired
    public AddressController(AddressRepository addressRepository, UserRepository userRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }
	
    @GetMapping("")
    public ResponseEntity<?> getAllAddresses(Authentication authentication) {
        Iterable<Address> addresses;
        String username = authentication.getName();
        boolean isAdmin = authentication.getAuthorities().stream()
                            .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
        if (isAdmin) {
            // Si l'utilisateur a le rôle ADMIN, renvoie toutes les adresses
            addresses = addressRepository.findAll();
        } else {
            // Récupère toutes les adresses créées par l'utilisateur
            addresses = addressRepository.findAllByUserUsername(username);
        }
        return ResponseEntity.ok(addresses);
    }



    @GetMapping("/{id}")
    public ResponseEntity<?> getAddressById(@PathVariable int id) {
        Optional<Address> optionalAddress = addressRepository.findById(id);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
     
        boolean isAdmin = authentication.getAuthorities().stream()
                            .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
        if (optionalAddress.isEmpty()) {
        	String errorMessage = "The requested address was not found.";
            ErrorResponse errorResponse = new ErrorResponse(errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);     
            }
        
        Address address = optionalAddress.get();
        if (!isAdmin && !address.getUser().getUsername().equals(authentication.getName())) {
            // Si l'utilisateur n'a pas le rôle ADMIN et que l'adresse ne lui appartient pas, renvoie une réponse avec le code 403 (Forbidden)
        	String errorMessage = "Acces denied";
            ErrorResponse errorResponse = new ErrorResponse(errorMessage);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);     

        } 
        return ResponseEntity.ok(address);
    }



    @PostMapping("")
    public ResponseEntity<?> createAddressForCurrentUser(@RequestBody Address newAddress) {
        // Vérifier si l'utilisateur est authentifié
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String currentUserName = authentication.getName();
            User currentUser = userRepository.findByUsername(currentUserName);
            if (currentUser != null) {
                newAddress.setUser(currentUser);
                Address savedAddress = addressRepository.save(newAddress);
                return ResponseEntity.status(HttpStatus.CREATED).body(savedAddress);
            }
        }
        // Retourner une réponse 403 (forbidden) si l'utilisateur n'est pas authentifié ou si l'utilisateur courant n'existe pas
        String errorMessage = "Acces denied";
        ErrorResponse errorResponse = new ErrorResponse(errorMessage);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);        
    	}


 
    @PutMapping("/{id}")
    public ResponseEntity<?> updateAddress(@PathVariable int id, @RequestBody Address address) {
        Optional<Address> optionalAddress = addressRepository.findById(id);
        if (optionalAddress.isPresent()) {
            Address existingAddress = optionalAddress.get();
            // Vérifie si l'utilisateur est autorisé à mettre à jour l'adresse
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            boolean isAdmin = authentication.getAuthorities().stream()
                                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
            if (!existingAddress.getUser().getUsername().equals(SecurityContextHolder.getContext().getAuthentication().getName())
                    && !isAdmin) {
            	String errorMessage = "Acces denied";
                ErrorResponse errorResponse = new ErrorResponse(errorMessage);
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);     
            }
            if (address.getCity() != null) {
                existingAddress.setCity(address.getCity());
            }
            if (address.getStreet() != null) {
                existingAddress.setStreet(address.getStreet());
            }
            if (address.getCountry() != null) {
                existingAddress.setCountry(address.getCountry());
            }
            if (address.getPostalCode() != null) {
                existingAddress.setPostalCode(address.getPostalCode());
            }
            Address updatedAddress = addressRepository.save(existingAddress);
 
            return ResponseEntity.status(HttpStatus.OK).body(updatedAddress);
            } else {      	
        	String errorMessage = "The requested address was not found.";
            ErrorResponse errorResponse = new ErrorResponse(errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);     
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAddress(@PathVariable int id) {
        Optional<Address> optionalAddress = addressRepository.findById(id);
        if (optionalAddress.isPresent()) {
            Address address = optionalAddress.get();
            // Vérifie si l'utilisateur est autorisé à supprimer l'adresse
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            boolean isAdmin = authentication.getAuthorities().stream()
                                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
            if (!address.getUser().getUsername().equals(SecurityContextHolder.getContext().getAuthentication().getName())
                    && !isAdmin) {
            	String errorMessage = "Acces denied";
                ErrorResponse errorResponse = new ErrorResponse(errorMessage);
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);     
            }
            addressRepository.delete(address);
            // Renvoyer la réponse HTTP avec un corps JSON
            Map<String, Boolean> response = new HashMap<>();
            response.put("success", true);
            return ResponseEntity.status(HttpStatus.OK).body(response);   

        } else {
        	String errorMessage = "The requested address was not found.";
            ErrorResponse errorResponse = new ErrorResponse(errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);     
        }
    }


}
