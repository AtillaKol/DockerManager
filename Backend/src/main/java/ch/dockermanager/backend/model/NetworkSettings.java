package ch.dockermanager.backend.model;

import ch.dockermanager.backend.constant.ContainerConstant;
import com.fasterxml.jackson.annotation.JsonProperty;

public class NetworkSettings {

    @JsonProperty(value = ContainerConstant.NETWORKS)
    private Networks networks;

    public Networks getNetworks() {
        return this.networks;
    }

    public void setNetworks(Networks networks) {
        this.networks = networks;
    }

}
