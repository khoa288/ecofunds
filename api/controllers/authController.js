const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const axios = require("axios");

router.post("/register", async (req, res) => {
	const { email, password } = req.body;

	// Check if email already exists, if yes, check the password
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);
		if (isPasswordCorrect) {
			return res.status(200).json({
				success: true,
				message: "User logged in successfully",
				result: {
					email: existingUser.email,
					walletAddress: existingUser.walletAddress,
					publicKey: existingUser.publicKey,
				},
			});
		}
		return res.status(400).json({ error: "User already exists" });
	}

	// Create semi custodial wallet
	try {
		const response = await axios.post(
			"https://api.shyft.to/sol/v1/wallet/create_semi_wallet",
			{ password },
			{
				headers: {
					accept: "application/json",
					"x-api-key": process.env.SHYFT_API_KEY,
					"Content-Type": "application/json",
				},
			}
		);

		const walletAddress = response.data.result.wallet_address;

		// Get keypair of the wallet
		const keyPairResponse = await axios.get(
			`https://api.shyft.to/sol/v1/wallet/get_keypair?wallet=${walletAddress}&password=${encodeURIComponent(
				password
			)}`,
			{
				headers: {
					accept: "application/json",
					"x-api-key": process.env.SHYFT_API_KEY,
				},
			}
		);

		const publicKey = keyPairResponse.data.result.publicKey;
		const privateKey = keyPairResponse.data.result.secretKey;

		// Hash the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create a new user with the received data
		const newUser = new User({
			email,
			password: hashedPassword,
			walletAddress,
			publicKey,
			privateKey,
			verified: false,
		});

		// Save the user to the database
		await newUser.save();

		res.status(201).json({
			success: true,
			message: "User registered successfully",
			result: {
				email: newUser.email,
				walletAddress: newUser.walletAddress,
				publicKey: newUser.publicKey,
			},
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({
			error: "Error creating wallet and registering user",
		});
	}
});

module.exports = router;
