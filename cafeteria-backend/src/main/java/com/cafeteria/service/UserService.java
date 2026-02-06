package com.cafeteria.service;

import com.cafeteria.entity.User;
import com.cafeteria.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User updateUserProfile(Long userId, String name, String email) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setName(name);
        // Only update email if it's new and not taken
        if (!user.getEmail().equals(email)) {
            if (userRepository.existsByEmail(email)) {
                throw new RuntimeException("Email is already in use");
            }
            user.setEmail(email);
        }

        return userRepository.save(user);
    }

    public void updatePassword(Long userId, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}
