package com.rmit.sept.usermicroservices.Repositories;

import com.rmit.sept.usermicroservices.model.User;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    User findByUsername(String username);
    User getById(Long id);
    
    @Query(value = "SELECT * FROM USER WHERE USERNAME = ?1", nativeQuery = true)
    User getUser( String username);
}
