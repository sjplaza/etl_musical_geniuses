CREATE TABLE year2019_data
(
    acousticness INT,
    artists VARCHAR,
    danceability VARCHAR,
    duration_ms INT,
    energy DECIMAL,
    explicit INT,
    id VARCHAR,
    instrument DECIMAL,
    key INT,
    liveness DECIMAL,
    loudness DECIMAL,
    mode INT,
    name INT,
    popularity INT,
    release_date DATE,
    speechiness DECIMAL,
    tempo DECIMAL,
    valence DECIMAL,
    year INT,
);

    SELECT *
    FROM year2019_data;

    CREATE TABLE global_2019
    (
        Country VARCHAR,
        Rank INT,
        Track_id VARCHAR,
        Streams INT,
        Track_Name VARCHAR,
        Artist VARCHAR,
        URL VARCHAR,
        acousticness DECIMAL,
        dancability DECIMAL,
        energy DECIMAL,
        instrumentalness DECIMAL,
        liveness DECIMAL,
        loudness DECIMAL,
        speechiness DECIMAL,
        valence DECIMAL,
        tempo DECIMAL,
        time_signature INT,
        duration_ms DECIMAL,
        key INT,
    mode INT,
    Artist_id VARCHAR,
    Artist_popularity INT,
    Artist_followers INT,
    Artist_img VARCHAR
);

        SELECT *
        FROM global_2019;