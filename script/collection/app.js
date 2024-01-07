const axios = require("axios");
const fs = require("fs");
const { Blob } = require("buffer");

const { confirmTransactionFromBackend } = require("./signer");

const YOUR_WALLET_ADDRESS = "";
const network = "devnet";
const X_API_KEY = "";

var encodedTransaction = "";

async function mintCollectionNFT() {
	const buffer = fs.readFileSync("eco-panel.png");
	const blob = new Blob([buffer]);

	const formdata = new FormData();
	formdata.append("network", network);
	formdata.append("creator_wallet", YOUR_WALLET_ADDRESS);
	formdata.append("name", "EcoPanel Collection");
	formdata.append("symbol", "ECO");
	formdata.append("description", "EcoPanel NFT Collection");
	formdata.append(
		"attributes",
		'[ {    "trait_type": "Location",    "value": "Hanoi, Vietnam"  }]'
	);
	formdata.append("image", blob, "eco-panel.png");
	formdata.append("fee_payer", YOUR_WALLET_ADDRESS);
	const response = await axios
		.post("https://api.shyft.to/sol/v2/nft/create", formdata, {
			headers: {
				"x-api-key": X_API_KEY,
			},
		})
		.then(async (res) => {
			console.log(res.data);
			encodedTransaction = res.data.result.encoded_transaction;
			//encoded transaction received in response
			console.log(encodedTransaction);
			const confirmTransaction = await confirmTransactionFromBackend(
				network,
				encodedTransaction,
				""
			);
			console.log(confirmTransaction);
		})
		.catch((err) => {
			console.warn(err);
		});
}

async function mintCNFT() {
	const response = await axios
		.post(
			"https://api.shyft.to/sol/v1/nft/compressed/mint",
			{
				network,
				creator_wallet: YOUR_WALLET_ADDRESS,
				metadata_uri:
					"https://ipfs.io/ipfs/bafkreibmv2bmejhw3k43nylnoecjgjn5qt3njbe5qyi5f23ijoy6u3jliy",
				merkle_tree: "64fbrQxxRWRNhyqqQvQ4bZZoJTeuebDYjYnwU6knUD5D",
				collection_address:
					"DXZfy26F4mwogaiwbvSFTS4pnm154SuDi5h7ai5WBBXD",
			},
			{
				headers: {
					"x-api-key": X_API_KEY,
				},
			}
		)
		.then(async (res) => {
			console.log(res.data);
			encodedTransaction = res.data.result.encoded_transaction;
			//encoded transaction received in response
			console.log(encodedTransaction);
			const confirmTransaction = await confirmTransactionFromBackend(
				network,
				encodedTransaction,
				""
			);
			console.log(confirmTransaction);
		})
		.catch((err) => {
			console.warn(err);
		});
}

async function createMerkleTree() {
	const response = await axios
		.post(
			"https://api.shyft.to/sol/v1/nft/compressed/create_tree",
			{
				network,
				wallet_address: YOUR_WALLET_ADDRESS,
				max_depth_size_pair: {
					max_depth: 14,
					max_buffer_size: 64,
				},
				canopy_depth: 10,
			},
			{
				headers: {
					"x-api-key": X_API_KEY,
				},
			}
		)
		.then(async (res) => {
			console.log(res.data);
			encodedTransaction = res.data.result.encoded_transaction;
			//encoded transaction received in response
			console.log(encodedTransaction);
			const confirmTransaction = await confirmTransactionFromBackend(
				network,
				encodedTransaction,
				""
			);
			console.log(confirmTransaction);
		})
		.catch((err) => {
			console.warn(err);
		});
}

async function mintCNFTs() {
	for (let i = 0; i < 100; i++) {
		await mintCNFT();
	}
}

mintCNFTs();
