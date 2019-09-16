
from Controller.Controller import controllerClass
from flask_restful import Resource

# This class will define the get and post methods -> Only two needed because their will not be any other methods.
# It extends Resource from flask_restful.
class restControllerClass(Resource):

	# This method will be used to instantiate one object.
	# This annotation @classmethod means that this methods belongs to the class and not to the object.
	@classmethod
	def initAsClassMethod(cls):
		# instantiate class controllerClass
		cls.controllerObject = controllerClass()

	# This method will be called as soon as a get request happens and it will call the method buildJSONObject from the class controllerClass.
	# return -> a json-object containing all data from the host.ini-file. 
	def get(self):
		return self.controllerObject.buildJSONObject()

	def post(self):
		pass