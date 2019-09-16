import os
import configparser


path = os.path.dirname(os.path.abspath(__file__))
config = configparser.ConfigParser()
config.read("{}{}".format(path, "/../ini-Files/host.ini"))
penis = config['Host']['hostname']
print(penis)
