/* -----------------------------------------------------------------------------
* DockerSocketDataHandler.java
*
* This class will handle all requests towards the Docker Socket.
*
*
* Author: Atilla Kolali
* Version: 1.2
*
* History:
* Version       Date           Who                Changes
* 1.2           07.08.2019     Atilla Kolali      Added method getStatusCode
* 1.1           06.08.2019     Atilla Kolali      Added method getRequest
* 1.0           06.08.2019     Atilla Kolali      Created DockerSocketDataHandler
*
*
* Copyright © 2019 Atilla Kolali. All rights reserved
*
----------------------------------------------------------------------------- */
package ch.kolali.atilla.dockermanager.dockermanagerproxysystem.SocketData;

import ch.kolali.atilla.dockermanager.dockermanagerproxysystem.PropertiesHandler.dockerProperties;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * This class will handle all requests towards the Docker Socket.
 *
 * @author Atilla Kolali
 * @version 1.1
 */
public class DockerSocketDataHandler {

    private dockerProperties docker = new dockerProperties();
    private int statusCode;

    private final Logger LOGGER = LoggerFactory.getLogger(DockerSocketDataHandler.class);

    /**
     * This method will handle all endpoints with the type of GET.
     *
     * @param endpoint The endpoint which should be used
     * @return When all worked correctly it will return the json (as String)
     * otherwise it will return null.
     */
    public String getRequest(String endpoint) {
        Process p;
        String output;
        try {
            this.LOGGER.info("Curl is going to be executed");
            p = Runtime.getRuntime().exec("curl -i --unix-socket " + this.docker.getDockerSocketPath() + " http://localhost" + endpoint);
            BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
            StringBuilder builder = new StringBuilder();
            while ((output = reader.readLine()) != null) {
                // When the string contains http it should use this string to get the status code
                if (output.contains("HTTP")) {
                    this.statusCode = Integer.parseInt(output.substring(9, 12));
                }
                // To Do: Add a method which legit checks if string is valid json
                if (output.contains("{")) {
                    builder.append(output);
                }
            }
            p.waitFor();
            p.destroy();
            this.LOGGER.info("Curl executed successfully and output retunred to the user");
            return builder.toString();
        } catch (IOException | InterruptedException e) {
            this.LOGGER.error("Something went wrong while running Process: " + e.toString());
        }
        return null;
    }

    /**
     * This method will return the status code from the curl command.
     *
     * @return Value of statusCode
     */
    public int getStatusCode() {
        return this.statusCode;
    }

}
