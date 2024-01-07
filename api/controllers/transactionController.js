const router = require("express").Router();
const axios = require("axios");
const { confirmTransactionFromBackend } = require("../utilities/shyft");
const { signAndConfirmTransactionFe } = require("../utilities/phantomWallet");

router.post("/transfer", async (req, res) => {
	const { from_address, amount } = req.body;
	const amountFloat = parseFloat(amount);

    async function handleTransfer() {
    const response = await fetch('/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            from_address, // Set from_address value
            amount, // Set amount value
        }),
    });

    if (response.ok) {
        const data = await response.json();
        
        if (data.success) {
            const { network, transaction } = data.result;

            // Call signAndConfirmTransactionFe with retrieved parameters and a callback function
            await signAndConfirmTransactionFe(network, transaction, (signatureResult) => {
                console.log('Signature result:', signatureResult);
                
                if (signatureResult.err) {
                    console.error('Error confirming transaction:', signatureResult.err);
                } else {
                    console.log('Transaction confirmed successfully');
                }
            });
            
        } else {
            console.error('Error generating token transfer request');
        }
    } else {
        console.error('Error transferring tokens');
    }
}

	try {
		// Set up request data
		const requestData = {
			network: "devnet",
			from_address: from_address,
			to_address: process.env.SOL_WALLET_ADDRESS,
			token_address: "So11111111111111111111111111111111111111112",
			amount: amountFloat,
			fee_payer: process.env.SOL_WALLET_ADDRESS,
		};

		// Send request to Shyft API
		let response;

		try {
			response = await axios.post(
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

			console.log("Shyft API response:", response.data);
		} catch (err) {
			console.error("Error in Shyft API request:", err);
			throw err;
		}

		// Handle successful response
		if (response.data.success) {
			const { encoded_transaction, signers } = response.data.result;

			// Confirm transaction from backend
			const confirmTransaction = await confirmTransactionFromBackend(
				"devnet",
				encoded_transaction,
				process.env.SOL_PRIVATE_KEY
			).catch((err) => {
				console.error(err);
			});

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

module.exports = router;
