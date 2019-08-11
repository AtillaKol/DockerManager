
from flask import Flask
from configReader.flaskINIReader import flaskConfigReader

class flaskApplicationRunner():
	
	flaskHost = None
	flaskPort = None

	#Instanz des Flask-Objekts
	app = Flask(__name__)

	def __init__(self):
		flaskObject = flaskConfigReader()
		# Speichert den Host
		self.flaskHost = flaskObject.getHost()
		# Speichert den Port
		self.flaskPort = flaskObject.getPort()

	def runFlaskApplication(self):
		self.app.run(host=self.flaskHost, port=self.flaskPort)