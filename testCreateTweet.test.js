const request = require("supertest")
const { mongoose, server, app } = require("./index")

afterEach(async () => {
	server.close()
})
afterAll(() => {
	return mongoose.connection.close()
})

describe("POST /api/tweet/send", () => {
	describe("given correct username and content", () => {
		test("should return a json object with a message of 'Tweet created' and the Tweet id", async () => {
			const response = await request(app).post("/api/tweet/create").send({
				user: "huynhnamdo",
				content: "This tweet is for testing"
			})

			expect(JSON.parse(response.text).message).toEqual("Tweet created")
		})
	})

	describe("given empty content", () => {
		test("should return a json object with a message of 'Path 'content' is required'", async () => {
			const response = await request(app).post("/api/tweet/create").send({
				user: "huynhnamdo",
				content: ""
			})

			expect(JSON.parse(response.text)).toEqual({ message: "Path `content` is required." })
		})
	})

	describe("given empty user", () => {
		test("should return a json object with a message of 'Path 'user' is required'", async () => {
			const response = await request(app).post("/api/tweet/create").send({
				user: "",
				content: ""
			})

			expect(JSON.parse(response.text)).toEqual({ message: "Path `user` is required." })
		})
	})
})
