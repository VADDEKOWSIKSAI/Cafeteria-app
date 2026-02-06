package com.cafeteria.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordGenerator {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "Buddy30"; // Default password to hash

        if (args.length > 0) {
            rawPassword = args[0];
        }

        String encodedPassword = encoder.encode(rawPassword);

        System.out.println("------------------------------------------------");
        System.out.println("BCrypt Password Generator");
        System.out.println("------------------------------------------------");
        System.out.println("Raw Password: " + rawPassword);
        System.out.println("Encoded Hash: " + encodedPassword);
        System.out.println("------------------------------------------------");
    }
}
