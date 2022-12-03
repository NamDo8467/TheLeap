const request = require("supertest")
const express = require("express")
const session = require("express-session")
const { mongoose, server, app } = require("./index")

afterEach(async () => {
	server.close()
})
afterAll(() => {
	return mongoose.connection.close()
})

const mockApp = express()

/* TEST GETTING ALL TWEETS OF A USER */
describe("GET /api/tweet/all", () => {
	beforeEach(() => {
		const TIME = 1000 * 60 * 60
		mockApp.use(
			session({
				secret: "iamnamdo1234567",
				saveUninitialized: true,
				cookie: { maxAge: TIME, sameSite: "strict", secure: false },
				resave: false
			})
		)
		mockApp.all("*", function (req, res, next) {
			req.session.userid = "huynhnamdo"
			next()
		})
		mockApp.use(app)
	})
	describe("User is not logged in after checking session", () => {
		test("should return json object with a message of 'Log in is required'", async () => {
			const response = await request(app).get("/api/tweet/all")

			expect(JSON.parse(response.text)).toEqual({ message: "Log in is required" })
		})
	})

	describe("User is logged in after checking session", () => {
		test("should return a json object with an array of tweets of that user", async () => {
			const response = await request(mockApp).get("/api/tweet/all")

			expect(JSON.parse(response.text).tweets).toBeInstanceOf(Array)
		})
	})
})
