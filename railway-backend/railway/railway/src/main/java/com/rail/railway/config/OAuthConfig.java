package com.rail.railway.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import lombok.Getter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/oauth/google")
public class OAuthConfig {

    @Value("${oauth.google.client-id}")
    private String googleClientId;

    @Value("${oauth.google.client-secret}")
    private String googleClientSecret;

    @Value("${oauth.google.token-url}")
    private String googleTokenUrl;

    @Value("${oauth.google.user-info-url}")
    private String googleUserInfoUrl;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String authCode) {
        // Exchange auth code for access token
        String accessToken = exchangeAuthCodeForToken(authCode);

        // Use access token to fetch user info
        String userInfo = fetchUserInfo(accessToken);

        return ResponseEntity.ok(userInfo);
    }

    private String exchangeAuthCodeForToken(String authCode) {
        // Logic to call the Google Token URL with clientId, clientSecret, and authCode
        // Return the access token
        return "mock_access_token";
    }

    private String fetchUserInfo(String accessToken) {
        // Logic to call the Google User Info URL with the access token
        // Return user info in JSON format
        return "{ \"email\": \"user@example.com\", \"name\": \"John Doe\" }";
    }
}