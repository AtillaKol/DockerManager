package ch.dockermanager.backend.model;

import ch.dockermanager.backend.constant.ContainerConstant;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Networks {

    @JsonProperty(value = ContainerConstant.BRIDGE)
    private Bridge bridge;

    public Bridge getBridge() {
        return this.bridge;
    }

    public void setBridge(Bridge bridge) {
        this.bridge = bridge;
    }

}
