package db

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)


var DB *sql.DB

func Connect() {
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    required := []string{"DB_HOST", "DB_PORT", "DB_USER", "DB_PASSWORD", "DB_NAME"}
    for _, key := range required {
        if os.Getenv(key) == "" {
            log.Fatalf("Required environment variable %s is not set", key)
        }
    }

    connStr := fmt.Sprintf(
        "host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
        os.Getenv("DB_HOST"),
        os.Getenv("DB_PORT"),
        os.Getenv("DB_USER"),
        os.Getenv("DB_PASSWORD"),
        os.Getenv("DB_NAME"),
    )

    var dbErr error
    DB, dbErr = sql.Open("postgres", connStr)
    if dbErr != nil {
        log.Fatal("Failed to open database:", dbErr)
    }

    dbErr = DB.Ping()
    if dbErr != nil {
        log.Fatal("Failed to connect to database:", dbErr)
    }

    fmt.Println("Connected to database!")
}