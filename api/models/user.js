const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: String,
	walletAddress: String,
	privateKey: String,
	publicKey: String,
	email: String,
	password: String,
	verified: Boolean,
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
