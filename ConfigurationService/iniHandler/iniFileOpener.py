
import os
import configparser

# This class will open the configfile for reading.
class iniFileOpenerClass:

	# This method will open and read the config file and return a object of ConfigParser.
	# return -> A configparser object.
	def openAndReadConfigFile(self):
		# Store the path to this file.
		pathToCurrentPYFile = os.path.dirname(os.path.abspath(__file__))
		config = configparser.ConfigParser()
		# Read the file relativ from where this file is stored.
		config.read("{}{}".format(pathToCurrentPYFile, "/../ini-Files/host.ini"))
		return config
