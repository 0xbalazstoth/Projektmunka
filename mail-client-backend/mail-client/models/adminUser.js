const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ApiKeySchema } = require("./apiKey");

const AdminUserSchema = Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		apiKeys: { type: [ApiKeySchema], default: [] },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("AdminUser", AdminUserSchema);
