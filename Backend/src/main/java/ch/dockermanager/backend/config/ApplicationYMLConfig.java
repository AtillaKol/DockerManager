package ch.dockermanager.backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import javax.annotation.PostConstruct;

@ConfigurationProperties(prefix = "appdata")
public class ApplicationYMLConfig {

    private String dockerSocketPath;

    @PostConstruct
    public void init() {
        if(dockerSocketPath == null) throw new RuntimeException("Please define a configuration in the application.yml" +
                " under appdata with the name dockerSocketPath");
    }

    public String getDockerSocketPath() {
        return this.dockerSocketPath;
    }

    public void setDockerSocketPath(String dockerSocketPath) {
        this.dockerSocketPath = dockerSocketPath;
    }

}
