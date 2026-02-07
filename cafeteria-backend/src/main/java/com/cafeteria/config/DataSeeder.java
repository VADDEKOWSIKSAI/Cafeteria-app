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

    private void seedStudent() {
        String studentEmail = "student@cafeteria.com";
        Optional<User> existingStudent = userRepository.findByEmail(studentEmail);

        if (existingStudent.isEmpty()) {
            logger.info("No student found. Creating default student...");
            User student = new User();
            student.setName("Default Student");
            student.setEmail(studentEmail);
            student.setPassword(passwordEncoder.encode("student123"));
            student.setRole(UserRole.STUDENT);

            userRepository.save(student);
            logger.info("Default Student Created Successfully! Email: {}, Password: student123", studentEmail);
        } else {
            // Force reset password to ensure access
            User student = existingStudent.get();
            student.setPassword(passwordEncoder.encode("student123"));
            userRepository.save(student);
            logger.info("Student account exists. Password reset to 'student123'.");
        }
    }
}
