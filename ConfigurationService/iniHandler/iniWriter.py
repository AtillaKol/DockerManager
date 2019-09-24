
import configparser
from .iniFileOpener import iniFileOpenerClass

# This class will modify the data from the ini file.
class iniWriterClass(iniFileOpenerClass):
	
	# The Constructor.
	def __init__(self):
		# Stores the return value in self.config.
		self.config = super().openAndReadConfigFile()

	# This method will change the values in the 
	def changeValuesIniniFile(self, hostname, port):
		self.config.set("Host", "hostname", hostname)
		self.config.set("Host", "port", port)
		with open("./ini-Files/host.ini", "w") as configNewData:
			self.config.write(configNewData)
