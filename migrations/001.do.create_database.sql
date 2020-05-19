/* /athletes */
CREATE TABLE athletes (
    athletes_id VARCHAR NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL
);

/* /exercise-types */
CREATE TABLE exercise_types (
    exercise_types_id VARCHAR NOT NULL,
    exercise_types_name VARCHAR NOT NULL
);

/* /workouts */
CREATE TABLE workouts (
    workouts_id VARCHAR NOT NULL,
    workouts_name VARCHAR NOT NULL
);

CREATE TYPE rep_types AS ENUM (
    'TO FAILURE',
    'SET MULTIPLE',
    'SINGLE DISTANCE (m)',
    'TIME (minutes)'
);

/* /exercises */
CREATE TABLE exercises (
    exercises_id VARCHAR NOT NULL,
    exercise_types_id VARCHAR NOT NULL, /*references table exercise_types - generates name*/
    rep_type rep_types, /*enum from rep_types*/
    reps VARCHAR,
    resistance VARCHAR,
    sub_distance VARCHAR,
    tempo VARCHAR,
    subrest VARCHAR,
    rest VARCHAR, /*generates amount of rest after the set*/
    set_num VARCHAR, /*number of times the set is performed*/
    set_order VARCHAR NOT NULL /*place this exercise appears in the set*/
);

CREATE TABLE wkt_ex_join (
    /*stores relationships between exercise and workout*/
    id VARCHAR NOT NULL,
    workouts_id VARCHAR NOT NULL, /* references workouts */
    exercises_id VARCHAR NOT NULL /* references exercises */
    /*when a workout is selected on front end, map this table, and return all exercises that match the workout id*/
);

/* /assignments */
CREATE TABLE assignments (
    id VARCHAR NOT NULL,
    date_assigned DATE NOT NULL, /*date on which coach assigned the workout*/
    perform_on_date DATE NOT NULL, /*date on which the athlete is to perform the workout*/
    athletes_id VARCHAR NOT NULL, /*references table 'athletes' - generates name*/
    workouts_id VARCHAR NOT NULL /*references table 'workouts' - generates workout name, exercises*/
)