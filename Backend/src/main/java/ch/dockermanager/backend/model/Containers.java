package ch.dockermanager.backend.model;

import ch.dockermanager.backend.constant.ContainerConstant;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import java.util.List;

/**
 * Ein Container Model.
 */
@JsonPropertyOrder({
        ContainerConstant.ID,
        ContainerConstant.NAMES,
        ContainerConstant.IMAGE,
        ContainerConstant.IMAGEID,
        ContainerConstant.COMMAND,
        ContainerConstant.CREATED,
        ContainerConstant.STATE,
        ContainerConstant.STATUS,
        ContainerConstant.PORTS,
        ContainerConstant.LABELS,
        //TODO Add Labels
        ContainerConstant.SIZERW,
        ContainerConstant.SIZEROOTFS,
        ContainerConstant.HOSTCONFIG,
        ContainerConstant.NETWORKS,
        ContainerConstant.MOUNTS
})
public class Containers {

    @JsonProperty(value = ContainerConstant.ID)
    private String id;
    @JsonProperty(value = ContainerConstant.NAMES)
    private List<String> names;
    @JsonProperty(value = ContainerConstant.IMAGE)
    private String image;
    @JsonProperty(value = ContainerConstant.IMAGEID)
    private String imageID;
    @JsonProperty(value = ContainerConstant.COMMAND)
    private String command;
    @JsonProperty(value = ContainerConstant.CREATED)
    private Integer created;
    @JsonProperty(value = ContainerConstant.STATE)
    private String state;
    @JsonProperty(value = ContainerConstant.STATUS)
    private String status;
    @JsonProperty(value = ContainerConstant.PORTS)
    private List<Ports> ports;
    //TODO Add Labels
    @JsonProperty(value = ContainerConstant.SIZERW)
    private Integer sizeRw;
    @JsonProperty(value = ContainerConstant.SIZEROOTFS)
    private Integer sizeRootFs;
    @JsonProperty(value = ContainerConstant.HOSTCONFIG)
    private HostConfig hostConfig;
    @JsonProperty(value = ContainerConstant.NETWORKSETTINGS)
    private NetworkSettings networkSettings;

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<String> getNames() {
        return this.names;
    }

    public void setNames(List<String> names) {
        this.names = names;
    }

    public String getImage() {
        return this.image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getImageID() {
        return this.imageID;
    }

    public void setImageID(String imageID) {
        this.imageID = imageID;
    }

    public String getCommand() {
        return this.command;
    }

    public void setCommand(String command) {
        this.command = command;
    }

    public Integer getCreated() {
        return this.created;
    }

    public void setCreated(Integer created) {
        this.created = created;
    }

    public String getState() {
        return this.state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Ports> getPorts() {
        return this.ports;
    }

    public void setPorts(List<Ports> ports) {
        this.ports = ports;
    }

    public Integer getSizeRw() {
        return this.sizeRw;
    }

    public void setSizeRw(Integer sizeRw) {
        this.sizeRw = sizeRw;
    }

    public Integer getSizeRootFs() {
        return this.sizeRootFs;
    }

    public void setSizeRootFs(Integer sizeRootFs) {
        this.sizeRootFs = sizeRootFs;
    }

    public HostConfig getHostConfig() {
        return this.hostConfig;
    }

    public void setHostConfig(HostConfig hostConfig) {
        this.hostConfig = hostConfig;
    }

    public NetworkSettings getNetworkSettings() {
        return this.networkSettings;
    }

    public void setNetworkSettings(NetworkSettings networkSettings) {
        this.networkSettings = networkSettings;
    }

}
