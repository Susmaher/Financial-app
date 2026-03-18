package db

func CreateTransaction(userID int, name string, transactionCategory string, date string, amount float64, recurring bool) error {
	_, err := DB.Exec(
		`INSERT INTO transactions ("userId", name, transactionCategory, date, amount, recurring) VALUES ($1, $2, $3, $4, $5, $6)`,
		userID, name, transactionCategory, date, amount, recurring,
	)
	return err
}

func GetTransaction(userID int) (int, string, string, error) {
	var id int
	var name, avatar string
	err := DB.QueryRow(
		`SELECT id, name, avatar FROM profiles WHERE "userId" = $1`,
		userID,
	).Scan(&id, &name, &avatar)
	return id, name, avatar, err
}