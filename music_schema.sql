CREATE TABLE music_data
(
    acousticness DECIMAL,
    artists VARCHAR,
    danceability DECIMAL,
    duration_ms INT,
    energy DECIMAL,
    explicit INT,
    id VARCHAR,
    instrumentalness DECIMAL,
    key INT,
    liveness DECIMAL,
    loudness DECIMAL,
    mode INT,
    name TEXT,
    popularity INT,
    release_date VARCHAR,
    speechiness DECIMAL,
    tempo DECIMAL,
    valence DECIMAL,
    year INT);

select * from music_data;