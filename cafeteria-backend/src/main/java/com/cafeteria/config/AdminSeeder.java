package com.cafeteria.config;

import com.cafeteria.common.UserRole;
import com.cafeteria.entity.User;
import com.cafeteria.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@Configuration
public class AdminSeeder implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(AdminSeeder.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        String adminEmail = "admin@cafeteria.com";

        Optional<User> existingAdmin = userRepository.findByEmail(adminEmail);

        if (existingAdmin.isEmpty()) {
            logger.info("No admin found. Creating default admin...");
            User admin = new User();
            admin.setName("Super Admin");
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(UserRole.ADMIN);

            userRepository.save(admin);
            logger.info("Default Admin Created Successfully! Email: {}, Password: admin123", adminEmail);
        } else {
            // Force reset password to ensure access
            User admin = existingAdmin.get();
            admin.setPassword(passwordEncoder.encode("admin123"));
            userRepository.save(admin);
            logger.info("Admin account exists. Password reset to 'admin123'.");
        }
    }
}
