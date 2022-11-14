package com.blogApi.Controllers;

import com.blogApi.Entity.User;
import com.blogApi.Payloads.ApiResponse;
import com.blogApi.Payloads.UserDto;
import com.blogApi.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    public UserService userService;

    // Post - create User
    @PostMapping("/")
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto userDto){

       UserDto createdUser = this.userService.createUser(userDto);
       return new ResponseEntity<>(createdUser , HttpStatus.CREATED);

    }

    //Put update User
    @PutMapping("/{userId}")
    public ResponseEntity<UserDto> updateUser(@Valid @RequestBody UserDto userDto , @PathVariable("userId") Integer uId){
        UserDto updatedUser = this.userService.updateUser(userDto , uId);
        return ResponseEntity.ok(updatedUser);
    }

    //Get - Get Single User
    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUser(@PathVariable("userId") Integer uid){
        return ResponseEntity.ok(this.userService.getUserById(uid));
    }

    // Get - Get All User
    @GetMapping("/all")
    public ResponseEntity<List<UserDto>> getAllUsers(){
        return ResponseEntity.ok(this.userService.allUser());
    }

    //Delete - Delete User
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable("userId") Integer uid){
        this.userService.deleteUser(uid);
        return new ResponseEntity(new ApiResponse("User Deleted Successfully" , true) , HttpStatus.OK);
    }
}
