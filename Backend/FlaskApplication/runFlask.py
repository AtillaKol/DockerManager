
from flask import Flask
from flask_restful import Api, Resource
from flask_cors import CORS
from configReader.flaskINIReader import flaskConfigReader
from containers.containerJson import containersSimple
from containers.containerWithIDJson import containersIDJson

class flaskApplicationRunner:
	
	flaskHost = None
	flaskPort = None
	flaskDebugMode = None
	app = None
	api = None

	# The constructor
	def __init__(self):
		flaskObject = flaskConfigReader()
		
		# Creates an instance of Flask
		self.app = Flask(__name__)

		# Creates an instance of API
		self.api = Api(self.app)

		# Will store the host
		self.flaskHost = flaskObject.getHost()
		
		# Will store the port
		self.flaskPort = flaskObject.getPort()

		# Will store the debugmode while project is in development
		self.flaskDebugMode = flaskObject.getDebug()

	# This method will run the flask application
	def runFlaskApplication(self):
		self.api.add_resource(containersSimple, '/container/json')
		self.api.add_resource(containersIDJson, '/container/<string:ID>/json')
		self.app.run(host=self.flaskHost, port=self.flaskPort, debug=self.flaskDebugMode)
		cors = CORS(self.app, resources={r"/*":{"origins":"*"}})