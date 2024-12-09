package com.quest.etna;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.CrossOrigin;
@CrossOrigin(origins = "http://localhost:3000")
@SpringBootApplication
@EnableJpaRepositories("com.quest.etna.repositories")
@EntityScan("com.quest.etna.model")
public class QuestWebJavaApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuestWebJavaApplication.class, args);
	}

}
