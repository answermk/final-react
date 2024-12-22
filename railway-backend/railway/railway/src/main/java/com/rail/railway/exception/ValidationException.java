package com.rail.railway.exception;


public class ValidationException extends RuntimeException {
    public ValidationException(String message) {
        super(message);
    }
}