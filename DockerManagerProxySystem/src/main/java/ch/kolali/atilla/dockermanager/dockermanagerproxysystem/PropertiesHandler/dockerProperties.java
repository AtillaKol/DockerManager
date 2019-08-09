/* -----------------------------------------------------------------------------
* dockerProperties.java
*
* This class will read all information from the docker.properties file.
*
*
* Author: Atilla Kolali
* Version: 1.2
*
* History:
* Version       Date           Who                Changes
* 1.2           05.08.2019     Atilla Kolali      Added method getDockerSocketPath
* 1.1           05.08.2019     Atilla Kolali      Added the constructor
* 1.0           05.08.2019     Atilla Kolali      Created dockerProperties
*
*
* Copyright © 2019 Atilla Kolali. All rights reserved
*
----------------------------------------------------------------------------- */
package ch.kolali.atilla.dockermanager.dockermanagerproxysystem.PropertiesHandler;

import java.util.ResourceBundle;

/**
 * This class will read all information from the docker.properties file.
 *
 * @author Atilla Kolali
 * @version 1.2
 */
public class dockerProperties {

    private String dockerSocketPath;

    /**
     * The constructor.
     *
     */
    public dockerProperties() {
        try {
            ResourceBundle bundle = ResourceBundle.getBundle("Properties/docker");
            //Store the value of the key dockerSocket
            this.dockerSocketPath = bundle.getString("dockerSocket");
        } catch (Exception e) {
            System.out.println("Error while trying to get bundle: " + e.toString());
        }
    }

    /**
     * Returns the value of the dockerSocketPath.
     *
     * @return Value of dockerSocketPath
     */
    public String getDockerSocketPath() {
        return this.dockerSocketPath;
    }

}
