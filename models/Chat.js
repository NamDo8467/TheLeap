const mongoose = require("mongoose")
const chatSchema = mongoose.Schema({
	from: {
		type: String,
		required: true
	},
	to: {
		type: String,
		required: true
	},
	message: {
		type: String,
		required: true
	},
	time: {
		type: Date,
		default: Date.now()
	}
})

const ChatModel = mongoose.model("Chat", chatSchema, "chats")

module.exports.Chat = ChatModel
