

router.post("/transfer", async (req, res) => {
	const { from_address, amount } = req.body;

	try {
		// Set up request data
		const requestData = {
			network: "devnet",
			from_address,
			to_address: process.env.YOUR_WALLET_ADDRESS,
			token_address: "0x570A5D26f7765Ecb712C0924E4De545B89fD43dF",
			amount,
			fee_payer: process.env.YOUR_WALLET_ADDRESS,
		};

		// Send request to Shyft API
		const response = await axios.post(
			"https://api.shyft.to/sol/v1/token/transfer_detach",
			requestData,
			{
				headers: {
					accept: "application/json",
					"x-api-key": process.env.SHYFT_API_KEY,
					"Content-Type": "application/json",
				},
			}
		);

		// Handle successful response
		if (response.data.success) {
			const { encoded_transaction, signers } = response.data.result;

			// TODO: Sign the transaction and send it to the blockchain

			res.status(200).json({
				success: true,
				message: "Token transfer request generated successfully",
				result: {
					encoded_transaction,
					signers,
				},
			});
		} else {
			res.status(400).json({
				error: "Error generating token transfer request",
			});
		}
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ error: "Error transferring tokens" });
	}
});
