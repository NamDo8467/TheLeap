const request = require("supertest")

const { mongoose, server, app } = require("./index")

let randomSuffix = ""
afterEach(async () => {
	server.close()
})
afterAll(() => {
	return mongoose.connection.close()
})
describe("POST /api/register", () => {
	describe("given unique username and password", () => {
		beforeEach(() => {
			randomSuffix = Math.floor(Math.random() * 100) + 1
		})
		test("should return json object with a message of 'User has been created successfully'", async () => {
			const response = await request(app)
				.post("/api/register")
				.send({
					username: `namdo${randomSuffix}@gmail.com`,
					password: "namdo"
				})

			expect(JSON.parse(response.text)).toEqual({ message: "User has been created successfully" })
		})
	})

	describe("given duplicated username", () => {
		test("should return json object with a message of 'Username has been taken'", async () => {
			const response = await request(app).post("/api/register").send({ username: "namdo@gmail.com", password: "namdo" })

			expect(JSON.parse(response.text)).toEqual({ message: "Username has been taken" })
		})
	})

	describe("given incorrect password", () => {
		test("should return json object with a message of 'Password is incorrect'", async () => {
			const response = await request(app).post("/api/login").send({ username: "huynhnamdo", password: "32435435" })

			expect(JSON.parse(response.text)).toEqual({ message: "Password is incorrect" })
		})
	})
})
