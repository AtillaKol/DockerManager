
from .configFile import configFileClass

class hostConfigReader(configFileClass):

	proxyURL = None

	# The constructor
	def __init__(self):
		pathToFile = super().createPathToFile("../configurationFiles/host.ini")
		hostConfig = super().openConfigFile(pathToFile)
		host = hostConfig["HostInformation"]["host"]
		port = hostConfig["HostInformation"]["port"]
		# Build proxy path
		self.proxyURL = "http://{}:{}/".format(host, port)

	# This method returns the proxyURL
	def getProxyURL(self):
		return self.proxyURL