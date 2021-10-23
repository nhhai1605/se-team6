package com.rmit.sept.usermicroservices.web;


import com.rmit.sept.usermicroservices.model.User;
import com.rmit.sept.usermicroservices.payload.*;
import com.rmit.sept.usermicroservices.security.JwtTokenProvider;
import com.rmit.sept.usermicroservices.services.CustomUserDetailsService;
import com.rmit.sept.usermicroservices.services.MapValidationErrorService;
import com.rmit.sept.usermicroservices.services.UserService;
import com.rmit.sept.usermicroservices.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.Collection;

import static com.rmit.sept.usermicroservices.security.SecurityConstant.TOKEN_PREFIX;


@RestController
@CrossOrigin(origins = "http://sept-team6.us-east-1.elasticbeanstalk.com")
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result){
        userValidator.validate(user,result);
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null)return errorMap;

        //This will be deleted in the future
        if(user.getUserTypeRequest().equals("Admin"))
        {
            user.setUserType("Admin");
            user.setUserTypeRequest("");
        }
        User newUser = userService.saveUser(user);
        return  new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }
    @PostMapping("/changePassword")
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePasswordRequest request, BindingResult result)
    {
        userValidator.changePasswordValidate(request,result);
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null)
        {
            return errorMap;
        }
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    request.getUsername(),
                    request.getPassword()
            )
        );
        userService.changePassword(request.getUsername(), request.getNewPassword());
        return ResponseEntity.ok("Change Password Successfully!");
    }

    @PostMapping("/changeDetail")
    public ResponseEntity<?> changeDetail(@Valid @RequestBody ChangeDetailRequest request, BindingResult result)
    {
        userValidator.changeDetailValidate(request,result);
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null)
        {
            return errorMap;
        }
        userService.changeDetail(request.getUsername(), request.getDisplayName(), request.getFullName(), request.getUserTypeRequest());
        return ResponseEntity.ok("Change Password Successfully!");
    }
    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX +  tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JWTLoginSucessReponse(true, jwt));
    }

    @GetMapping("/getUser")
    public ResponseEntity<?> getUser(@RequestParam("username") String username){
        User newUser = userService.getUser(username);
        return  new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public @ResponseBody Collection<User> getAllUsers()
    {
        Collection<User> users = userService.getAllUsers();
        return users;
    }

    @PostMapping("/changeUserType")
    public ResponseEntity<?> changeUserType(@Valid @RequestBody UserTypeRequest typeRequest){
        if(typeRequest.getStatus().equals("Approve"))
        {
            userService.changeUserType(typeRequest.getUsername(), typeRequest.getUserTypeRequest());
        }
        else //Reject
        {
            userService.changeUserType(typeRequest.getUsername(), typeRequest.getUserType());
        }
        return new ResponseEntity<>("OK", HttpStatus.CREATED);
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id)
    {
        userService.deleteUser(id);
        return new ResponseEntity<>("OK", HttpStatus.CREATED);
    }
}
