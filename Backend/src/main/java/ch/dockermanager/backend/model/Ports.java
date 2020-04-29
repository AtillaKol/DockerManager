package ch.dockermanager.backend.model;

import ch.dockermanager.backend.constant.ContainerConstant;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({
        ContainerConstant.PRIVATEPORT,
        ContainerConstant.PUPBLICPORT,
        ContainerConstant.TYPE
})
public class Ports {

    @JsonProperty(value = ContainerConstant.PRIVATEPORT)
    private Integer privatePort;
    @JsonProperty(value = ContainerConstant.PUPBLICPORT)
    private Integer publicPort;
    @JsonProperty(value = ContainerConstant.TYPE)
    private String type;

}
