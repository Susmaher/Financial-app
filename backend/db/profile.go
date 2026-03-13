package db

func CreateProfile(userID int, name string, avatar string) error {
	_, err := DB.Exec(
		`INSERT INTO profiles ("userId", name, avatar) VALUES ($1, $2, $3)`,
		userID, name, avatar,
	)
	return err
}

func GetProfile(userID int) (int, string, string, error) {
	var id int
	var name, avatar string
	err := DB.QueryRow(
		`SELECT id, name, avatar FROM profiles WHERE "userId" = $1`,
		userID,
	).Scan(&id, &name, &avatar)
	return id, name, avatar, err
}