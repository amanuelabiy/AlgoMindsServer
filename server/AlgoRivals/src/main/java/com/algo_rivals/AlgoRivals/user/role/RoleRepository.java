package com.algo_rivals.AlgoRivals.user.role;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// Call these explicitly when you want to use them
public interface RoleRepository extends JpaRepository<Role, Integer> {

    Optional<Role> findByName(String name);

}
