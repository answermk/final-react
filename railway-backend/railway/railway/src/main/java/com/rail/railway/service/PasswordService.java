package com.rail.railway.service;

import com.rail.railway.model.User;
import com.rail.railway.userRepository.UserRepository;
import jakarta.mail.MessagingException;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    public void initiatePasswordReset(String email) throws MessagingException {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Generate reset token
            String resetToken = UUID.randomUUID().toString();
            user.setResetToken(resetToken);

            userRepository.save(user);

            // Send reset email
            emailService.sendPasswordResetEmail(email, resetToken);
        }
    }

    public boolean resetPassword(String token, String newPassword) {
        Optional<User> userOptional = userRepository.findByResetToken(token);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Hash the new password using BCrypt
            String hashedPassword = BCrypt.hashpw(newPassword, BCrypt.gensalt());
            user.setPassword(hashedPassword);

            // Clear the reset token
            user.setResetToken(null);

            userRepository.save(user);
            return true;
        }

        return false;
    }
}
