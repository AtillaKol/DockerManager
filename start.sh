#!/bin/bash

# Small Script to make life easier.


# This small function will always check what exit code the latest perform command has returned.
function executingStaps() {

	if [ $1 -eq 0 ]
	then
		echo $2
	else
		echo $3
		# When something went wrong kill the whole script.
		exit 1
	fi
}


# Execute command 'docker info' and pipe everything into /dev/null. So the user will not see any errors.
# The only purpose of this command is to check if docker is running on the host machine.
docker info > /dev/null 2>&1

# Store the exit code from the latest performed command (docker info > /dev/null 2>&1).
exitCode=$?

executingStaps "$exitCode" "Docker is running. docker-compose will start." "Docker is not running. Please start docker and rerun this script."

docker-compose build

exitCode=$?

executingStaps "$exitCode" "docker-compose build was successful. docker-compose up will start." "Something went wrong while running docker-compose build."

docker-compose up

# Stores the configurationService container id.
configurationService=$(docker ps -a -q --filter=ancestor=dockermanager_configurationservice)

# Stores the frontend container id.
frontendContainer=$(docker ps -a -q --filter=ancestor=dockermanager_frontend)

# Stop both containers so no error will occur while trying to delete the container.
docker stop $configurationService $frontendContainer

# Delete both of the containers.
docker rm $configurationService $frontendContainer

echo "Deleted containers configurationservice and frontend"

# Everyting was executed successfully.
exit 0
