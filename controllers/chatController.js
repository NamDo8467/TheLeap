const { User } = require("../models/User")
const { Chat } = require("../models/Chat")
const checkSession = (req, res) => {
	let username = req.session.userid
	return true && username
}

const errorHandler = (type, error) => {
	if (type === "postChat") {
		if (error._message === "Chat validation failed") {
			return { message: error.errors.from?.message || error.errors.to?.message || error.errors.message?.message }
		} else {
			return { message: `${error}` }
		}
	} else if (type === "getChat") {
		return { message: `${error}` }
	}
}
const postChatController = async (req, res) => {
	const { from, to, message } = req.body

	try {
		const senderIsFound = await User.findOne({ username: from })
		const receiverIsFound = await User.findOne({ username: to })
		if (senderIsFound && receiverIsFound) {
			const chat = await Chat.create({ from, to, message })
			res.status(201).json({ message: "Message sent" })
		} else {
			throw (new Error().message = "User not found")
		}
	} catch (error) {
		let message = errorHandler("postChat", error)
		res.status(400).send(message)
	}
}

const getChatController = async (req, res) => {
	const username = checkSession(req, res)
	if (username) {
		const { withUser } = req.query
		try {
			const withUserFound = await User.findOne({ username: withUser })
			if (withUserFound) {
				const chats = await Chat.find({
					$or: [
						{ from: username, to: withUser },
						{ from: withUser, to: username }
					]
				})

				res.status(200).send({ chats })
			} else {
				throw (new Error().message = "Users not found")
			}
		} catch (error) {
			let message = errorHandler("getChat", error)

			res.status(400).send(message)
		}
	} else {
		res.status(400).send({ message: "Login is required" })
	}
}

module.exports = {
	postChat: postChatController,
	getChat: getChatController
}
