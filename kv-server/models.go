package main

type EnvPayload struct {
	ID    string `json:"id"`
	Env   string `json:"env"`
	Key   string `json:"key"`
	Nonce string `json:"nonce"`
}
