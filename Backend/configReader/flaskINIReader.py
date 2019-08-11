
from .configFile import configFileClass

class flaskConfigReader(configFileClass):

	host = None
	port = None

	# Der Konstruktor
	def __init__(self):
		pathToFile = super().createPathToFile("../configurationFiles/flask.ini")
		flaskConfig = super().openConfigFile(pathToFile)
		#Hollt den Host aus dem ini-File
		self.host = flaskConfig['FlaskConfiguration']['host']
		#Hollt den Port aus dem int-File
		self.port = flaskConfig['FlaskConfiguration']['port']

	# Gibt den Wert der Variable host zurück
	def getHost(self):
		return self.host

	# Gibt den Wert der Variable port zurück
	def getPort(self):
		return self.port