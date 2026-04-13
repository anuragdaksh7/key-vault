package main

import (
	"encoding/json"
	"net/http"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
)

func ShareHandler(w http.ResponseWriter, r *http.Request) {
	var payload EnvPayload

	json.NewDecoder(r.Body).Decode(&payload)

	payload.ID = uuid.New().String()

	SaveEnv(payload)

	json.NewEncoder(w).Encode(map[string]string{
		"id": payload.ID,
	})
}

func GetEnvHandler(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	data, ok := GetEnv(id)
	if !ok {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(data)
}
