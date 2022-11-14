package com.blogApi.Payloads;

import com.blogApi.Entity.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@Getter
@Setter
public class UserDto {


    private int id;
    @NotEmpty
    @Size(min = 4 , message = "Username must be greater than 4 character")
    private String name;
    @NotEmpty
    @Email(message = "Email Address is not valid")
    @Column(unique = true)
    private String email;
    @NotEmpty
    @Size(min = 3 , max = 10 , message = "Password must be 3 to 10 character long")
    private String password;
    @NotEmpty
    private String about;

    private Set<RoleDto> roles = new HashSet<>();

    @JsonIgnore
    public String getPassword(){
        return this.password;
    }

    @JsonProperty
    public void setPassword(String password){
        this.password = password;
    }
}
