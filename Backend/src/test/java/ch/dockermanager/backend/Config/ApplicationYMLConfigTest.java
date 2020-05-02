package ch.dockermanager.backend.Config;

import ch.dockermanager.backend.AbstractIntegrationClass;
import ch.dockermanager.backend.config.ApplicationYMLConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import static org.junit.jupiter.api.Assertions.assertEquals;

@EnableConfigurationProperties(value = ApplicationYMLConfig.class)
/**
 * Test will probably fail in your environment, depending if the URI to the socket is the same.
 */
public class ApplicationYMLConfigTest extends AbstractIntegrationClass {

    @Autowired
    ApplicationYMLConfig applicationYMLConfig;

    @Test
    public void test_PathToDockerSocket() {
        assertEquals("http://unix:/var/run/docker.sock:/v1.40/", applicationYMLConfig.getDockerSocketURI());
    }
}
