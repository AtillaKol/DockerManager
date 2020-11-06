package ch.dockermanager.backend.service;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.model.Image;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * This Service contains everything related with Images.
 */
@Service
public class ImagesService {

    private final DockerClient dockerClient;

    @Autowired
    public ImagesService(DockerClient dockerClient) {
        this.dockerClient = dockerClient;
    }

    public List<Image> getImages(boolean danglingFilter, boolean showAll, String imageNameFilter) {
        return dockerClient.listImagesCmd()
                .withDanglingFilter(danglingFilter)
                .withShowAll(showAll)
                .withImageNameFilter(imageNameFilter)
                .exec();
    }

}
