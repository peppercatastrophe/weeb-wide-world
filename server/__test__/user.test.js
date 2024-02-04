const request = require('supertest')
const app = require('../app')

let userId

beforeAll()
afterAll()

describe("POST /login", () => {
  test("200 success", (done) => {
    request(app)
      .post("/login")
      .send(userLogin)
      .expect(200)
      .end((err, _res) => {
        if (err) return done(err)
        return done()
      })
  })
  test("400 invalid input", (done) => {
    request(app)
      .post("/login")
      .send(invalidUserLogin)
      .expect(400)
      .end((err, _res) => {
        if (err) return done(err)
        return done()
      })
  })
})

describe("POST /register", () => {
  test("200 success", (done) => {
    request(app)
      .post("/register")
      .send(userRegister)
      .expect(200)
      .end((err, _res) => {
        if (err) return done(err)
        return done()
      })
  })
  test("400 invalid input", (done) => {
    request(app)
      .post("/register")
      .send(invalidUserRegister)
      .expect(400)
      .end((err, _res) => {
        if (err) return done(err)
        return done()
      })
  })
})

describe("GET /user/:id", () => {
  test("200 success", (done) => {
    request(app)
      .get("/user/" + userId)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })
})
