package com.quest.etna.repositories;

import org.springframework.data.repository.CrudRepository;
import com.quest.etna.model.User;
import com.quest.etna.model.UserDetails;


public interface UserRepository extends CrudRepository<User,Long>{

    User findByUsername(String username);

	void save(UserDetails userDetails);
    
}
