package ch.dockermanager.backend.constant;

/**
 * Speichert Konstanzen fuer die Container- und SubContainer-Models. Vor allem
 * fuer die JSON-Properties.
 */
public final class ContainerConstant {

    //Genutzt innerhalb der Klasse Containers.
    public static final String ID = "Id";
    public static final String NAMES = "Names";
    public static final String IMAGE = "Image";
    public static final String IMAGEID = "ImageID";
    public static final String COMMAND = "Command";
    public static final String CREATED = "Created";
    public static final String STATE = "State";
    public static final String STATUS = "Status";
    public static final String PORTS = "Ports";
    public static final String LABELS = "Labels";
    public static final String SIZERW = "SizeRw";
    public static final String SIZEROOTFS = "SizeRootFs";
    public static final String HOSTCONFIG = "HostConfig";
    public static final String NETWORKSETTINGS = "NetworkSettings";
    public static final String MOUNTS = "Mounts";

    //Genutzt innerhalb der Klasse Ports.
    public static final String PRIVATEPORT = "PrivatePort";
    public static final String PUPBLICPORT = "PublicPort";
    public static final String TYPE = "type";

    //Genutzt innerhalb der Klasse HostConfig.
    public static final String NETWORKMODE = "NetworkMode";

    //Genutzt innerhalb der Klasse Bridge.
    public static final String NETWORKID = "NetworkID";
    public static final String ENDPOINTID = "EndpointID";
    public static final String GATEWAY = "Gateway";
    public static final String IPADDRESS = "IPAddress";
    public static final String IPPREFIXLEN = "IPPrefixLen";
    public static final String IPV6GATEWAY = "IPv6Gateway";
    public static final String GLOBALIPV6ADDRESS = "GlobalIPv6Address";
    public static final String GLOBALIPV6PREFIXLEN = "GlobalIPv6PrefixLen";
    public static final String MACADDRESS = "MacAddress";

    //Genutzt innerhalb der Klasse Networks
    public static final String BRIDGE = "Bridge";

    //Genutzt innerhalb der Klasse NetworkSettings
    public static final String NETWORKS = "Networks";

    //Genutzt innerhalb der Klasse Mounts
    public static final String NAME = "Name";
    public static final String SOURCE = "Source";
    public static final String DESTINATION = "Destination";
    public static final String DRIVER = "Driver";
    public static final String MODE = "Mode";
    public static final String RW = "RW";
    public static final String PROPAGATION = "Propagation";


}
