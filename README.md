## PERSE - Workout Assigner & Builder

![PERSE Screen Shot](https://github.com/nickwoodswi/perse/blob/master/src/images/ScreenShot.png)

PERSE is a simple workout assignment and editor app for coaches, personal trainers, and athletes. Select workouts from those already in the database, and assign them to an existing athlete (or create a new athlete) on a single date or over a date range, with options to select recurrance every day, every other day, every third day, or every week.

Create new exercises from scratch by naming a new exercise type and setting intensity by rep type, weight, distance, rest, and tempo, or select from existing exercise types already in the system. Then, either add them to an existing workout, or build a new workout from scratch before assigning. 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It also makes use of Express, PostgreSQL, and Node.js. It was deployed to Vercel, and Heroku.

## DEMO: https://perse.now.sh/

## API Summary

PERSE uses a simple RESTful API architecture supporting GET and POST operations, with a data structure according to the following endpoints:

  /assignments
    {
      id,
      date_assigned,
      perform_on_date,
      athletes_id,
      workouts_id
    }

  /athletes
    {
      athletes_id,
      first_name,
      last_name
    }

  /exercise-types
    {
      exercise_types_id,
      exercise_types_name
    }

  /exercises
    {
      exercises_id,
      exercise_types_id,
      rep_type,
      reps,
      resistance,
      sub_distance,
      tempo,
      subrest,
      rest,
      set_name,
      set_order
    }

  /assignments
    {
      id,
      date_assigned,
      perform_on_date,
      athletes_id,
      workouts_id
    }

  /join
    {
      id,
      workouts_id,
      exercises_id
    }

