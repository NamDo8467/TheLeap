const express = require("express")
const app = express()
const session = require("express-session")
const { userRouter, tweetRouter, chatRouter } = require("./routes/routes")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const TIME = 1000 * 60 * 60
const PORT = process.env.PORT || 5500
app.use(cookieParser())
app.use(
	session({
		secret: "iamnamdo1234567",
		saveUninitialized: true,
		cookie: { maxAge: TIME, sameSite: "strict", secure: false },
		resave: false
	})
)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("/api", userRouter)
app.use("/api/chat", chatRouter)
app.use("/api/tweet", tweetRouter)
app.get("/", (req, res) => {
	let session = req.session.userid
	// console.log(req)
	// console.log(session)
	session ? res.status(200).send("Hello my friend, you are logged in") : res.status(400).send("You need to log in")
})

const URI = "mongodb+srv://namdo:namdo@cluster0.qftfl.mongodb.net/leap?retryWrites=true&w=majority"

mongoose.connect(URI, { useNewUrlParser: true.valueOf(), useUnifiedTopology: true }, err => {
	if (err) {
		console.log(err)
	} else {
		console.log("Database connected")
	}
})
// mongoose.connection.close(force, callback)
const server = app.listen(PORT, () => {
	console.log(`Go to http://localhost:${PORT}`)
})

module.exports = { mongoose, server, app, URI }
