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

# Stores the python container id
backendContainer=$(docker ps -a -q --filter=ancestor=dockermanager_backend)

# Stores the frontend container id
frontendContainer=$(docker ps -a -q --filter=ancestor=dockermanager_frontend)

# Stop both containers if needed (does not create an error, so just do it :D)
docker stop $backendContainer && docker stop $frontendContainer

# Delete the containers
docker rm $backendContainer && docker rm $frontendContainer

echo "Deleted container"

# Everyting was executed successfully
exit 0