package ch.dockermanager.backend.service;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.model.Container;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContainerService {

    private final DockerClient dockerClient;

    @Autowired
    public ContainerService(DockerClient dockerClient) {
        this.dockerClient = dockerClient;
    }

    public List<Container> getContainers(boolean showAll, int limit, boolean size, String before) {
        return dockerClient.listContainersCmd()
                .withShowAll(showAll)
                .withLimit(limit)
                .withShowSize(size)
                .withBefore(before)
                .exec();
    }

}
