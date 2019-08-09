
from FlaskApplication.runFlask import flaskApplicationRunner

if __name__ == '__main__':
	
	# Instaz von flaskApplicationRunner
	flaskApplication = flaskApplicationRunner()

	# Die App laufen lassen
	flaskApplication.runFlaskApplication()