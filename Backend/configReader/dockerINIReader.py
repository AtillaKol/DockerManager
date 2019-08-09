
from .configFile import configFileClass

class dockerConfigReader(configFileClass):

	dockerSocket = None

	# Der Konstruktor
	def __init__():
		dirname = super().createPathToFile("../configurationFiles/docker.ini")
		dockerConfig = super().openConfigFile()
		self.dockerSocket = dockerConfig["DockerConfiguration"]["dockerSocket"]

	# Gibt den Wert der Variable dockerSocket zurück
	def getDockerSocket():
		return self.dockerSocket