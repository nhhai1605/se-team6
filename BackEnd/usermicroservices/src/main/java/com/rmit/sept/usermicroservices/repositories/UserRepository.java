package com.rmit.sept.usermicroservices.repositories;

import com.rmit.sept.usermicroservices.model.User;


import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    User findByUsername(String username);
    User getById(Long id);
    
    @Query(value = "SELECT * FROM USER WHERE USERNAME = ?1", nativeQuery = true)
    User getUser(String username);

    @Modifying
    @Transactional
    @Query(value="UPDATE USER SET PASSWORD=?2 WHERE USERNAME=?1", nativeQuery = true)
    void changePassword(String username, String password);

    @Modifying
    @Transactional
    @Query(value="UPDATE USER SET USERTYPE=?2, USERTYPEREQUEST='None' WHERE USERNAME=?1", nativeQuery = true)
    void changeUserType(String username, String newUserType);

    @Modifying
    @Transactional
    @Query(value="UPDATE USER SET USERTYPEREQUEST=?4, DISPLAYNAME=?2, FULLNAME=?3 WHERE USERNAME=?1", nativeQuery = true)
    void changeDetail(String username, String displayName, String fullName, String userTypeRequest);
}
