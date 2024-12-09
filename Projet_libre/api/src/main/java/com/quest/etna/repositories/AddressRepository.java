package com.quest.etna.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.quest.etna.model.Address;
import com.quest.etna.model.User;

public interface AddressRepository extends CrudRepository<Address,Integer>{
	
	Optional<Address> findById(Integer id);
	
	Address save(Address address);

	List<Address> findAllByUserUsername(String username);
}
