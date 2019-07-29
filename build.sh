#!/bin/bash

# Kleines Script, um mein Leben zu vereinfachen

# Builde das docker-compose file
docker-compose build


# Starte das Image und lösche es, sobald es verlassen ist
docker run --rm dockermanager_python 