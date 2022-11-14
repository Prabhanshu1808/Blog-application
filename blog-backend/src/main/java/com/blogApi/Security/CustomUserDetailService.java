package com.blogApi.Security;

import com.blogApi.Entity.User;
import com.blogApi.Exception.ResourceNotFountException;
import com.blogApi.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        //Loading user from database by Username
        User user  = this.userRepo.findByEmail(username).orElseThrow(() -> new ResourceNotFountException("User" , "Email"+username , 0));

        return user;
    }
}
