CREATE TABLE dates (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    date TIMESTAMPTZ DEFAULT now() NOT NULL
)