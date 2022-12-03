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

describe("POST /api/chat/send", () => {
	describe("given sender, receiver and the message to be sent", () => {
		test("should return json object with a message of 'Message sent'", async () => {
			const response = await request(app).post("/api/chat/send").send({
				from: "huynhnamdo",
				to: "namdo98@gmail.com",
				message: "Testing /api/chat/send for correct sending"
			})

			expect(JSON.parse(response.text)).toEqual({ message: "Message sent" })
		})
	})

	describe("message to be sent is empty", () => {
		test("should return error of a json object with a message of 'Path 'message' is required'", async () => {
			const response = await request(app).post("/api/chat/send").send({
				from: "huynhnamdo",
				to: "namdo98@gmail.com",
				message: ""
			})
			expect(JSON.parse(response.text)).toEqual({ message: "Path `message` is required." })
		})
	})

	describe("receiver is empty", () => {
		test("should return error of a json object with a message of 'User not found'", async () => {
			const response = await request(app).post("/api/chat/send").send({
				from: "huynhnamdo",
				to: "",
				message: "Testing /api/chat/send without receiver"
			})
			expect(JSON.parse(response.text)).toEqual({ message: "User not found" })
		})
	})

	describe("sender is a random name", () => {
		test("should return error of a json object with a message of 'User not found'", async () => {
			const response = await request(app).post("/api/chat/send").send({
				from: "sadfdsafsdaf",
				to: "",
				message: "Testing /api/chat/send with random sender that is not in the system"
			})
			expect(JSON.parse(response.text)).toEqual({ message: "User not found" })
		})
	})
})

const mockApp = express()

describe("GET /api/chat/get", () => {
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
		test("should return json object with a message of 'Login is required'", async () => {
			const response = await request(app).get("/api/chat/get").query({ withUser: "namdo98@gmail.com" })

			expect(JSON.parse(response.text)).toEqual({ message: "Login is required" })
		})
	})

	describe("User is logged in after checking session", () => {
		test("should return a json object with an array of messages", async () => {
			const response = await request(mockApp).get("/api/chat/get").query({ withUser: "namdo98@gmail.com" })

			expect(JSON.parse(response.text).chats).toBeInstanceOf(Array)
		})
	})

	describe("Get all the chats with a user whom this logged in user has never texted to", () => {
		test("should return a json object with an emty array", async () => {
			const response = await request(mockApp).get("/api/chat/get").query({ withUser: "namdo80@gmail.com" })
			expect(JSON.parse(response.text).chats).toBeInstanceOf(Array) &&
				expect(JSON.parse(response.text).chats).toHaveLength(0)
		})
	})

	describe("Get all the chats with a not-in-the-system user", () => {
		test("should return a json object with an emty array", async () => {
			const response = await request(mockApp).get("/api/chat/get").query({ withUser: "namdosdafsdafa@gmail.com" })

			expect(JSON.parse(response.text)).toEqual({ message: "Users not found" })
		})
	})
})
