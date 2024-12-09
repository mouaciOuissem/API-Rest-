package com.quest.etna.repositories;

import org.springframework.data.repository.CrudRepository;

import com.quest.etna.model.Product;

public interface ProductRepository extends CrudRepository<Product,Integer> {

	Product findById(int id);
	//Product findAll(int id);
	Product save(Product product);
	Iterable<Product> findAll();

}
