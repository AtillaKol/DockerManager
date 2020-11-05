package ch.dockermanager.backend.configuration;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.core.DefaultDockerClientConfig;
import com.github.dockerjava.core.DockerClientConfig;
import com.github.dockerjava.core.DockerClientImpl;
import com.github.dockerjava.httpclient5.ApacheDockerHttpClient;
import com.github.dockerjava.transport.DockerHttpClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Will contain some beans
 */
@Configuration
public class BeanConfiguration {

    private final DockerPropertiesConfiguration dockerPropertiesConfiguration;

    @Autowired
    public BeanConfiguration(DockerPropertiesConfiguration dockerPropertiesConfiguration) {
        this.dockerPropertiesConfiguration = dockerPropertiesConfiguration;
    }

    /**
     * Creates a DockerClient-Bean with all configurations given. Can be used over the whole application.
     * @return a DockerClient Object with all configurations.
     */
    @Bean
    public DockerClient dockerClient() {
        DockerClientConfig clientConfig = DefaultDockerClientConfig.createDefaultConfigBuilder()
                .withDockerHost(dockerPropertiesConfiguration.getHost()).build();
        DockerHttpClient httpClient = new ApacheDockerHttpClient.Builder()
                .dockerHost(clientConfig.getDockerHost()).build();
        return DockerClientImpl.getInstance(clientConfig, httpClient);
    }

}
