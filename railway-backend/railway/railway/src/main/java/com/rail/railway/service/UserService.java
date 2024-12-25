package com.rail.railway.service;

import com.rail.railway.dto.RegistrationDTO;
import com.rail.railway.model.User;
import com.rail.railway.userRepository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.Period;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerNewUser(RegistrationDTO registrationDto) {
        // Validate input
        validateUserRegistration(registrationDto);

        // Create new user
        User newUser = new User();
        newUser.setFirstname(registrationDto.getFirstname());
        newUser.setLastname(registrationDto.getLastname());
        newUser.setPhonenumber(registrationDto.getPhonenumber());
        newUser.setEmail(registrationDto.getEmail());
        newUser.setRole(registrationDto.getRole());
        newUser.setDob(registrationDto.getDob());
        newUser.setPassword(registrationDto.getPassword());

        try {
            return userRepository.save(newUser);
        } catch (Exception e) {
            throw new RuntimeException("Error creating user: " + e.getMessage());
        }
    }

    private void validateUserRegistration(RegistrationDTO dto) {
        if (dto.getEmail() == null || dto.getEmail().trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }

        if (dto.getPassword() == null || dto.getPassword().trim().isEmpty()) {
            throw new RuntimeException("Password is required");
        }

        // Check for existing email
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // Validate age (16-100 years old)
        LocalDate currentDate = LocalDate.now();
        int age = Period.between(dto.getDob(), currentDate).getYears();
        if (age < 16 || age > 100) {
            throw new RuntimeException("Invalid age. Must be between 16 and 100 years old.");
        }

        // Validate phone number
        if (!dto.getPhonenumber().matches("\\d{10}")) {
            throw new RuntimeException("Invalid phone number. Must be 10 digits.");
        }

        // Basic email validation
        if (!dto.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new RuntimeException("Invalid email format");
        }

        // Password length validation
        if (dto.getPassword().length() < 8) {
            throw new RuntimeException("Password must be at least 8 characters long");
        }
    }

    public User authenticateUser(String email, String password) {
        if (email == null || email.trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }

        if (password == null || password.trim().isEmpty()) {
            throw new RuntimeException("Password is required");
        }

        return userRepository.findByEmail(email)
                .filter(user -> password.equals(user.getPassword()))
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));
    }
}