const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const tweetSchema = mongoose.Schema({
	user: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true,
		default: Date.now()
	}
})
const TweetModel = mongoose.model("Tweet", tweetSchema, "tweets")

module.exports.Tweet = TweetModel
