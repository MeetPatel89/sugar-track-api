CREATE TABLE IF NOT EXISTS glucose_logs (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    glucose INTEGER NOT NULL,
    user_id INTEGER
        REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    date_time TIMESTAMPTZ 
)