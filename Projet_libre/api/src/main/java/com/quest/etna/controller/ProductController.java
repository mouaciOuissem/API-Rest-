package com.quest.etna.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

import com.quest.etna.model.Product;
import com.quest.etna.repositories.ProductRepository;

import exception.ErrorResponse;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/products")
public class ProductController {
	
	
	@Autowired
	private  ProductRepository productRepository;
	
	@CrossOrigin
	@GetMapping("/")
	public ResponseEntity<?> getProducts(){
		Iterable<Product> products  = productRepository.findAll();
		return new ResponseEntity<>(products,HttpStatus.OK);	
		}

	@GetMapping("/{id}")
	public ResponseEntity<?> getUserById(@PathVariable int id) {
        Product product = productRepository.findById(id);
        if (product!= null) {      	
    		return new ResponseEntity<>(product,HttpStatus.OK);   	                       
        } else {
        	String errorMessage = "The requested product was not found.";
            ErrorResponse errorResponse = new ErrorResponse(errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);      
        	}
    }

	 @PostMapping("")
	    public ResponseEntity<?> createProduct( @RequestBody Product newProduct) {
	        // Vérifier si l'utilisateur est admin
	        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	        boolean isAdmin = authentication.getAuthorities().stream()
	                            .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));

	        if (isAdmin) {	        	
	        	Product savedProduct= productRepository.save(newProduct);
	        	
	            return ResponseEntity.ok(savedProduct);
	        }
	        // Retourner une réponse 403 (forbidden) si l'utilisateur n'est pas authentifié ou si l'utilisateur courant n'existe pas
	        String errorMessage = "Acces denied";
	        ErrorResponse errorResponse = new ErrorResponse(errorMessage);
	        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);        
	    	}


	@PutMapping("/{id}")
	public ResponseEntity<?> updateProduct(@PathVariable int id, @RequestBody Product productToUpdate) {
	    Product product = productRepository.findById(id);
	    if (product != null) {
	        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	        boolean isAdmin = authentication.getAuthorities().stream()
	                            .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));

	        if (isAdmin) {
	            // Si l'utilisateur connecté est un admin, il peut modifier le produit
	        	
	        	 if (productToUpdate.getName() != null) {
	        		 product.setName(productToUpdate.getName());
	             }
	             if (productToUpdate.getPrice() != 00) {
	 	        	product.setPrice(productToUpdate.getPrice());
	             }
	             if (productToUpdate.getDescription() != null) {
	 	        	product.setDescription(productToUpdate.getDescription());
	             }
	             if (productToUpdate.getImage() != null) {
		 	        	product.setImage(productToUpdate.getImage());
		             }
	        	
	        	Product savedProduct= productRepository.save(product);
	            return ResponseEntity.ok(savedProduct);
	        }
	        else {
	            // Si l'utilisateur connecté n'a ni le rôle admin ni le même nom d'utilisateur que l'utilisateur ciblé, il ne peut pas effectuer la modification
	        	String errorMessage = "Acces denied";
	            ErrorResponse errorResponse = new ErrorResponse(errorMessage);
	            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);     
	        }
	    } else {
        	String errorMessage = "The requested product was not found.";
            ErrorResponse errorResponse = new ErrorResponse(errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);      
	    	}
	}

	@DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable int id) {
        Product product = productRepository.findById(id);

        if (product != null) {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            boolean isAdmin = authentication.getAuthorities().stream()
                                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
            if (isAdmin){
            	productRepository.delete(product);
                return ResponseEntity.ok("Product has been successfully deleted");
               
            } else {
            	String errorMessage = "Acces denied";
                ErrorResponse errorResponse = new ErrorResponse(errorMessage);
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);                
            	}
        } else {
        	String errorMessage = "The requested product was not found.";
            ErrorResponse errorResponse = new ErrorResponse(errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);          
        	}
    }
	

}

