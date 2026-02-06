package com.cafeteria.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${spring.mail.username:mock@cafeteria.com}")
    private String fromEmail;

    public void sendOrderReadyEmail(String toEmail, String userName, Long orderId) {
        String subject = "🍽️ Your Order #" + orderId + " is Ready!";
        String body = "Hello " + userName + ",\n\n" +
                "Good news! Your order #" + orderId + " is now READY for pickup.\n" +
                "Please head to the counter to collect it.\n\n" +
                "Bon Appétit!\n" +
                "The Smart Cafeteria Team";

        if (mailSender != null) {
            try {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom(fromEmail);
                message.setTo(toEmail);
                message.setSubject(subject);
                message.setText(body);
                mailSender.send(message);
                logger.info("[EMAIL SENT] To: {} | Subject: {}", toEmail, subject);
            } catch (Exception e) {
                logger.error("[EMAIL ERROR] Failed to send email: {}", e.getMessage());
                logMockEmail(toEmail, subject, body);
            }
        } else {
            logMockEmail(toEmail, subject, body);
        }
    }

    public void sendPasswordResetEmail(String toEmail, String token) {
        String resetLink = "http://localhost:5173/reset-password?token=" + token;
        String subject = "🔑 Reset Your Password";
        String body = "Hello,\n\n" +
                "We received a request to reset your password.\n" +
                "Click the link below to set a new password:\n\n" +
                resetLink + "\n\n" +
                "This link will expire in 15 minutes.\n" +
                "If you didn't request this, purely ignore this email.\n\n" +
                "Regards,\n" +
                "The Smart Cafeteria Team";

        if (mailSender != null) {
            try {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom(fromEmail);
                message.setTo(toEmail);
                message.setSubject(subject);
                message.setText(body);
                mailSender.send(message);
                logger.info("[EMAIL SENT] To: {} | Subject: {}", toEmail, subject);
            } catch (Exception e) {
                logger.error("[EMAIL ERROR] Failed to send email: {}", e.getMessage());
                logMockEmail(toEmail, subject, body);
            }
        } else {
            logMockEmail(toEmail, subject, body);
        }
    }

    private void logMockEmail(String to, String subject, String body) {
        logger.info(
                "\n============ [MOCK EMAIL SERVICE] ============\nTo: {}\nFrom: {}\nSubject: {}\n----------------------------------------------\n{}\n==============================================\n",
                to, fromEmail, subject, body);
    }
}
