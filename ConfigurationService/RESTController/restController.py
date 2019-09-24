
from Controller.Controller import controllerClass
from flask import request
from flask_restful import Resource

# This class will define the get and put methods -> Only two needed because their will not be any other methods.
# It extends Resource from flask_restful.
class restControllerClass(Resource):

	# This method will be used to instantiate one object.
	# This annotation @classmethod means that this method belongs to the class and not to the object.
	@classmethod
	def initAsClassMethod(cls):
		# instantiate class controllerClass
		cls.controllerObject = controllerClass()

	# This method will be called as soon as a get request happens and it will call the method buildJSONObject from the class controllerClass.
	# return -> a json-object containing all data from the host.ini-file. 
	def get(self):
		return self.controllerObject.buildJSONObject()

	# This method will be called as soon as a put request happens and will call the method modifyIniFile from the class controllerObject.
	def put(self):
		body = request.get_json()
		self.controllerObject.modifyIniFile(body)