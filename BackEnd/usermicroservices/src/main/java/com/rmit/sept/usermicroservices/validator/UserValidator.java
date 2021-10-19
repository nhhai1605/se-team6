package com.rmit.sept.usermicroservices.validator;

import com.rmit.sept.usermicroservices.model.User;
import com.rmit.sept.usermicroservices.payload.ChangeDetailRequest;
import com.rmit.sept.usermicroservices.payload.ChangePasswordRequest;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UserValidator implements Validator {

    @Override
    public boolean supports(Class<?> aClass) {
        return User.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {

        User user = (User) object;

        if(user.getUsername().length() <6){
            errors.rejectValue("username","Length", "Must be at least 6 characters");
        }
        if(user.getUsername().length() > 60){
            errors.rejectValue("username","Length", "Too many characters");
        }

        if(user.getDisplayName().length() <6){
            errors.rejectValue("displayName","Length", "Must be at least 6 characters");
        }
        if(user.getDisplayName().length() > 60){
            errors.rejectValue("displayName","Length", "Too many characters");
        }

        if(user.getFullName().length() <6){
            errors.rejectValue("fullName","Length", "Must be at least 6 characters");
        }
        if(user.getFullName().length() > 60){
            errors.rejectValue("fullName","Length", "Too many characters");
        }


        if(user.getPassword().length() <6){
            errors.rejectValue("password","Length", "Must be at least 6 characters");
        }
        if(user.getPassword().length() > 60){
            errors.rejectValue("password","Length", "Too many characters");
        }
        if(!user.getPassword().equals(user.getConfirmPassword())){
            errors.rejectValue("confirmPassword","Match", "Passwords must match");
        }
    }

    public void changePasswordValidate(ChangePasswordRequest request, Errors errors) {
        if (request.getNewPassword().length() < 6) {
            errors.rejectValue("newPassword", "Length", "Must be at least 6 characters");
        }
        if (request.getNewPassword().length() > 60) {
            errors.rejectValue("newPassword", "Length", "Too many characters");
        }
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            errors.rejectValue("confirmPassword", "Match", "Passwords must match");
        }
        if (request.getNewPassword().equals(request.getPassword())) {
            errors.rejectValue("newPassword", "Match", "New and Old passwords should be different");
        }
    }

    public void changeDetailValidate(ChangeDetailRequest request, Errors errors) {
        if (request.getFullName().length() < 6) {
            errors.rejectValue("fullName", "Length", "Must be at least 6 characters");
        }
        if (request.getFullName().length() > 60) {
            errors.rejectValue("fullName", "Length", "Too many characters");
        }
        if (request.getDisplayName().length() < 6) {
            errors.rejectValue("displayName", "Length", "Must be at least 6 characters");
        }
        if (request.getDisplayName().length() > 60) {
            errors.rejectValue("displayName", "Length", "Too many characters");
        }
    }
}
