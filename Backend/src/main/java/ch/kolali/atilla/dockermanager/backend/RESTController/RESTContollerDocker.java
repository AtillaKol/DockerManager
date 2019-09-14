/* -----------------------------------------------------------------------------
* RESTContollerDocker.java
*
* This class will define all REST-End points for Docker.
*
*
* Author: Atilla Kolali
* Version: 1.2
*
* History:
* Version       Date           Who                Changes
* 1.2           13.09.2019     Atilla Kolali      Added method getContainer
* 1.1           13.09.2019     Atilla Kolali      Added method getContainers
* 1.0           09.09.2019     Atilla Kolali      Created RESTContollerDocker
*
*
* Copyright © 2019 Atilla Kolali. All rights reserved
*
----------------------------------------------------------------------------- */
package ch.kolali.atilla.dockermanager.backend.RESTController;

import ch.kolali.atilla.dockermanager.backend.Controller.ControllerDocker;
import com.fasterxml.jackson.databind.JsonNode;
import java.util.Map;
import javax.servlet.ServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

/**
 * This class will define all REST-End points for Docker.
 *
 * @author Atilla Kolali
 * @version 1.2
 */
@CrossOrigin("*")
@RestController
public class RESTContollerDocker {

    @Autowired
    private ControllerDocker controllerDocker;

    /**
     * This method will be called at the route /containers/json and it will
     * return, depending on the request parameters, all or just the running
     * containers.
     *
     * @param req a ServletRequest object for getting the parameters.
     * @return When added the requestparam "all" it will return all containers
     * else it will just return the running containers.
     */
    @GetMapping("/containers/json")
    public JsonNode getContainers(ServletRequest req) {
        Map<String, String[]> requestParameters = req.getParameterMap();
        if (requestParameters.containsKey("all")) {
            //Get all String data from the parameter
            StringBuilder builder = new StringBuilder();
            for (String value : requestParameters.get("all")) {
                builder.append(value);
            }
            return this.controllerDocker.curlDataFromSocket("/containers/json?all=" + builder.toString());
        }
        return this.controllerDocker.curlDataFromSocket("/containers/json");
    }

    /**
     * This method will be called at thr route /containers/{id}(json and it will
     * return information of the container with the containerid of id.
     *
     * @param id The ID of the container.
     * @return A Json with all information of the container.
     */
    @GetMapping("/containers/{id}/json")
    public JsonNode getContainer(@PathVariable("id") String id) {
        return this.controllerDocker.curlDataFromSocket("/containers/" + id + "/json");
    }

}
