package configs

import (
	"os"
)

//define configs in this file

func GetPort() string {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	return port
}

func GetMongoDBUsername() string {
	username := os.Getenv("MONGODB_USERNAME")
	if username == "" {
		username = "username"
	}
	return username
}

func GetMongoDBPassword() string {
	password := os.Getenv("MONGODB_PASSWORD")
	if password == "" {
		password = "password"
	}
	return password
}

func GetMongoDBCLUSTERURI() string {
	uri := os.Getenv("MONGODB_CLUSTERURI")
	if uri == "" {
		uri = "mongodb://localhost:27017"
	}
	return uri
}

func GetMongoDBName() string {
	name := os.Getenv("MONGODB_DBNAME")
	if name == "" {
		name = "noname"
	}
	return name
}

func GetMongoDBStartUIR() string {
	startURI := os.Getenv("MONGODB_START_URI")
	if startURI == "" {
		startURI = "mongodb://"
	}
	return startURI
}

func GetLogFileName() string {
	logFileName := os.Getenv("LOG_FILE_NAME")
	if logFileName == "" {
		logFileName = "log.txt"
	}
	return logFileName
}
