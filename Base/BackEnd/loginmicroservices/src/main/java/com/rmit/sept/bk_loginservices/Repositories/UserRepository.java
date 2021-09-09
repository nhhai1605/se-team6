package com.rmit.sept.bk_loginservices.Repositories;

import com.rmit.sept.bk_loginservices.model.User;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    User findByUsername(String username);
    User getById(Long id);
    
    @Query(value = "SELECT * FROM USER WHERE USERNAME = ?1 AND PASSWORD = ?2", nativeQuery = true)
    User checkUser( String username,  String password);
}
