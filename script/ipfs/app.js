import fetch from "node-fetch";
import fs from "fs";
import FormData from "form-data"; // Import form-data

async function run() {
	const formData = new FormData();
	formData.append("file", fs.createReadStream("metadata.json"));

	const resp = await fetch(`https://api.tatum.io/v3/ipfs`, {
		method: "POST",
		headers: {
			...formData.getHeaders(),
			"x-api-key": "",
		},
		body: formData,
	});

	const data = await resp.text();
	console.log(data);
}

run();
