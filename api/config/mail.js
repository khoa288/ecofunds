module.exports.transporterConfig = {
	service: "gmail",
	auth: {
		user: process.env.EMAIL_ADDRESS,
		pass: process.env.EMAIL_PASSWORD,
	},
};
