package ch.dockermanager.backend.model;

import ch.dockermanager.backend.constant.ContainerConstant;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({
        ContainerConstant.NAME,
        ContainerConstant.SOURCE,
        ContainerConstant.DESTINATION,
        ContainerConstant.DRIVER,
        ContainerConstant.MODE,
        ContainerConstant.RW,
        ContainerConstant.PROPAGATION
})
public class Mounts {

    @JsonProperty(value = ContainerConstant.NAME)
    private String name;
    @JsonProperty(value = ContainerConstant.SOURCE)
    private String source;
    @JsonProperty(value = ContainerConstant.DESTINATION)
    private String destination;
    @JsonProperty(value = ContainerConstant.DRIVER)
    private String driver;
    @JsonProperty(value = ContainerConstant.MODE)
    private String mode;
    @JsonProperty(value = ContainerConstant.RW)
    private boolean rw;
    @JsonProperty(value = ContainerConstant.PROPAGATION)
    private String propagation;

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSource() {
        return this.source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getDestination() {
        return this.destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getDriver() {
        return this.driver;
    }

    public void setDriver(String driver) {
        this.driver = driver;
    }

    public String getMode() {
        return this.mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public boolean isRw() {
        return this.rw;
    }

    public void setRw(boolean rw) {
        this.rw = rw;
    }

    public String getPropagation() {
        return this.propagation;
    }

    public void setPropagation(String propagation) {
        this.propagation = propagation;
    }

}
