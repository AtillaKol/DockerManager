package ch.dockermanager.backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import javax.annotation.PostConstruct;

@ConfigurationProperties(prefix = "appdata")
public class ApplicationYMLConfig {

    private String dockerSocketURI;

    @PostConstruct
    public void init() {
        if(this.dockerSocketURI == null) throw new RuntimeException("Please define a configuration in the application.yml" +
                " under appdata with the name dockerSocketPath");
    }

    public String getDockerSocketURI() {
        return this.dockerSocketURI;
    }

    public void setDockerSocketURI(String dockerSocketURI) {
        this.dockerSocketURI = dockerSocketURI;
    }

}
