
from .configFile import configFileClass

class flaskConfigReader(configFileClass):

	host = None
	port = None
	debug = None

	# The constructor
	def __init__(self):
		pathToFile = super().createPathToFile("../configurationFiles/flask.ini")
		flaskConfig = super().openConfigFile(pathToFile)
		# Stores the value host inside the variable host
		self.host = flaskConfig['FlaskConfiguration']['host']
		# Stores the value port inside the variable port
		self.port = flaskConfig['FlaskConfiguration']['port']
		# Stores the value debug inside the variable debug
		self.debug = flaskConfig['FlaskConfiguration']['debug']

	# This method will return the value of host
	def getHost(self):
		return self.host

	# This method will return the value of port
	def getPort(self):
		return self.port

	# This method will return the value of debug
	def getDebug(self):
		return self.debug