
from .configFile import configFileClass

class hostConfigReader(configFileClass):

	host = None
	port = None

	# The constructor
	def __init__(self):
		pathToFile = super().createPathToFile("../configurationFiles/host.ini")
		hostConfig = super().openConfigFile(pathToFile)
		# Stores the value host inside the variable host
		self.host = hostConfig["HostInformation"]["host"]
		# Stores the value port inside the variable port
		self.port = hostConfig["HostInformation"]["port"]

	# This method will return the value of host
	def getHost(self):
		return self.host

	# This method will return the value of port
	def getPort(self):
		return self.port