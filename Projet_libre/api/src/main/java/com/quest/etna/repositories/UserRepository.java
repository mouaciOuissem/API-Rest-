package com.quest.etna.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import com.quest.etna.model.User;
import com.quest.etna.model.UserDetails;


public interface UserRepository extends CrudRepository<User,Integer>{

    User findByUsername(String username);

	void save(UserDetails userDetails);

	User findById(int id);
	Iterable<User> findAll();
    
}
