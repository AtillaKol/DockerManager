package ch.dockermanager.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan("ch.dockermanager.backend.config")
public class Run {

    public static void main(String[] args) {
        SpringApplication.run(Run.class, args);
    }

}
