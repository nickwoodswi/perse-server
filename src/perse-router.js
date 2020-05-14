const path = require('path')
const express = require('express')
const xss = require('xss')
const PerseService = require('./perse-service')

const perseRouter = express.Router()
const jsonParser = express.json()

const serializeAthlete = athlete => ({
  id: xss(athlete.id),
  first_name: xss(athlete.first_name),
  last_name: xss(athlete.last_name)
})

const serializeExerciseType = type => ({
    id: xss(type.id),
    exercise_name: xss(type.exercise_name)
})

const serializeExercise = exercise => ({
    id: xss(exercise.id),
    exercise_type: xss(exercise.exercise_type),
    rep_type: xss(exercise.rep_type),
    reps: xss(exercise.reps),
    resistance: xss(exercise.weight),
    sub_distance: xss(exercise.sub_distance),
    tempo: xss(exercise.tempo_time),
    subrest: xss(exercise.subrest_time),
    rest: xss(exercise.rest_time), 
    sets: xss(exercise.set_num), 
    order: xss(exercise.order)
})

const serializeWorkout = workout => ({
    id: xss(workout.id),
    workout_name: xss(workout.workout_name)
})

const serializeJoinEntry = entry => ({
    id: xss(entry.id),
    workouts_id: xss(entry.workouts_id),
    exercises_id: xss(entry.exercises_id)
})

const serializeAssignment = assignment => ({
    id: xss(assignment.id),
    date_assigned: xss(assignment.date_assigned),
    perform_on_date: xss(assignment.perform_on_date),
    athlete_id: xss(assignment.athlete_id),
    workout_id: xss(assignment.workout_id)
})

perseRouter
  .route('/assignments')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    PerseService.getAllAssignments(knexInstance)
      .then(assignments => {
        res.json(assignments.map(serializeAssignment))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
      const knexInstance = req.app.get('db')
      const { id, date_assigned, perform_on_date, athlete_id, workout_id } = req.body
      const newAssignment = { id, date_assigned, perform_on_date, athlete_id, workout_id }
      PerseService.insertAssignment(knexInstance, newAssignment)
        .then(assignment => {
            res
                .status(201)
                .location(path.posix.join(req.originalUrl))
                .json(serializeAssignment(assignment))
        })
        .catch(next)
  })

perseRouter
  .route('/join')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    PerseService.getAllJoinEntries(knexInstance)
      .then(entries => {
        res.json(entries.map(serializeJoinEntry))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const knexInstance = req.app.get('db')
    const { id, workouts_id, exercises_id } = req.body
    const newEntry = { id, workouts_id, exercises_id }
    PerseService.insertJoinEntry(knexInstance, newEntry)
      .then(entry => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl))
          .json(serializeJoinEntry(entry))
      })
      .catch(next)
  })

perseRouter
  .route('/athletes')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    PerseService.getAllAthletes(knexInstance)
      .then(athletes => {
        res.json(athletes.map(serializeAthlete))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const knexInstance = req.app.get('db')
    const { id, athlete_name } = req.body
    const newAthlete = { id, athlete_name }

    PerseService.insertAthlete(knexInstance, newAthlete)
        .then(athlete => {
            res
                .status(201)
                .location(path.posix.join(req.originalUrl))
                .json(serializeAthlete(athlete))
        })
        .catch(next)
    })

perseRouter
    .route('/exercise_types')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        PerseService.getAllExerciseTypes(knexInstance)
        .then(types => {
            res.json(types.map(serializeExerciseType))
        })
        .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const knexInstance = req.app.get('db')
        const { id, exercise_name } = req.body
        const newExerciseType = { id, exercise_name }

        PerseService.insertExerciseType(knexInstance, newExerciseType)
            .then(type => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl))
                    .json(serializeExerciseType(type))
            })
            .catch(next)
    })

perseRouter
    .route('/exercises')
    .get((res, res, next) => {
      const knexInstance = req.app.get('db')
      PerseService.getAllExercises(knexInstance) 
      .then(exercises => {
        res.json(exercises.map(serializeExercise))
      })
      .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
      const knexInstance = req.app.get('db')
      const { id, exercise_type, rep_type, reps, resistance, sub_distance, tempo, subrest, res, set_num, order } = req.body
      const newExercise = { id, exercise_type, rep_type, reps, resistance, sub_distance, tempo, subrest, res, set_num, order }
    
      PerseService.insertExercise(knexInstance, newExercise)
        .then(exercise => {
          res
            .status(201)
            .location(path.posix.join(req.originalUrl))
            .json(serializeExercise(exercise))
        })
        .catch(next)
    })

perseRouter
    .route('/workouts')
    .get((req, res, next) => {
      const knexInstance = req.app.get('db')
      PerseService.getAllWorkouts(knexInstance)
      .then(workouts => {
        res.json(workouts.map(serializeWorkout))
      })
      .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
      const knexInstance = req.app.get('db')
      const { id, workout_name } = req.body
      const newWorkout = { id, workout_name }

      PerseService.insertWorkout(knexInstance, newWorkout)
        .then(workout => {
          res
          .status(201)
          .location(path.posix.join(req.originalUrl))
          .json(serializeWorkout(workout))
        })
        .catch(next)
    })

module.exports = perseRouter