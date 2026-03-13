package handlers

import (
	"backendAPI/db"
	"backendAPI/middleware"
	"encoding/json"
	"net/http"
)

type RegisterRequest struct {
    Name string `json:"name"`
	Email string `json:"email"`
	Password string `json:"password"`
}

func Register(w http.ResponseWriter, r *http.Request){
	if r.Method != http.MethodPost{
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req RegisterRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Email == "" || req.Password == "" || req.Name == "" {
        http.Error(w, "Email and password are required", http.StatusBadRequest)
        return
    }

	if len(req.Password) < 8 {
        http.Error(w, "Password must be at least 8 characters", http.StatusBadRequest)
        return
    }

	hash, err := db.HashPassword(req.Password)
    if err != nil {
        http.Error(w, "Something went wrong", http.StatusInternalServerError)
        return
    }

	_, err = db.DB.Exec(
        `INSERT INTO users ("email", "passwordHash","name","createdAt") VALUES ($1, $2, $3, NOW())`,
        req.Email, hash, req.Name,
    )
    if err != nil {
        http.Error(w, err.Error(), http.StatusConflict)
        return
    }

    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(map[string]string{"message": "User created successfully"})

}

type LoginRequest struct {
	Email string `json:"email"`
	Password string `json:"password"`
}

func Login(w http.ResponseWriter, r *http.Request){
	if r.Method != http.MethodPost {
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
        return
    }

    var req LoginRequest
    err := json.NewDecoder(r.Body).Decode(&req)
    if err != nil {
        http.Error(w, "Invalid request body", http.StatusBadRequest)
        return
    }

    if req.Email == "" || req.Password == "" {
        http.Error(w, "Email and password are required", http.StatusBadRequest)
        return
    }

    var userId int
    var passwordHash string
    err = db.DB.QueryRow(
        `SELECT "id", "passwordHash" FROM users WHERE email = $1`,
        req.Email,
    ).Scan(&userId, &passwordHash)

	if err != nil {
        http.Error(w, "Invalid email or password", http.StatusUnauthorized)
        return
    }

    if !db.CheckPassword(req.Password, passwordHash) {
        http.Error(w, "Invalid email or password", http.StatusUnauthorized)
        return
    }

    token, err := db.CreateSession(userId)
	if err != nil {
 		http.Error(w, "Something went wrong", http.StatusInternalServerError)
    	return
	}

	http.SetCookie(w, &http.Cookie{
	    Name:     "session_token",
	    Value:    token,
	    HttpOnly: true,
	    Secure:   false, // set to true in production with HTTPS
	    SameSite: http.SameSiteStrictMode,
	    Path:     "/",
	    MaxAge:   86400, // 24 hours in seconds
	})

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
	    "message": "Login successful",
	})
}

func Profile(w http.ResponseWriter, r *http.Request) {
    userId, ok := r.Context().Value(middleware.UserIdKey).(int)
    if !ok {
        http.Error(w, "Unauthorized", http.StatusUnauthorized)
        return
    }

    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(map[string]any{"userId": userId})
}

func Logout(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
        return
    }

    cookie, err := r.Cookie("session_token")
    if err != nil {
        http.Error(w, "Not logged in", http.StatusBadRequest)
        return
    }

    db.DB.Exec("DELETE FROM sessions WHERE token = $1", cookie.Value)

    http.SetCookie(w, &http.Cookie{
        Name:     "session_token",
        Value:    "",
        HttpOnly: true,
        Secure:   false,
        SameSite: http.SameSiteStrictMode,
        Path:     "/",
        MaxAge:   -1,
    })

    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(map[string]string{"message": "Logged out successfully"})
}