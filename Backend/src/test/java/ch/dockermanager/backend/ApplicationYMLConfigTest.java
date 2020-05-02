package ch.dockermanager.backend;

import ch.dockermanager.backend.config.ApplicationYMLConfig;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(classes = Run.class)
@ExtendWith(SpringExtension.class)
@EnableConfigurationProperties(value = ApplicationYMLConfig.class)
public class ApplicationYMLConfigTest {

    @Autowired
    ApplicationYMLConfig applicationYMLConfig;

    @Test
    public void test_PathToDockerSocket() {
        assertEquals("http://unix:/var/run/docker.sock:/v1.40/", applicationYMLConfig.getDockerSocketURI());
    }
}
