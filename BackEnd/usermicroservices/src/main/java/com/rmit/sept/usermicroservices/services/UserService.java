package com.rmit.sept.usermicroservices.services;




import com.rmit.sept.usermicroservices.repositories.UserRepository;
import com.rmit.sept.usermicroservices.exceptions.UsernameAlreadyExistsException;
import com.rmit.sept.usermicroservices.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Collection;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser (User newUser){

      /*  newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
        //Username has to be unique (exception)
        // Make sure that password and confirmPassword match
        // We don't persist or show the confirmPassword
        return userRepository.save(newUser);
       */
        try{
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            //Username has to be unique (exception)
            newUser.setUsername(newUser.getUsername());
            // Make sure that password and confirmPassword match
            // We don't persist or show the confirmPassword
            newUser.setConfirmPassword("");
            return userRepository.save(newUser);

        }catch (Exception e){
            throw new UsernameAlreadyExistsException("Username '"+newUser.getUsername()+"' already exists");
        }

    }

    public User getUser(String username)
    {
        return userRepository.getUser(username);
    }
    public void changePassword(String username, String password)
    {
        userRepository.changePassword(username, bCryptPasswordEncoder.encode(password));
    }


    public Collection<User> getAllUsers()
    {
        return (Collection<User>)userRepository.findAll();
    }

    public void changeUserType(String username, String userTypeRequest)
    {
        userRepository.changeUserType(username, userTypeRequest);
    }

    public void changeDetail(String username, String displayName, String fullName, String userTypeRequest)
    {
        userRepository.changeDetail(username, displayName, fullName, userTypeRequest);
    }

    public void deleteUser(Long id)
    {
        userRepository.deleteById(id);
    }
}
