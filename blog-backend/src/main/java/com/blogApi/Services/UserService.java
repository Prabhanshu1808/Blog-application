package com.blogApi.Services;

import com.blogApi.Entity.User;
import com.blogApi.Payloads.UserDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    UserDto registerNewUser(UserDto user);

    UserDto createUser(UserDto user);

    UserDto updateUser(UserDto user , Integer userId);

    UserDto getUserById(Integer userId);

    List<UserDto> allUser();

    void deleteUser(Integer userId);


}
