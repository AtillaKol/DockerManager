package ch.dockermanager.backend;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;

/**
 * Beinhaltet Grund-Annotations, welche fuer alle Tests genutzt werden.
 */
@SpringBootTest(classes = Run.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public abstract class AbstractIntegrationClass {

    @LocalServerPort
    protected int serverPort;

}
