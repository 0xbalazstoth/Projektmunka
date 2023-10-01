// apiHandler.js
import axios from "axios";

const baseURL = "http://127.0.0.1:3000"; // Replace with your API base URL

const api = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
		Origin: "http://0.0.0.0:3000",
		// You can add more default headers here
	},
});

// Interceptors for handling requests and responses
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("tkn");

		if (token) {
			config.headers["api-key"] = token;
		}

		return config;
	},
	(error) => {
		// Handle request errors
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	(response) => {
		// You can modify the response data here
		return response.data;
	},
	(error) => {
		// Handle response errors
		return Promise.reject(error);
	}
);

export const appPostRequest = async (url, payload) => {
	try {
		const response = await api.post(url, payload);
		return response;
	} catch (error) {
		throw new Error(error.message);
	}
};

export const appRegularFetchCall = async (url) => {
	try {
		const response = await api.get(url);
		return response;
	} catch (error) {
		throw new Error("Something went wrong!");
	}
};

export const appFetchCall = async (url) => {
	try {
		const response = await api.get(url);
		return response;
	} catch (error) {
		throw new Error("Something went wrong!");
	}
};

export const appUpdateCall = async (url, body) => {
	try {
		const response = await api.patch(url, body);
		return response;
	} catch (error) {
		throw new Error(error.message);
	}
};

export const appDeleteCall = async (url) => {
	try {
		const response = await api.delete(url);
		return response;
	} catch (error) {
		throw new Error("Something went wrong!");
	}
};
