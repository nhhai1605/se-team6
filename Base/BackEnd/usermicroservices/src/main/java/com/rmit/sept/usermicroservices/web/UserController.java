package com.rmit.sept.usermicroservices.web;


import com.rmit.sept.usermicroservices.model.User;
import com.rmit.sept.usermicroservices.payload.JWTLoginSucessReponse;
import com.rmit.sept.usermicroservices.payload.LoginRequest;
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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.rmit.sept.usermicroservices.security.SecurityConstant.TOKEN_PREFIX;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
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
        User newUser = userService.saveUser(user);

        return  new ResponseEntity<User>(newUser, HttpStatus.CREATED);
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
        User loginUser = userService.getUser(loginRequest.getUsername());
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setDisplayname(loginUser.getDisplayName());
        loginResponse.setJWTLoginSucessReponse(new JWTLoginSucessReponse(true, jwt));
        return ResponseEntity.ok(loginResponse);
    }

    @GetMapping("/getUser")
    public ResponseEntity<?> getUser(@RequestParam("username") String username){
        System.out.println(username);
        System.out.println("pass");
        User newUser = userService.getUser(username);
        return  new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }


    class LoginResponse
    {
        private String displayname;
        private JWTLoginSucessReponse response;
        public String getDisplayname()
        {
            return displayname;
        }
        public JWTLoginSucessReponse getResponse()
        {
            return response;
        }
        public void setDisplayname(String newDisplayname)
        {
            displayname = newDisplayname;
        }
        public void setJWTLoginSucessReponse (JWTLoginSucessReponse newResponse)
        {
            response = newResponse;
        }
    }
}
