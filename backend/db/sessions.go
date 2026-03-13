package db

import (
	"crypto/rand"
	"encoding/hex"
)

func CreateSession(userId int) (string, error) {
	bytes := make([]byte, 32)
	_, err := rand.Read(bytes)
	if err != nil {
		return "", err
	}

	token := hex.EncodeToString(bytes)

	_, err = DB.Exec(
		`INSERT INTO sessions (token, userId, expiresAt) VALUES ($1, $2, NOW() + INTERVAL '24 hours')`,
		token, userId,
	)
	if err != nil {
		return "", err
	}

	return token, nil
}

func GetUserIdFromSession(token string) (int, error) {
	var userId int
	err := DB.QueryRow(
		`SELECT "userid" FROM sessions WHERE token = $1 AND expiresAt > NOW()`,
		token,
	).Scan(&userId)
	return userId, err
}

func DeleteExpiredSessions() {
	DB.Exec("DELETE FROM sessions WHERE expires_at < NOW()")
}