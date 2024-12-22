package com.rail.railway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

import java.util.Collections;

@SpringBootApplication
@ServletComponentScan
public class RailwayApplication {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(RailwayApplication.class);
		app.setDefaultProperties(Collections.singletonMap("server.port", "8082"));
		app.run(args);
	}

}
