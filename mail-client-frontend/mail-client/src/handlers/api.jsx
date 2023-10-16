// apiHandler.js
import axios from "axios";

const baseURL = `http://${import.meta.env.VITE_API}:3000`;

const api = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
		Origin: "http://0.0.0.0:3000",
	},
});

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
