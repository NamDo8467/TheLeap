const request = require("supertest")

const { mongoose, server, app } = require("./index")

afterEach(async () => {
	server.close()
})
afterAll(() => {
	return mongoose.connection.close()
})
describe("POST /api/login", () => {
	describe("given correct username and password", () => {
		test("should return json object with a message of 'Logged in'", async () => {
			const response = await request(app).post("/api/login").send({
				username: "huynhnamdo",
				password: "namdo"
			})

			expect(JSON.parse(response.text)).toEqual({ message: "Logged in" })
		})
	})

	describe("given incorrect username", () => {
		test("should return json object with a message of 'Username not found'", async () => {
			const response = await request(app).post("/api/login").send({ username: "", password: "namdo" })

			expect(JSON.parse(response.text)).toEqual({ message: "Username not found" })
		})
	})

	describe("given incorrect password", () => {
		test("should return json object with a message of 'Password is incorrect'", async () => {
			const response = await request(app).post("/api/login").send({ username: "huynhnamdo", password: "32435435" })

			expect(JSON.parse(response.text)).toEqual({ message: "Password is incorrect" })
		})
	})
})
