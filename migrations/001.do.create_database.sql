/* /athletes */
CREATE TABLE athletes (
    id VARCHAR NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL
);

/* /exercise-types */
CREATE TABLE exercise_types (
    id VARCHAR NOT NULL,
    exercise_name VARCHAR NOT NULL
);

/* /workouts */
CREATE TABLE workouts (
    id VARCHAR NOT NULL,
    workout_name VARCHAR NOT NULL
);

CREATE TYPE rep_types AS ENUM (
    'TO FAILURE',
    'SET MULTIPLE',
    'SINGLE DISTANCE (m)',
    'TIME (minutes)'
);

/* /exercises */
CREATE TABLE exercises (
    id VARCHAR NOT NULL,
    exercise_type_id INTEGER NOT NULL, /*references table exercise_types - generates name*/
    rep_type rep_types, /*enum from rep_types*/
    reps INTEGER,
    resistance INTEGER,
    sub_distance INTEGER,
    tempo INTEGER,
    subrest INTEGER,
    rest INTEGER, /*generates amount of rest after the set*/
    set_num INTEGER, /*number of times the set is performed*/
    wkt_order INTEGER NOT NULL /*place this exercise appears in the set*/
);

CREATE TABLE wkt_ex_join (
    /*stores relationships between exercise and workout*/
    id VARCHAR NOT NULL,
    workouts_id INTEGER NOT NULL, /* references workouts */
    exercises_id INTEGER NOT NULL /* references exercises */
    /*when a workout is selected on front end, map this table, and return all exercises that match the workout id*/
);

/* /assignments */
CREATE TABLE assignments (
    id VARCHAR NOT NULL,
    date_assigned DATE NOT NULL, /*date on which coach assigned the workout*/
    perform_on_date DATE NOT NULL, /*date on which the athlete is to perform the workout*/
    athlete_id INTEGER NOT NULL, /*references table 'athletes' - generates name*/
    workouts_id INTEGER NOT NULL /*references table 'workouts' - generates workout name, exercises*/
)