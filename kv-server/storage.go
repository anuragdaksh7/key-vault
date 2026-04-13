package main

var db = map[string]EnvPayload{}

func SaveEnv(data EnvPayload) {
	db[data.ID] = data
}

func GetEnv(id string) (EnvPayload, bool) {
	val, ok := db[id]
	return val, ok
}
