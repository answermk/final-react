package com.rail.railway.controller;

import com.rail.railway.service.PasswordService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/password")
@CrossOrigin(origins = "*")  // Allow all origins for now
public class PasswordController {

    @Autowired
    private PasswordService passwordService;

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody String email) {
        try {
            passwordService.initiatePasswordReset(email);
            return ResponseEntity.ok("Password reset instructions sent");
        } catch (MessagingException e) {
            return ResponseEntity.status(500).body("Error sending email");
        } catch (Exception e) {  // Catch-all for unexpected errors
            return ResponseEntity.status(500).body("An unexpected error occurred");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(
            @RequestParam String token,
            @RequestBody String newPassword
    ) {
        boolean resetSuccessful = passwordService.resetPassword(token, newPassword);

        if (resetSuccessful) {
            return ResponseEntity.ok("Password reset successfully");
        } else {
            return ResponseEntity.badRequest().body("Invalid or expired token");
        }
    }
}
