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

executingStaps "$exitCode" "Docker läuft. docker-compose build wird gestartet." "Docker läuft nicht. Skript wird abgebrochen. Bitte Docker starten und neu versuchen."

docker-compose build

exitCode=$?

executingStaps "$exitCode" "docker-compose build erfolgreich ausgeführt. docker-compose up wird gestartet." "Fehler beim Ausführen vom docker-compose build. Bitte Skript erneut laufen lassen."

docker-compose up

# Store the container id which should be stopped and deleted
dockerContainerID=$(docker ps -a -q --filter=ancestor=dockermanager_python)

# Stop the container if needed (does not create an error, so just do it :D)
docker stop $dockerContainerID

# Delete the container
docker rm $dockerContainerID

echo "Deleted container"

# Everyting was executed successfully
exit 0