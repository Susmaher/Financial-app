package handlers

import (
	"backendAPI/db"
	"backendAPI/middleware"
	"encoding/json"
	"net/http"
)

type CreateProfileRequest struct {
	Name   string `json:"name"`
	Avatar string `json:"avatar"`
}

func CreateProfile(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	userID := r.Context().Value(middleware.UserIdKey).(int)

	var req CreateProfileRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Name == "" {
		http.Error(w, "Name is required", http.StatusBadRequest)
		return
	}

	err = db.CreateProfile(userID, req.Name, req.Avatar)
	if err != nil {
		http.Error(w, "Profile already exists", http.StatusConflict)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "Profile created successfully"})
}

func GetProfile(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	userID := r.Context().Value(middleware.UserIdKey).(int)

	id, name, avatar, err := db.GetProfile(userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(map[string]any{
		"id":     id,
		"name":   name,
		"avatar": avatar,
	})
}