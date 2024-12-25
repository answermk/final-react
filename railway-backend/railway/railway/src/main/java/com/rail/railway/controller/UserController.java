package com.rail.railway.controller;

import com.rail.railway.dto.LoginDTO;
import com.rail.railway.dto.RegistrationDTO;
import com.rail.railway.model.User;
import com.rail.railway.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // Add this annotation for global CORS support
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerUser(@RequestBody RegistrationDTO registrationDto) {
        try {
            // Log incoming registration data
            System.out.println("Received registration data: " + registrationDto);

            User user = userService.registerNewUser(registrationDto);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Registration successful");
            response.put("user", user);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Log the full exception
            e.printStackTrace();

            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody LoginDTO loginDto) {
        try {
            User user = userService.authenticateUser(loginDto.getEmail(), loginDto.getPassword());
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("user", user);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            System.out.println("Login Error: " + e.getMessage());  // Add logging
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }
}