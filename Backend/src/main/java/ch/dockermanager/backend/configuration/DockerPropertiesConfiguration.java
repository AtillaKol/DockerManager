package ch.dockermanager.backend.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;

import javax.annotation.PostConstruct;


@ConfigurationProperties(value = "docker")
public class DockerPropertiesConfiguration {

    private String host;

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    @PostConstruct
    public void init() {
        if(host == null) throw new RuntimeException("Please define host value in the docker section of the yaml file.");
    }

}
