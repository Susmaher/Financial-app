package middleware

import (
	"backendAPI/db"
	"context"
	"net/http"
)

type contextKey string

const UserIdKey contextKey = "userId"

func RequireAuth(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        cookie, err := r.Cookie("session_token")
        if err != nil {
            http.Error(w, "Unauthorized", http.StatusUnauthorized)
            return
        }

        userId, err := db.GetUserIdFromSession(cookie.Value)
        if err != nil {
            http.Error(w, "Unauthorized", http.StatusUnauthorized)
            return
        }

        ctx := context.WithValue(r.Context(), UserIdKey, userId)
        next.ServeHTTP(w, r.WithContext(ctx))
    }
}