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

module.exports = {
	confirmTransactionFromBackend,
	confirmTransactionFromFrontend,
	partialSignWithKeyAndWallet,
};
