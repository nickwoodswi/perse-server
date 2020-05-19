const path = require('path')
const express = require('express')
const xss = require('xss')
const PerseService = require('./perse-service')

const perseRouter = express.Router()
const jsonParser = express.json()

const serializeAthlete = athlete => ({
  athletes_id: xss(athlete.athletes_id),
  first_name: xss(athlete.first_name),
  last_name: xss(athlete.last_name)
})

const serializeExerciseType = type => ({
    exercise_types_id: xss(type.exercise_types_id),
    exercise_types_name: xss(type.exercise_types_name)
})

const serializeWorkout = workout => ({
  workouts_id: xss(workout.workouts_id),
  workouts_name: xss(workout.workouts_name)
})

const serializeExercise = exercise => ({
    exercises_id: xss(exercise.exercises_id),
    exercise_types_id: xss(exercise.exercise_types_id),
    rep_type: xss(exercise.rep_type),
    reps: xss(exercise.reps),
    resistance: xss(exercise.resistance),
    sub_distance: xss(exercise.sub_distance),
    tempo: xss(exercise.tempo_time),
    subrest: xss(exercise.subrest),
    rest: xss(exercise.rest), 
    set_num: xss(exercise.set_num), 
    set_order: xss(exercise.set_order)
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
    athletes_id: xss(assignment.athletes_id),
    workouts_id: xss(assignment.workouts_id)
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
      const { id, date_assigned, perform_on_date, athletes_id, workouts_id } = req.body
      const newAssignment = { id, date_assigned, perform_on_date, athletes_id, workouts_id }
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
    PerseService.insertJoinEntries(knexInstance, newEntry)
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
    const { athletes_id, first_name, last_name } = req.body
    const newAthlete = { athletes_id, first_name, last_name }

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
    .route('/exercise-types')
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
        const { exercise_types_id, exercise_types_name } = req.body
        const newExerciseType = { exercise_types_id, exercise_types_name }

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
    .get((req, res, next) => {
      const knexInstance = req.app.get('db')
      PerseService.getAllExercises(knexInstance) 
      .then(exercises => {
        console.log(exercises)
        res.json(exercises.map(serializeExercise))
      })
      .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
      const knexInstance = req.app.get('db')
      const { exercises_id, exercise_types_id, rep_type, reps, resistance, sub_distance, tempo, subrest, rest, set_num, set_order } = req.body
      const newExercise = { exercises_id, exercise_types_id, rep_type, reps, resistance, sub_distance, tempo, subrest, rest, set_num, set_order }
    
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
      const { workouts_id, workouts_name } = req.body
      const newWorkout = { workouts_id, workouts_name }

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