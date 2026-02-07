package com.cafeteria;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;

@SpringBootApplication
public class CafeteriaApplication {

	public static void main(String[] args) {
		SpringApplication.run(CafeteriaApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(Environment env) {
		return args -> {
			System.out.println("============================================================");
			System.out.println("🔍 APPLICATION STARTUP: CHECKING ENVIRONMENT VARIABLES");
			System.out.println("============================================================");
			System.getenv().forEach((key, value) -> {
				if (key.startsWith("MYSQL") || key.startsWith("RAILWAY") || key.equals("PORT")) {
					System.out.println(key + " = " + value);
				}
			});
			System.out.println("============================================================");
		};
	}

}
