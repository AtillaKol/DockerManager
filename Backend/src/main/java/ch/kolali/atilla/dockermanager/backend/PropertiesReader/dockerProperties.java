/* -----------------------------------------------------------------------------
* dockerProperties.java
*
* This class will read the content of the docker.properties file.
*
*
* Author: Atilla Kolali
* Version: 1.3
*
* History:
* Version       Date           Who                Changes
* 1.3           10.09.2019     Atilla Kolali      Added method getDockerHost
* 1.2           09.09.2019     Atilla Kolali      Added method getDockerSocket
* 1.1           09.09.2019     Atilla Kolali      Added constructor
* 1.0           09.09.2019     Atilla Kolali      Created dockerProperties
*
*
* Copyright © 2019 Atilla Kolali. All rights reserved
*
----------------------------------------------------------------------------- */
package ch.kolali.atilla.dockermanager.backend.PropertiesReader;

import java.util.ResourceBundle;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

/**
 * This class will read the content of the docker.properties file.
 *
 * @author Atilla Kolali
 * @version 1.3
 */
@Component
@Scope("prototype")
public class dockerProperties {

    private String dockerHost;
    private String dockerSocket;

    //Logger object for logging error.
    private final Logger LOGGER = LoggerFactory.getLogger(dockerProperties.class);

    /**
     * The constructor.
     */
    public dockerProperties() {
        try {
            ResourceBundle bundle = ResourceBundle.getBundle("Properties/docker");
            this.dockerHost = bundle.getString("dockerHost");
            this.dockerSocket = bundle.getString("dockerSocket");
        } catch (Exception e) {
            this.LOGGER.error("Something went wrong while trying to use the ResourceBundle: " + e.toString());
        }
    }

    /**
     * Returns the value of dockerHost.
     *
     * @return value of dockerHost.
     */
    public String getDockerHost() {
        return this.dockerHost;
    }

    /**
     * Returns the value of dockerSocket.
     *
     * @return value of dockerSocket.
     */
    public String getDockerSocket() {
        return this.dockerSocket;
    }

}
