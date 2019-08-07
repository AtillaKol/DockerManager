/* -----------------------------------------------------------------------------
* serverDefinition.java
*
* This class will definie the "proxy" server.
*
*
* Author: Atilla Kolali
* Version: 1.3
*
* History:
* Version       Date           Who                Changes
* 1.3           06.08.2019     Atilla Kolali      Added method getDockerContainers
* 1.2           06.08.2019     Atilla Kolali      Added method runServer
* 1.1           06.08.2019     Atilla Kolali      Added the constructor
* 1.0           06.08.2019     Atilla Kolali      Created httpServerProperties
*
*
* Copyright © 2019 Atilla Kolali. All rights reserved
*
----------------------------------------------------------------------------- */
package ch.kolali.atilla.dockermanager.dockermanagerproxysystem.Server;

import ch.kolali.atilla.dockermanager.dockermanagerproxysystem.PropertiesHandler.httpServerProperties;
import ch.kolali.atilla.dockermanager.dockermanagerproxysystem.SocketData.DockerSocketDataHandler;
import com.sun.net.httpserver.HttpContext;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URI;

/**
 * This class will definie the "proxy" server.
 *
 * @author Atilla Kolali
 * @version 1.3
 */
public class serverDefinition {

    private HttpServer server;
    private static DockerSocketDataHandler dockerSocket;

    /**
     * The constructor.
     *
     */
    public serverDefinition() {
        httpServerProperties serverProperties = new httpServerProperties();
        serverDefinition.dockerSocket = new DockerSocketDataHandler();
        try {
            this.server = HttpServer.create(new InetSocketAddress(serverProperties.getHttpServerPort()), 0);
        } catch (IOException e) {
            System.out.println("Couldn't create http Server: " + e.toString());
        }
    }

    /**
     * Starts the server.
     *
     */
    public void runServer() {
        HttpContext context = this.server.createContext("/");
        context.setHandler(serverDefinition::getDockerContainers);
        this.server.start();
    }

    /**
     * This method will handle all GET-Requests.
     *
     * @param exchange Used to generate a HTTP Request
     */
    private static void getDockerContainers(HttpExchange exchange) {
        //Get URI information
        URI uriRequest = exchange.getRequestURI();
        String containerString = serverDefinition.dockerSocket.getRequest(uriRequest.toString());
        try {
            exchange.sendResponseHeaders(200, containerString.getBytes().length);
            OutputStream output = exchange.getResponseBody();
            output.write(containerString.getBytes());
            output.close();
        } catch (IOException e) {
            System.out.println("Something went wrong while creating the response: " + e.toString());
        }
    }

}
