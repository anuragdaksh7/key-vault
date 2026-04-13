package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/share", ShareHandler).Methods("POST")
	r.HandleFunc("/env/{id}", GetEnvHandler).Methods("GET")

	r.HandleFunc("/hi", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}).Methods("GET")

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type"},
		AllowCredentials: true,
	})

	handler := c.Handler(r)

	log.Println("Server running on :8080")
	http.ListenAndServe(":8080", handler)
}
