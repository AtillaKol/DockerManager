/* -----------------------------------------------------------------------------
* httpServerProperties.java
*
* This class will read all information from the httpServer.properties file.
*
*
* Author: Atilla Kolali
* Version: 1.2
*
* History:
* Version       Date           Who                Changes
* 1.2           05.08.2019     Atilla Kolali      Added method getHttpServerPort
* 1.1           05.08.2019     Atilla Kolali      Added the constructor
* 1.0           05.08.2019     Atilla Kolali      Created httpServerProperties
*
*
* Copyright © 2019 Atilla Kolali. All rights reserved
*
----------------------------------------------------------------------------- */
package ch.kolali.atilla.dockermanager.dockermanagerproxysystem.PropertiesHandler;

import java.util.ResourceBundle;

/**
 * This class will read all information from the httpServer.properties file.
 *
 * @author Atilla Kolali
 * @version 1.2
 */
public class httpServerProperties {

    private int httpServerPort;

    /**
     * The constructor
     *
     */
    public httpServerProperties() {
        try {
            ResourceBundle bundle = ResourceBundle.getBundle("Properties/httpServer");
            try {
                this.httpServerPort = Integer.valueOf(bundle.getString("httpServerPort"));
            } catch (NumberFormatException e) {
                System.out.println("Error while trying to convert from string to int: " + e.toString());
            }
        } catch (Exception e) {
            System.out.println("Error while trying to get bundle: " + e.toString());
        }
    }

    /**
     * Returns the value of the httpServerPort
     *
     * @return Value of httpServerPort
     */
    public int getHttpServerPort() {
        return this.httpServerPort;
    }

}
