package com.blogApi.Controllers;

import com.blogApi.Entity.User;
import com.blogApi.Exception.ApiException;
import com.blogApi.Payloads.JwtAuthRequest;
import com.blogApi.Payloads.JwtAuthResponse;
import com.blogApi.Payloads.UserDto;
import com.blogApi.Security.JwtTokenHelper;
import com.blogApi.Services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private JwtTokenHelper jwtTokenHelper;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private ModelMapper mapper;

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> createToken(@RequestBody JwtAuthRequest request) throws Exception {
          this.authenticate(request.getUsername() , request.getPassword());

        UserDetails userDetails = this.userDetailsService.loadUserByUsername(request.getUsername());
        String token =  this.jwtTokenHelper.generateToken(userDetails);

        JwtAuthResponse response = new JwtAuthResponse();
        response.setToken(token);
        response.setUser(this.mapper.map((User) userDetails , UserDto.class));
        return new ResponseEntity<>(response , HttpStatus.OK);
    }

    private void authenticate(String username, String password) throws Exception {

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username , password);

       try{
           this.authenticationManager.authenticate(authenticationToken);
       }
       catch (BadCredentialsException e){
           System.out.println("Invalid Details!");
           throw new ApiException("Invalid Email of Password!");
       }

    }

    //Register New User Api
    @PostMapping("/register")
    public ResponseEntity<UserDto> registerUser(@Valid @RequestBody UserDto userDto){

        UserDto registeredUser = this.userService.registerNewUser(userDto);

        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }
}
