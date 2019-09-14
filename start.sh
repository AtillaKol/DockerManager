#!/bin/bash

# Small Script to make life easier


# This small function will always check what exit code the latest perform command has returned
function executingStaps() {

	if [ $1 -eq 0 ]
	then
		echo $2
	else
		echo $3
		# When something went wrong kill the whole script 
		exit 1
	fi
}


# Execute command docker info and pipe everything into /dev/null -> output is not imported
# The only purpose of this command is to check if docker is running on the host machine
docker info > /dev/null 2>&1

# Store the exit code from the latest performed command
exitCode=$?

executingStaps "$exitCode" "Docker is running. docker-compose will start." "Docker is not running. Please start docker and rerun this script."

docker-compose build

exitCode=$?

executingStaps "$exitCode" "docker-compose build was successful. docker-compose up will start." "Something went wrong while running docker-compose build."

docker-compose up

# Stores the frontend container id
frontendContainer=$(docker ps -a -q --filter=ancestor=dockermanager_frontend)

# Stop the container to make the deleting work without getting an error.
docker stop $frontendContainer

# Delete the containers
docker rm $frontendContainer

echo "Deleted containers backend and frontend"

# Everyting was executed successfully
exit 0
