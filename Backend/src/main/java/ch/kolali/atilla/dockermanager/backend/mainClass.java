/* -----------------------------------------------------------------------------
* mainClass.java
*
* This class contains the main-method to launch and run the application.
*
*
* Author: Atilla Kolali
* Version: 1.1
*
* History:
* Version       Date           Who                Changes
* 1.1           05.08.2019     Atilla Kolali      Added main-method
* 1.0           05.08.2019     Atilla Kolali      Created mainClass
*
*
* Copyright © 2019 Atilla Kolali. All rights reserved
*
----------------------------------------------------------------------------- */
package ch.kolali.atilla.dockermanager.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * This class contains the main-method to launch and run the application.
 *
 * @author Atilla Kolali
 * @version 1.1
 */
@SpringBootApplication
public class mainClass {

    public static void main(String[] args) {
        SpringApplication.run(mainClass.class, args);
    }
}
