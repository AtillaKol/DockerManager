
import configparser
import os

class configFileClass:

	# Öffnet ein .init-File (Diese Methode wird vererbt)
	# param pathToFile -> Der Pfad zum .init-File
	# return -> Ein Objekt vom Typ configparser, welches einn inti file gelesen hat
	def openConfigFile(self, pathToFile):
		config = configparser.ConfigParser()
		config.read_file(open(pathToFile))
		return config

	# Diese Methode gibt den Pfad von aktuellen Verzeichnis zum ini-File
	# param iniFileRelativPath -> Der Pfad relativ vom aktuellen Verzeichnis
	# return -> Der Pfad zum gewünschten ini-File
	def createPathToFile(self, iniFileRelativPath):
		dirname = os.path.dirname(__file__)
		return os.path.join(dirname, iniFileRelativPath)