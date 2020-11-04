package ch.dockermanager.backend.configuration;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class PropertiesConfigurationTest {

    @Autowired
    private DockerPropertiesConfiguration dockerProperties;

    @Test
    public void dockerPropertiesTest() {
        assertEquals("unix://var/run/docker.sock", dockerProperties.getHost());
    }

}
