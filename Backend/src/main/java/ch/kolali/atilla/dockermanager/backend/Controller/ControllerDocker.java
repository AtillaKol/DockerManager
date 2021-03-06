/* -----------------------------------------------------------------------------
* ControllerDocker.java
*
* This class will contain the logic for the backend.
*
*
* Author: Atilla Kolali
* Version: 1.6
*
* History:
* Version       Date           Who                Changes
* 1.6           03.10.2019     Atilla Kolali      Added method postRequestToSocket
* 1.5           02.10.2019     Atilla Kolali      Added method returnResponseOfProcessBuilder
* 1.4           02.10.2019     Atilla Kolali      Renamed curlDataFromSocket to getRequestToSocket
* 1.3           12.09.2019     Atilla Kolali      Added method curlDataFromSocket
* 1.2           12.09.2019     Atilla Kolali      Added method convertStringJSONtoJsonNode
* 1.1           10.09.2019     Atilla Kolali      Added constructor
* 1.0           09.09.2019     Atilla Kolali      Created ControllerDocker
*
*
* Copyright © 2019 Atilla Kolali. All rights reserved
*
----------------------------------------------------------------------------- */
package ch.kolali.atilla.dockermanager.backend.Controller;

import ch.kolali.atilla.dockermanager.backend.PropertiesReader.dockerProperties;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

/**
 * This class will contain the logic for the backend.
 *
 * @author Atilla Kolali
 * @version 1.6
 */
@Service
@Scope("prototype")
public class ControllerDocker {

    @Autowired
    private dockerProperties dockerProp;

    // Both will store the data from the class dockerProperties.
    private String dockerHost;
    private String dockerSocket;

    //Logger object for logging error.
    private final Logger LOGGER = LoggerFactory.getLogger(ControllerDocker.class);

    /**
     * The constructor.
     *
     * @param dockerProp Is needed for injection.
     */
    public ControllerDocker(dockerProperties dockerProp) {
        this.dockerProp = dockerProp;
        this.dockerHost = this.dockerProp.getDockerHost();
        this.dockerSocket = this.dockerProp.getDockerSocket();
    }

    /**
     * This method will perform all GET-Requests to the docker socket.
     *
     * @param endpoint Which endpoint should be used.
     * @return A JsonNode-Object with data from the socket.
     */
    public JsonNode getRequestToSocket(String endpoint) {
        ObjectMapper mapper = new ObjectMapper();
        ProcessBuilder proBuilder = new ProcessBuilder("curl", "--unix-socket", this.dockerSocket, "http://" + this.dockerHost + endpoint);
        try {
            return this.convertStringJSONtoJsonNode(mapper, this.returnResponseOfProcessBuilder(proBuilder).toString());
        } catch (IOException e) {
            this.LOGGER.error("Could not return data from GET-Request to socket: " + e.toString());
        }
        return null;
    }

    /**
     * This method will perform all POST-Requests to the docker socket.
     *
     * @param endpoint Which endpoint should be used.
     * @return A JsonNode-Object with data from the socket.
     */
    public JsonNode postRequestToSocket(String endpoint) {
        ObjectMapper mapper = new ObjectMapper();
        ProcessBuilder proBuilder = new ProcessBuilder("curl", "-X", "POST", "--unix-socket", this.dockerSocket, "http://" + this.dockerHost + endpoint);
        try {
            return this.convertStringJSONtoJsonNode(mapper, this.returnResponseOfProcessBuilder(proBuilder).toString());
        } catch (IOException e) {
            this.LOGGER.error("Could not return data from POST-Request to socket: " + e.toString());
        }
        return null;
    }

    /**
     * This method will get a ProcessBuilder and return the output of the
     * command as a StringBuilder.
     *
     * @param proBuilder A ProcessBuilder e.g a command.
     * @return The output of the command as a StringBuilder.
     */
    private StringBuilder returnResponseOfProcessBuilder(ProcessBuilder proBuilder) {
        try {
            Process pro = proBuilder.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(pro.getInputStream()));
            StringBuilder builder = new StringBuilder();
            String line = null;
            while ((line = reader.readLine()) != null) {
                builder.append(line);
                builder.append(System.getProperty("line.separator"));
            }
            return builder;
        } catch (IOException e) {
            this.LOGGER.error("Something failed in the process: " + e.toString());
        }
        return null;
    }

    /**
     * Convert a given JSON-String into an JsonNode-Object and returns it.
     *
     * @param mapper An ObjectMapper-Object
     * @param json The JSON as a String
     * @return An object of type JsonNode
     * @throws IOException Throws an IOException when something failed
     */
    private JsonNode convertStringJSONtoJsonNode(ObjectMapper mapper, String json) throws IOException {
        return mapper.readTree(json);
    }

}
