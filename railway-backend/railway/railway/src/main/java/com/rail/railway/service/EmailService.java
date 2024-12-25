package com.rail.railway.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendPasswordResetEmail(String to, String resetToken) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        String resetLink = "http://smartrail.com/reset-password?token=" + resetToken;

        helper.setFrom("your-email@example.com");
        helper.setTo(to);
        helper.setSubject("Password Reset Request");
        helper.setText("Click the link below to reset your password:\n" + resetLink, true);

        mailSender.send(message);
    }
}
