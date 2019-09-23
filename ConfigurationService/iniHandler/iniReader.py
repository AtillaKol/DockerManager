
import os
import configparser
from iniFileOpener import iniFileReaderOpener

# This class will read the data from the ini file.
# It extends from the class iniFileReaderOpener.
class iniReaderClass(iniFileReaderOpener):
	
	# The Constructor.
	def __init__(self):
		# Calls a method from this class.
		self.readAndStoreConent()


	# This method will set the data from the config file into the variabls.
	def readAndStoreConent(self):
		# Call parent method.
		config = super().openAndReadConfigFile()
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