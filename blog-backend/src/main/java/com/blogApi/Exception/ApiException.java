package com.blogApi.Exception;

public class ApiException extends RuntimeException{

    public ApiException(String message) {
        super(message);
    }

    public ApiException() {
    }
}
