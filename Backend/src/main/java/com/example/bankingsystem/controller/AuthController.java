package com.example.bankingsystem.controller;

import com.example.bankingsystem.dto.LoginRequest;
import com.example.bankingsystem.model.User;
import com.example.bankingsystem.repository.UserRepository;
import com.example.bankingsystem.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import com.example.bankingsystem.dto.GoogleLoginRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Value;
import java.util.Collections;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        if (request.getEmail() == null || request.getPassword() == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email and password are required"));
        }

        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401)
                    .body(Map.of("message", "Invalid Credentials"));
        }

        User user = userOpt.get();

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401)
                    .body(Map.of("message", "Invalid Credentials"));
        }

        String token = JwtUtil.generateToken(user.getEmail(), user.getRole());

        return ResponseEntity.ok(Map.of(
                "token", token,
                "email", user.getEmail(),
                "role", user.getRole()
        ));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody LoginRequest request) {
        if (request.getEmail() == null || request.getPassword() == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email and password are required"));
        }

        String email = request.getEmail().trim().toLowerCase();

        if (!email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Please enter a valid email address"));
        }

        if (request.getPassword().length() < 4) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Password must be at least 4 characters"));
        }

        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "An account with this email already exists"));
        }

        User newUser = new User(email, passwordEncoder.encode(request.getPassword()));
        newUser.setRole("USER");
        userRepository.save(newUser);

        // Auto-login: generate token for the new user
        String token = JwtUtil.generateToken(newUser.getEmail(), newUser.getRole());

        return ResponseEntity.ok(Map.of(
                "message", "Registration successful",
                "token", token,
                "email", newUser.getEmail(),
                "role", newUser.getRole()
        ));
        
    }
    @Value("${google.client.id}")
    private String googleClientId;

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody GoogleLoginRequest request) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            GoogleIdToken idToken = verifier.verify(request.getToken());
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                String email = payload.getEmail();

                // Check if user exists
                Optional<User> userOpt = userRepository.findByEmail(email);
                User user;
                
                if (userOpt.isEmpty()) {
                    // Create new user if they don't exist
                    user = new User(email, ""); // No password needed for Google Auth
                    user.setRole("USER");
                    userRepository.save(user);
                } else {
                    user = userOpt.get();
                }

                // Generate our application's JWT
                String token = JwtUtil.generateToken(user.getEmail(), user.getRole());

                return ResponseEntity.ok(Map.of(
                        "message", "Google Login successful",
                        "token", token,
                        "email", user.getEmail(),
                        "role", user.getRole()
                ));
            } else {
                return ResponseEntity.status(401).body(Map.of("message", "Invalid Google Token"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Google Login failed: " + e.getMessage()));
        }
    }

}