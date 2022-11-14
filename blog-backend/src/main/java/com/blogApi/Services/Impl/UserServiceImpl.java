package com.blogApi.Services.Impl;

import com.blogApi.Config.AppConstant;
import com.blogApi.Entity.Role;
import com.blogApi.Entity.User;
import com.blogApi.Exception.ResourceNotFountException;
import com.blogApi.Payloads.UserDto;
import com.blogApi.Repository.RoleRepo;
import com.blogApi.Repository.UserRepo;
import com.blogApi.Services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepo roleRepo;


    @Override
    public UserDto registerNewUser(UserDto userDto) {
        User user = this.modelMapper.map(userDto , User.class);
        //encode the password
        user.setPassword(this.passwordEncoder.encode(user.getPassword()));

        //role specified
       Role role = this.roleRepo.findById(AppConstant.NORMAL_USER).get();

       user.getRoles().add(role);

       User newUser = this.userRepo.save(user);
        return this.modelMapper.map(newUser , UserDto.class);
    }

    @Override
    public UserDto createUser(UserDto userDto) {

        User user = this.dtoToUser(userDto);
        User savedUser = this.userRepo.save(user);
        return this.userToDto(savedUser);
    }

    @Override
    public UserDto updateUser(UserDto userDto, Integer userId) {
        User user = this.userRepo.findById(userId).orElseThrow(() -> new ResourceNotFountException("User","Id",userId));

        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setAbout(userDto.getAbout());

        User updateUser = this.userRepo.save(user);
        UserDto userDto1 = this.userToDto(updateUser);
        return userDto1;
    }

    @Override
    public UserDto getUserById(Integer userId) {
        User user = this.userRepo.findById(userId).orElseThrow(() -> new ResourceNotFountException("User","Id",userId));
        return this.userToDto(user);
    }

    @Override
    public List<UserDto> allUser() {
        List<User> users = this.userRepo.findAll();
        List<UserDto> allUsers = users.stream().map(user -> this.userToDto(user)).collect(Collectors.toList());
        return allUsers;
    }

    @Override
    public void deleteUser(Integer userId) {
        User user = this.userRepo.findById(userId).orElseThrow(() -> new ResourceNotFountException("User","Id",userId));
        this.userRepo.delete(user);
    }

    public User dtoToUser(UserDto userDto){
        User user = this.modelMapper.map(userDto , User.class);
//        user.setId(userDto.getId());
//        user.setName(userDto.getName());
//        user.setEmail(userDto.getEmail());
//        user.setAbout(userDto.getAbout());
//        user.setPassword(userDto.getPassword());
        return user;
    }

    public UserDto userToDto(User user){
        UserDto userDto = this.modelMapper.map(user , UserDto.class);
        return userDto;
    }
}
