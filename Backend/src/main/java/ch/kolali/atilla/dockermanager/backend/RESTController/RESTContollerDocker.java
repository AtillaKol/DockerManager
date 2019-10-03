/* -----------------------------------------------------------------------------
* RESTContollerDocker.java
*
* This class will define all REST-End points for Docker.
*
*
* Author: Atilla Kolali
* Version: 1.9
*
* History:
* Version       Date           Who                Changes
* 1.9           03.10.2019     Atilla Kolali      Added method unpauseContainer
* 1.8           03.10.2019     Atilla Kolali      Added method pauseContainer
* 1.7           03.10.2019     Atilla Kolali      Added method renameContainer
* 1.6           03.10.2019     Atilla Kolali      Added method killContainer
* 1.5           03.10.2019     Atilla Kolali      Added method restartContainer
* 1.4           03.10.2019     Atilla Kolali      Added method startContainer
* 1.3           03.10.2019     Atilla Kolali      Added method stopContainer
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * This class will define all REST-End points for Docker.
 *
 * @author Atilla Kolali
 * @version 1.9
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
            return this.controllerDocker.getRequestToSocket("/containers/json?all=" + builder.toString());
        }
        return this.controllerDocker.getRequestToSocket("/containers/json");
    }

    /**
     * This method will be called at thr route /containers/{id}/json and it will
     * return information of the container with the container-id of id.
     *
     * @param id The ID of the container.
     * @return A Json with all information of the container.
     */
    @GetMapping("/containers/{id}/json")
    public JsonNode getContainer(@PathVariable("id") String id) {
        return this.controllerDocker.getRequestToSocket("/containers/" + id + "/json");
    }

    /**
     * This method will be called at the route /containers/{id}/start and it
     * will start the container with the container-id of id.
     *
     * @param id The ID of the container.
     * @return A JSON when something went wrong.
     */
    @PostMapping("/containers/{id}/start")
    public JsonNode startContainer(@PathVariable("id") String id) {
        return this.controllerDocker.postRequestToSocket("/containers/" + id + "/start");
    }

    /**
     * This method will be called at the route /containers/{id}/stop and it will
     * stop the container with the container-id of id.
     *
     * @param id The ID of the container.
     * @return A JSON when something went wrong.
     */
    @PostMapping("/containers/{id}/stop")
    public JsonNode stopContainer(@PathVariable("id") String id) {
        return this.controllerDocker.postRequestToSocket("/containers/" + id + "/stop");
    }

    /**
     * This method will be called at the route /containers/{id}/restart and it
     * will restart the container with the container-id of id.
     *
     * @param id The ID of the container.
     * @return A JSON when something went wrong.
     */
    @PostMapping("/containers/{id}/restart")
    public JsonNode restartContainer(@PathVariable("id") String id) {
        return this.controllerDocker.postRequestToSocket("/containers/" + id + "/restart");
    }

    /**
     * This method will be called at the route /containers/{id}/kill and it will
     * kill a running container with the container-id of id.
     *
     * @param id The ID of the container.
     * @return A JSON when something went wrong.
     */
    @PostMapping("/containers/{id}/kill")
    public JsonNode killContainer(@PathVariable("id") String id) {
        return this.controllerDocker.postRequestToSocket("/containers/" + id + "/kill");
    }

    /**
     * This method will be called at the route /containers/{id}/rename and it
     * will rename the container with the container-id of id when the request
     * param name is set.
     *
     * @param id The ID of the container.
     * @param req a ServletRequest object for getting the parameters.
     * @return A JSON when something went wrong.
     */
    @PostMapping("/containers/{id}/rename")
    public JsonNode renameContainer(@PathVariable("id") String id, ServletRequest req) {
        // Store the request params and their values in this map.
        Map<String, String[]> requestParameters = req.getParameterMap();
        if (requestParameters.containsKey("name")) {
            StringBuilder builder = new StringBuilder();
            for (String str : requestParameters.get("name")) {
                builder.append(str);
            }
            return this.controllerDocker.postRequestToSocket("/containers/" + id + "/rename?name=" + builder.toString());
        }
        return null;
    }

    /**
     * This method will be called at the route /containers/{id}/pause and it
     * will pause the container with the container-id of id.
     *
     * @param id The ID of the container.
     * @return A JSON when something went wrong.
     */
    @PostMapping("/containers/{id}/pause")
    public JsonNode pauseContainer(@PathVariable("id") String id) {
        return this.controllerDocker.postRequestToSocket("/containers/" + id + "/pause");
    }

    /**
     * This method will be called at the route /containers/{id}/unpaue and it
     * will unpause the container with the container-id of id.
     *
     * @param id The ID of the container.
     * @return A JSON when something went wrong.
     */
    @PostMapping("/containers/{id}/unpause")
    public JsonNode unpauseContainer(@PathVariable("id") String id) {
        return this.controllerDocker.postRequestToSocket("/containers/" + id + "/unpause");
    }

}
