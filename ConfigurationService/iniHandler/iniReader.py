
import os
import configparser

# This class will read the data from the ini file.
class iniReaderClass:
	
	hostname = None
	port = None

	# The Constructor.
	def __init__(self):
		# Calls a method from this class.
		self.readAndStoreConent()


	# This method will read the ini file and store the content in the respective variable.
	def readAndStoreConent(self):
		# Store the path to this file.
		pathToCurrentPYFile = os.path.dirname(os.path.abspath(__file__))
		config = configparser.ConfigParser()
		# Read the file relativ from where this file is stored.
		config.read("{}{}".format(config, "../ini-Files.host.ini"))
		self.hostname = config['Host']['hostname']
		self.port = config['Host']['port']


	# This method will return the hostname defined in the host.ini file.
	# return -> Hostname defined in the host.ini file.
	def getHostname(self):
		return self.hostname

	# This method will return the port defined in the host.ini file.
	# return -> Port defined in the host.ini file.
	def getPort(self):
		return self.port