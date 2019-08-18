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
docker info > /dev/null 2>&1

# Store the exit code from the latest performed command
exitCode=$?

executingStaps "$exitCode" "Docker läuft. docker-compose build wird gestartet." "Docker läuft nicht. Skript wird abgebrochen. Bitte Docker starten und neu versuchen."

docker-compose build

exitCode=$?

executingStaps "$exitCode" "docker-compose build erfolgreich ausgeführt. docker-compose up wird gestartet." "Fehler beim Ausführen vom docker-compose build. Bitte Skript erneut laufen lassen."

docker-compose up

# Delete all containers based from the images dockermanager_python
docker rm $(docker ps -a -q --filter=ancestor=dockermanager_python)

echo "Deleted container"

# Everyting was executed successfully
exit 0