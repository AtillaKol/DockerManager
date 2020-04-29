package ch.dockermanager.backend.model;

import ch.dockermanager.backend.constant.ContainerConstant;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({
        ContainerConstant.NETWORKID,
        ContainerConstant.ENDPOINTID,
        ContainerConstant.GATEWAY,
        ContainerConstant.IPADDRESS,
        ContainerConstant.IPPREFIXLEN,
        ContainerConstant.IPV6GATEWAY,
        ContainerConstant.GLOBALIPV6ADDRESS,
        ContainerConstant.GLOBALIPV6PREFIXLEN,
        ContainerConstant.MACADDRESS
})
public class Bridge {

    @JsonProperty(value = ContainerConstant.NETWORKID)
    private String networkID;
    @JsonProperty(value = ContainerConstant.ENDPOINTID)
    private String endpointID;
    @JsonProperty(value = ContainerConstant.GATEWAY)
    private String gateway;
    @JsonProperty(value = ContainerConstant.IPADDRESS)
    private String ipAddress;
    @JsonProperty(value = ContainerConstant.IPPREFIXLEN)
    private Integer ipPrefixLen;
    @JsonProperty(value = ContainerConstant.IPV6GATEWAY)
    private String ipv6Gateway;
    @JsonProperty(value = ContainerConstant.GLOBALIPV6ADDRESS)
    private String globalIPv6Address;
    @JsonProperty(value = ContainerConstant.GLOBALIPV6PREFIXLEN)
    private Integer globalIPv6PrefixLen;
    @JsonProperty(value = ContainerConstant.MACADDRESS)
    private String macAddress;

    public String getNetworkID() {
        return this.networkID;
    }

    public void setNetworkID(String networkID) {
        this.networkID = networkID;
    }

    public String getEndpointID() {
        return this.endpointID;
    }

    public void setEndpointID(String endpointID) {
        this.endpointID = endpointID;
    }

    public String getGateway() {
        return this.gateway;
    }

    public void setGateway(String gateway) {
        this.gateway = gateway;
    }

    public String getIpAddress() {
        return this.ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public Integer getIpPrefixLen() {
        return this.ipPrefixLen;
    }

    public void setIpPrefixLen(Integer ipPrefixLen) {
        this.ipPrefixLen = ipPrefixLen;
    }

    public String getIpv6Gateway() {
        return this.ipv6Gateway;
    }

    public void setIpv6Gateway(String ipv6Gateway) {
        this.ipv6Gateway = ipv6Gateway;
    }

    public String getGlobalIPv6Address() {
        return this.globalIPv6Address;
    }

    public void setGlobalIPv6Address(String globalIPv6Address) {
        this.globalIPv6Address = globalIPv6Address;
    }

    public Integer getGlobalIPv6PrefixLen() {
        return this.globalIPv6PrefixLen;
    }

    public void setGlobalIPv6PrefixLen(Integer globalIPv6PrefixLen) {
        this.globalIPv6PrefixLen = globalIPv6PrefixLen;
    }

    public String getMacAddress() {
        return this.macAddress;
    }

    public void setMacAddress(String macAddress) {
        this.macAddress = macAddress;
    }

}
