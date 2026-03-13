package main

import (
	"backendAPI/db"
	"backendAPI/handlers"
	"backendAPI/middleware"
	"fmt"
	"net/http"
	"time"
)

func main() {
	db.Connect()
	http.HandleFunc("/register", middleware.CORS(handlers.Register))
	http.HandleFunc("/login", middleware.CORS(handlers.Login))
	http.HandleFunc("/profile", middleware.CORS(middleware.RequireAuth(handlers.Profile)))
	http.HandleFunc("/logout", middleware.CORS(middleware.RequireAuth(handlers.Logout)))
	http.HandleFunc("/profile/create", middleware.CORS(middleware.RequireAuth(handlers.CreateProfile)))
	http.HandleFunc("/profile/me", middleware.CORS(middleware.RequireAuth(handlers.GetProfile)))
	
	go func() {
	    for range time.Tick(1 * time.Hour) {
	        db.DeleteExpiredSessions()
	    }
	}()

	fmt.Println("Server starting on port 8080...")
	http.ListenAndServe(":8080", nil)
}