CREATE TABLE meals_logs (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    meals TEXT NOT NULL,
    time TIMESTAMPTZ DEFAULT now() NOT NULL,
    user_id INTEGER
        REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    date_id INTEGER
        REFERENCES dates(id) ON DELETE CASCADE NOT NULL
)