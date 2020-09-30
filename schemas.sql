CREATE TABLE top50_2019
(
    " " INT,
    Track_Name VARCHAR,
    Artist_Name VARCHAR,
    Genre VARCHAR,
    Beats_Per_Minute INT,
    Energy INT,
    Dancability INT,
    Loudness__dB INT,
    Liveness INT,
    Valence INT,
    Length INT,
    Acousticness INT,
    Speechiness INT,
    Popularity INT
);

SELECT *
FROM top50_2019


CREATE TABLE global_top50_2019
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
    FROM global_top50_2019
