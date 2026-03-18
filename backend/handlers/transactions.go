package handlers

import (
	"backendAPI/db"
	"backendAPI/middleware"
	"encoding/json"
	"net/http"
)

type CreateTransactionRequest struct {
	Name string `json:"name"`
	Category   string `json:"transactionCategory"`
	Date string `json:"date"`
	Amount float64 `json:"amount"`
	Recurring bool `json:"recurring"`
}

func CreateTransaction(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	userID := r.Context().Value(middleware.UserIdKey).(int)

	var req CreateTransactionRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Name == "" {
		http.Error(w, "Name is required", http.StatusBadRequest)
		return
	}
	if req.Category == "" {
		http.Error(w, "Category is required", http.StatusBadRequest)
		return
	}
	if req.Date == "" {
		http.Error(w, "Date is required", http.StatusBadRequest)
		return
	}

	err = db.CreateTransaction(userID, req.Name, req.Category,req.Date, req.Amount, req.Recurring);
	if err != nil {
		http.Error(w, err.Error(), http.StatusConflict)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "Transaction created successfully"})
}

func GetTransaction(w http.ResponseWriter, r *http.Request) {
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