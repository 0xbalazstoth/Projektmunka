import React, { useContext, useState } from "react";
import { appPostRequest } from "../handlers/api";
import UserContext from "../contexts/UserContext.jsx";
import { useNavigate } from "react-router-dom";

const CreateAccountView = () => {
	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	const [error, setError] = useState(null);
	const createAccountEndpoint = "/api/users/";

	const navigate = useNavigate();

	const handleSubmit = async () => {
		try {
			const response = await appPostRequest(createAccountEndpoint, {
				user: {
					email: email,
					password: pwd,
					firstName: firstName,
					lastName: lastName,
				},
			});

			navigate("/login");
		} catch (error) {
			console.error("Account creation failed", error.message);
			setError("Invalid email or password. Please try again."); // Set error message
		}
	};

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="flex flex-col items-center mt-1 ml-1 h-2.5 text-[20px] font-bold text-navy-700 dark:text-white">
					<img
						src="https://img.logoipsum.com/280.svg"
						className="w-16"
						alt="Logo"
					/>
					<span>OEMail.</span>
				</div>

				<div className="mt-20 sm:mx-auto sm:w-full sm:max-w-sm">
					<form
						className="space-y-6"
						onSubmit={(e) => {
							e.preventDefault();
							setError(null); // Clear previous errors
							handleSubmit();
						}}
					>
						<div>
							<label
								htmlFor="firstName"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								First Name
							</label>
							<div className="mt-2">
								<input
									id="firstName"
									name="firstName"
									type="text"
									autoComplete="given-name"
									onChange={(e) =>
										setFirstName(e.target.value)
									}
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="lastName"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Last Name
							</label>
							<div className="mt-2">
								<input
									id="lastName"
									name="lastName"
									type="text"
									autoComplete="family-name"
									onChange={(e) =>
										setLastName(e.target.value)
									}
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Email address
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									onChange={(e) => setEmail(e.target.value)}
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Password
								</label>
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									onChange={(e) => setPwd(e.target.value)}
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
							>
								Sign in
							</button>
						</div>
					</form>

					{/* Display error message */}
					{error && (
						<p className="mt-4 text-red-600 text-sm text-center">
							{error}
						</p>
					)}

					<p className="mt-10 text-center text-sm text-gray-500">
						Already a member?{" "}
						<a
							href="/login"
							className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
						>
							Login to your account!
						</a>
					</p>
				</div>
			</div>
		</>
	);
};

export default CreateAccountView;
