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
public class DataSeeder implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataSeeder.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        seedAdmin();
        seedStudent();
    }

    private void seedAdmin() {
        // 1. Check/Create requested admin@cafeteria.com
        if (!userRepository.existsByEmail("admin@cafeteria.com")) {
            User requestedAdmin = new User();
            requestedAdmin.setName("Admin");
            requestedAdmin.setEmail("admin@cafeteria.com");
            requestedAdmin.setPassword(passwordEncoder.encode("admin123"));
            requestedAdmin.setRole(UserRole.ADMIN);
            requestedAdmin.setEnabled(true);
            userRepository.save(requestedAdmin);
            logger.info("✅ Requested Admin (admin@cafeteria.com) created!");
        }

        // 2. Existing logic for env-based admin (kept for compatibility)
        String adminEmail = System.getenv("ADMIN_EMAIL");
        String adminPassword = System.getenv("ADMIN_PASSWORD");

        if (adminEmail == null)
            adminEmail = "admin@smartcafeteria.com";
        if (adminPassword == null) {
            adminPassword = "admin123";
        }

        Optional<User> existingAdmin = userRepository.findByEmail(adminEmail);

        if (existingAdmin.isEmpty()) {
            logger.info("Creating default env admin...");
            User admin = new User();
            admin.setName("Super Admin");
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode(adminPassword));
            admin.setRole(UserRole.ADMIN);
            admin.setEnabled(true);

            userRepository.save(admin);
            logger.info("Default Env Admin Created Successfully!");
        }
    }

    private void seedStudent() {
        String studentEmail = "student@cafeteria.com";
        String studentPassword = "student123";

        Optional<User> existingStudent = userRepository.findByEmail(studentEmail);

        if (existingStudent.isEmpty()) {
            logger.info("No student found. Creating default student...");
            User student = new User();
            student.setName("Default Student");
            student.setEmail(studentEmail);
            student.setPassword(passwordEncoder.encode(studentPassword));
            student.setRole(UserRole.STUDENT);

            userRepository.save(student);
            logger.info("Default Student Created Successfully!");
        }
    }
}
