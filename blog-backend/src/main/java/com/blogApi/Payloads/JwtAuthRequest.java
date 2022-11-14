package com.blogApi.Payloads;

import lombok.Data;

@Data
public class JwtAuthRequest {

    private String username;
    private String password;
}
