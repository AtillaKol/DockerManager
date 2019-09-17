
from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from RESTController.restController import restControllerClass

# This is the main class. It will define everything to run the application.
class mainClass:

	# The constructor.
	def __init__(self):
		self.app = Flask(__name__)
		api = Api(self.app)
		CORS(self.app, resources={r"*": {"origins": "*"}})
		# Call the method initAsClassMethod to create an object of the class Controller.
		restControllerClass.initAsClassMethod()
		# Add a Rest-End point.
		api.add_resource(restControllerClass, '/configurationService')

	# This method will run the flask application.
	def runFlaskApplication(self):
		self.app.run(host='0.0.0.0', port='5000', debug=True)


if __name__ == '__main__':
	mainClassObject = mainClass()
	mainClassObject.runFlaskApplication()