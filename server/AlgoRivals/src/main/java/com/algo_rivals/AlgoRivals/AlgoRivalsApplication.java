package com.algo_rivals.AlgoRivals;

import com.algo_rivals.AlgoRivals.user.role.Role;
import com.algo_rivals.AlgoRivals.user.role.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
public class AlgoRivalsApplication {

	public static void main(String[] args) {
		SpringApplication.run(AlgoRivalsApplication.class, args);
	}

	// This is a bean that will run when the application starts
	// It will check if the role "USER" exists in the database
	// If it does not exist, it will create it
	@Bean
	public CommandLineRunner runner(RoleRepository roleRepository){
		return args -> {
			if (roleRepository.findByName("USER").isEmpty()){
				roleRepository.save(Role.builder().name("USER").build());
			}
		};
	}

}
