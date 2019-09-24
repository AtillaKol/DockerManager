
import configparser
from .iniFileOpener import iniFileOpenerClass

# This class will read the data from the ini file.
# It extends from the class iniFileOpenerClass.
class iniReaderClass(iniFileOpenerClass):

	# This method will set the data from the config file into the variabls.
	def readAndStoreConent(self):
		# Stores the return value in config.
		config = super().openAndReadConfigFile()
		self.hostname = config['Host']['hostname']
		self.port = config['Host']['port']

	# This method will store the data form the ini file inside an array.
	# return -> Data from ini-file as an array.
	def returnDataFrominiFile(self):
		# Call method readAndStoreConent
		self.readAndStoreConent()
		data = [self.hostname, self.port]
		return data