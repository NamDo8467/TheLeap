const express = require("express")
const userRoute = express.Router()
const tweetRoute = express.Router()
const { login, register, logout } = require("../controllers/controller")
const { postChat, getChat } = require("../controllers/chatController")
const { createTweet, getAllTweets, getTweetById, deleteTweet, updateTweet } = require("../controllers/tweetController")

/* USER ROUTE */
userRoute.post("/register", register)
userRoute.post("/login", login)
userRoute.post("/logout", logout)

/* CHAT ROUTE */
userRoute.post("/chat/send", postChat)
userRoute.get("/chat/get", getChat)

/* TWEET ROUTE */
tweetRoute.post("/create", createTweet)
tweetRoute.get("/all", getAllTweets)
tweetRoute.get("/_id/:id", getTweetById)
tweetRoute.post("/update/:id", updateTweet)
tweetRoute.post("/delete/:id", deleteTweet)
module.exports = { userRouter: userRoute, tweetRouter: tweetRoute }
