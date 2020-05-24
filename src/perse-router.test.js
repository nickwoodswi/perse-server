const knex = require("knex")

const app = require('./app')
//get, getbyid, post, patch

const testAssignment = [
    { 
        id: 0, 
        date_assigned: new Date(), 
        perform_on_date: new Date(), 
        athletes_id: 0, 
        workouts_id: 0 
    }
]

const testEntry = [
    { 
        id: 0, 
        workouts_id: 0, 
        exercises_id: 0 
    }
]

const testAthlete = [
    { 
        athletes_id: 0, 
        first_name: 'test', 
        last_name: 'test'
    }
]

const testExerciseType = [
    { 
        exercise_types_id: 0, 
        exercise_types_name: 'test' 
    }
]

const testExercise = [
    { 
        exercises_id: 0, 
        exercise_types_id: 0, 
        rep_type: 'TO FAILURE', 
        reps: 0, 
        resistance: 0, 
        sub_distance: 0, 
        tempo: 0, 
        subrest: 0, 
        rest: 0, 
        set_num: 1, 
        set_order: 0 
    }
]

const testWorkout = [
    { 
        workouts_id: 0, 
        workouts_name: 'test'
    }
]

describe('perse-router', () => {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db('assignments').truncate())

    context('Given there are assignments in the database', () => {
        beforeEach('insert rows', () => {
            return db
                .into('assignments')
                .insert(testHolds)
        })
        it('GET /assignments responds with a list of all holds in database', () => {
            return supertest(app)
                .get('/assignments')
                .expect(200, testAssignment)
        })
    })
})

describe('perse-router', () => {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db('athletes').truncate())

    context('Given there are athletes in the database', () => {
        beforeEach('insert rows', () => {
            return db
                .into('athletes')
                .insert(testAthlete)
        })
        it('GET /athletes responds with a list of all holds in database', () => {
            return supertest(app)
                .get('/athletes')
                .expect(200, testAthlete)
        })
    })
})

describe('perse-router', () => {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db('exercise_types').truncate())

    context('Given there are exercise types in the database', () => {
        beforeEach('insert rows', () => {
            return db
                .into('exercise_types')
                .insert(testExerciseType)
        })
        it('GET /exercise-types responds with a list of all holds in database', () => {
            return supertest(app)
                .get('/exercise-types')
                .expect(200, testExerciseType)
        })
    })
})

describe('perse-router', () => {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db('exercises').truncate())

    context('Given there are exercises in the database', () => {
        beforeEach('insert rows', () => {
            return db
                .into('exercises')
                .insert(testExercise)
        })
        it('GET /exercises responds with a list of all exercises in database', () => {
            return supertest(app)
                .get('/exercises')
                .expect(200, testExercise)
        })
    })
})

describe('perse-router', () => {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db('wkt_ex_join').truncate())

    context('Given there are entries in the database', () => {
        beforeEach('insert rows', () => {
            return db
                .into('wkt_ex_join')
                .insert(testEntry)
        })
        it('GET /join responds with a list of all holds in database', () => {
            return supertest(app)
                .get('/join')
                .expect(200, testEntry)
        })
    })
})

describe('perse-router', () => {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db('workouts').truncate())

    context('Given there are workouts in the database', () => {
        beforeEach('insert rows', () => {
            return db
                .into('workouts')
                .insert(testWorkout)
        })
        it('GET /workouts responds with a list of all workouts in database', () => {
            return supertest(app)
                .get('/workouts')
                .expect(200, testWorkout)
        })
    })
})