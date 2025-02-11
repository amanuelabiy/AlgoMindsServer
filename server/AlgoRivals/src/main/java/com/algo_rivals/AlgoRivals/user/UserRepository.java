package com.algo_rivals.AlgoRivals.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// Call these explicitly when you want to use them
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);


}
