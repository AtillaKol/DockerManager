#!/bin/bash

# Kleines Script, um mein Leben zu vereinfachen


# Diese Methode wird die Exit-Codes der ausgeführten Befehle ansehen, um zu schauen, ob es irgendwo einen Fehler gab. Je nach Exit-Code wird das Skript mit dem Exit Code 1 verlassen
function executingStaps() {

	if [ $1 -eq 0 ]
	then
		echo $2
	else
		echo $3
		# Sobald etwas Schief läuft, stoppe das Skript mit dem Status 1
		exit 1
	fi
}


# Lass den Befehl 'docker info' laufen. Alle Ausgaben werden nach /dev/null weitergeleitet (die Ausgaben sind für den Nutzer grundsätzlich irrelevant)
docker info > /dev/null 2>&1

# Speichere den Exit-Code vom letzten Befehl
exitCode=$?

executingStaps "$exitCode" "Docker läuft. docker-compose build wird gestartet." "Docker läuft nicht. Skript wird abgebrochen. Bitte Docker starten und neu versuchen."

# Führt den Befehl aus
docker-compose build

exitCode=$?

executingStaps "$exitCode" "docker-compose build erfolgreich ausgeführt. docker-compose up wird gestartet." "Fehler beim Ausführen vom docker-compose build. Bitte Skript erneut laufen lassen."

docker-compose up

# Alles erflogreich ausgeführt
exit 0