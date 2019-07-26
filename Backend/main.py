
from configReader.flaskINIReader import flaskConfigReader

flaskConfigInstance = flaskConfigReader()

if __name__ == '__main__':
	print(flaskConfigInstance.getHost())