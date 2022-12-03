/* TEST UPDATE TWEET */
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
describe("POST /api/tweet/update/:id", () => {
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
			const response = await request(app).post(`/api/tweet/update/${TESTING_TWEET_ID}`)

			expect(JSON.parse(response.text)).toEqual({ message: "Log in required" })
		})
	})

	describe("User is logged in after checking session but the content of he/she provides is empty", () => {
		test("should return a json object with a message of 'Path `content` is required'", async () => {
			const response = await request(mockApp).post(`/api/tweet/update/${TESTING_TWEET_ID}`).send({
				content: ""
			})
			expect(JSON.parse(response.text)).toEqual({ message: "Content can not be empty" })
		})
	})

	describe("User is logged in after checking session and the content is not provided empty", () => {
		test("should return a json object with a message 'Updated successfully'", async () => {
			const response = await request(mockApp).post(`/api/tweet/update/${TESTING_TWEET_ID}`).send({
				content: "I am doing unit testing"
			})

			expect(JSON.parse(response.text)).toEqual({ message: "Updated successfully" })
		})
	})
})
