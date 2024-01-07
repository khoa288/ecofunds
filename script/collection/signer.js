const {
	clusterApiUrl,
	Connection,
	Keypair,
	Transaction,
} = require("@solana/web3.js");
const { NodeWallet } = require("@metaplex/js");
const { decode } = require("bs58");
const { Buffer } = require("buffer");

async function confirmTransactionFromBackend(
	network,
	encodedTransaction,
	privateKey
) {
	//function for signing transactions using the private key for one signer
	const connection = new Connection(clusterApiUrl(network), "confirmed");
	const feePayer = Keypair.fromSecretKey(decode(privateKey));
	const wallet = new NodeWallet(feePayer);
	const recoveredTransaction = Transaction.from(
		Buffer.from(encodedTransaction, "base64")
	);
	const signedTx = await wallet.signTransaction(recoveredTransaction);
	const confirmTransaction = await connection.sendRawTransaction(
		signedTx.serialize()
	);
	return confirmTransaction;
}

async function confirmTransactionFromFrontend(
	connection,
	encodedTransaction,
	wallet
) {
	//function for signing transactions using the wallet for one signer
	console.log(encodedTransaction);
	const recoveredTransaction = Transaction.from(
		Buffer.from(encodedTransaction, "base64")
	);
	const signedTx = await wallet.signTransaction(recoveredTransaction);
	const confirmTransaction = await connection.sendRawTransaction(
		signedTx.serialize()
	);
	return confirmTransaction;
}

async function partialSignWithKeyAndWallet(
	connection,
	encodedTransaction,
	privateKey,
	wallet
) {
	//function for partially signing transactions using one private key and a wallet popup
	const feePayer = Keypair.fromSecretKey(decode(privateKey));
	const recoveredTransaction = Transaction.from(
		Buffer.from(encodedTransaction, "base64")
	);
	recoveredTransaction.partialSign(feePayer);
	const signedTx = await wallet.signTransaction(recoveredTransaction);
	const confirmTransaction = await connection.sendRawTransaction(
		signedTx.serialize()
	);
	return confirmTransaction;
}

async function partialSignWithKeysAndWallet(
	connection,
	encodedTransaction,
	privateKeys,
	wallet
) {
	//function for partially signing transactions using n private keys and a wallet popup
	const recoveredTransaction = Transaction.from(
		Buffer.from(encodedTransaction, "base64")
	);
	const keys = privateKeys.map((k) => {
		return Keypair.fromSecretKey(decode(k));
	});

	recoveredTransaction.partialSign(...keys);

	const signedTx = await wallet.signTransaction(recoveredTransaction);
	const confirmTransaction = await connection.sendRawTransaction(
		signedTx.serialize()
	);
	return confirmTransaction;
}

//function for signing a series of encoded_transactions from the frontend in one go
async function confirmTransactionsFromFrontend(
	connection,
	encodedTransactions,
	wallet
) {
	const recoveredTransactions = encodedTransactions.map((tx) => {
		return Transaction.from(Buffer.from(tx, "base64"));
	});

	const signedTx = await wallet.signAllTransactions(recoveredTransactions); //signs all the transactions in the recoveredTransactions array in one go

	var sentTxns = [];
	for await (const tx of signedTx) {
		const confirmTransaction = await connection.sendRawTransaction(
			tx.serialize()
		);
		sentTxns.push(confirmTransaction);
	}

	return sentTxns; //returns an array of confirmedTxns
}

module.exports = {
	confirmTransactionFromBackend,
	confirmTransactionFromFrontend,
	partialSignWithKeyAndWallet,
	partialSignWithKeysAndWallet,
	confirmTransactionsFromFrontend,
};
