/* TEST DELETE TWEET */
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
const TESTING_TWEET_ID = "638a8d5a20a837a95201957b"
describe("POST /api/tweet/delete/:id", () => {
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
		test("should return json object with a message of 'Log in required'", async () => {
			const response = await request(app).post(`/api/tweet/delete/${TESTING_TWEET_ID}`)

			expect(JSON.parse(response.text)).toEqual({ message: "Log in required" })
		})
	})

	describe("User is logged in after checking session but the id is not found", () => {
		test("should return a json object with a message of 'Tweet not found'", async () => {
			const response = await request(mockApp).post(`/api/tweet/delete/324786kjsdghfds`)
			expect(JSON.parse(response.text)).toEqual({ message: "Tweet not found" })
		})
	})

	describe("User is logged in after checking session and the id is correct", () => {
		test("should return a json object with a message 'Deleted successfully'", async () => {
			const response = await request(mockApp).post(`/api/tweet/delete/${TESTING_TWEET_ID}`)

			expect(JSON.parse(response.text)).toEqual({ message: "Deleted successfully" })
		})
	})
})
