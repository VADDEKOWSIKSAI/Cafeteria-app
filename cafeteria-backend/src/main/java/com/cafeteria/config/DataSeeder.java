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
        String adminEmail = System.getenv("ADMIN_EMAIL");
        String adminPassword = System.getenv("ADMIN_PASSWORD");

        if (adminEmail == null)
            adminEmail = "admin@smartcafeteria.com"; // Changed default to generic
        if (adminPassword == null) {
            adminPassword = "admin123";
            logger.warn("⚠️ SECURITY WARNING: Using default admin password. Set ADMIN_PASSWORD environment variable!");
        }

        Optional<User> existingAdmin = userRepository.findByEmail(adminEmail);

        if (existingAdmin.isEmpty()) {
            logger.info("No admin found. Creating default admin...");
            User admin = new User();
            admin.setName("Super Admin");
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode(adminPassword));
            admin.setRole(UserRole.ADMIN);

            userRepository.save(admin);
            logger.info("Default Admin Created Successfully!");
        } else {
            // Only reset if using default credentials or explicitly forced
            // Commenting out forced reset to prevent overwriting production passwords
            /*
             * User admin = existingAdmin.get();
             * admin.setPassword(passwordEncoder.encode(adminPassword));
             * userRepository.save(admin);
             * logger.info("Admin account exists. Password updated.");
             */
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
