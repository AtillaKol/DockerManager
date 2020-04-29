package ch.dockermanager.backend.model;

import ch.dockermanager.backend.constant.ContainerConstant;
import com.fasterxml.jackson.annotation.JsonProperty;

public class HostConfig {

    @JsonProperty(value = ContainerConstant.NETWORKMODE)
    private String networkMode;

    public String getNetworkMode() {
        return this.networkMode;
    }

    public void setNetworkMode(String networkMode) {
        this.networkMode = networkMode;
    }

}
