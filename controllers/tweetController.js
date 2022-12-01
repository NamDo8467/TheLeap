const { Tweet } = require("../models/Tweet")
const mongoose = require("mongoose")
const checkSession = (req, res) => {
	let session = req.session.userid
	return true && session
}

const errorHandler = (type, error) => {
	if (type === "createTweet") {
		if (error._message === "Tweet validation failed") {
			return { message: error.errors.user?.message || error.errors.content?.message }
		} else {
			return { message: `${error}` }
		}
	} else if (type === "getAllTweet") {
		return { message: `${error}` }
	} else if (type === "getTweetById") {
		if (error.name === "CastError") {
			return { message: `Tweet not found` }
		}
		return { message: `${error}` }
	} else if (type === "updateTweet") {
		if (error.name === "CastError") {
			return { message: `Tweet not found` }
		}
		return { message: `${error}` }
	} else if (type === "deleteTweet") {
		return { message: `Tweet not found` }
	}
}
const createTweetController = async (req, res) => {
	try {
		const { user, content } = req.body
		const tweet = await Tweet.create({ user, content })
		res.status(201).json({ message: "Tweet created", id: tweet._id })
	} catch (error) {
		let message = errorHandler("createTweet", error)
		res.status(400).send(message)
	}
}
const getAllTweetsController = async (req, res) => {
	let username = checkSession(req, res)
	if (username) {
		try {
			let tweets = await Tweet.find({ user: username })
			res.status(200).send({ tweets })
		} catch (error) {
			let message = errorHandler("getAllTweet", error)
			res.status(400).send(message)
		}
	} else {
		res.status(400).send({ message: "Log in is required" })
	}
}
const getTweetByIdController = async (req, res) => {
	const tweetId = req.params.id

	let username = checkSession(req, res)
	if (username && tweetId) {
		try {
			const tweet = await Tweet.findById(tweetId)
			if (tweet) {
				res.status(200).send({ tweet })
			} else {
				throw (new Error().message = "Tweet not found")
			}
		} catch (error) {
			let message = errorHandler("getTweetById", error)
			res.status(400).send(message)
		}
	} else {
		res.status(400).send({ message: "Log in required" })
	}
}
const updateTweetController = async (req, res) => {
	const tweetId = req.params.id
	const { content } = req.body
	let username = checkSession(req, res)
	if (username) {
		try {
			if (content && tweetId) {
				const tweet = await Tweet.findByIdAndUpdate(tweetId, { content, date: Date.now() })
				if (tweet) {
					res.status(200).send({ message: "Updated successfully" })
				} else {
					throw (new Error().message = "Tweet not found")
				}
			} else {
				throw (new Error().message = "Content can not be empty")
			}
		} catch (error) {
			let message = errorHandler("updateTweet", error)
			res.status(400).send(message)
		}
	} else {
		res.status(400).send({ message: "Log in required" })
	}
}
const deleteTweetController = async (req, res) => {
	const tweetId = req.params.id
	// const { content } = req.body
	let username = checkSession(req, res)
	if (username) {
		try {
			const tweet = await Tweet.findByIdAndDelete(tweetId)
			if (tweet) {
				res.status(200).send({ message: "Deleted successfully" })
			} else {
				throw (new Error().message = "Tweet not found")
			}
		} catch (error) {
			let message = errorHandler("deleteTweet", error)
			res.status(400).send(message)
		}
	} else {
		res.status(400).send({ message: "Log in required" })
	}
}

module.exports = {
	createTweet: createTweetController,
	getAllTweets: getAllTweetsController,
	getTweetById: getTweetByIdController,
	updateTweet: updateTweetController,
	deleteTweet: deleteTweetController
}
