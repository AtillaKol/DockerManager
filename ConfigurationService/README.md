# Configuration Service
This service should be used as a configuration service for the frontend. It will be written in Python<br>
and it will run in a docker-container.
## What to expect ?
- Change the hostname where the Backend runs.
- Change the port where the Backend runs.
- Return the current Hostname and port where the Backend runs.<br>
## How does the Frontend interact with the service ?
The Frontend can interact with the Configuration Service via REST.
## Currently implemented end-points
/configurationService <br>
- GET: When performing a get-request on configurationService the service will return the data from the ini-file in a json format. The request does not need any headers or request parameters.
- PUT: When performing a put-request on configurationService the service will be able to modify the ini-file. The request does not need any headers or request parameters but it needs a request body in following format:<br>
```{"hostname": "YOURDATA", "port": "YOURDATA"}```
