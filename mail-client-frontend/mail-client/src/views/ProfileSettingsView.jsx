import React, { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import toast from "react-hot-toast";

const ProfileSettingsView = () => {
	const { user } = useContext(UserContext);
	const [firstName, setFirstName] = useState(user ? user.firstName : "");
	const [lastName, setLastName] = useState(user ? user.lastName : "");
	const [pwd, setPwd] = useState("");
	const [totpEnabled, setTotpEnabled] = useState(false); // New state for TOTP Authentication
	const [error, setError] = useState(null);

	const notifySaved = () => toast.success(`Saved!`);

	const handleSubmit = async () => {
		notifySaved();
	};

	return (
		<div className="flex flex-col gap-y-3 lg:w-3/5">
			<div>
				<h1 className="bg-gray-200 p-2 rounded-xl text-xl w-[fit-content]">
					Account details
				</h1>
				<form
					className="space-y-6"
					onSubmit={(e) => {
						e.preventDefault();
						setError(null);
						handleSubmit();
					}}
				>
					<div className="flex space-x-4">
						<div className="w-full">
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
									value={firstName}
									onChange={(e) =>
										setFirstName(e.target.value)
									}
									className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="w-full">
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
									value={lastName}
									onChange={(e) =>
										setLastName(e.target.value)
									}
									className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Change password
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
								className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div className="flex items-center">
						<input
							id="totp"
							name="totp"
							type="checkbox"
							checked={totpEnabled}
							onChange={() => setTotpEnabled(!totpEnabled)}
							className="rounded text-blue-600 focus:ring-2 focus:ring-blue-600"
						/>
						<label
							htmlFor="totp"
							className="ml-2 text-sm text-gray-900"
						>
							TOTP Authentication
						</label>
					</div>

					<div>
						<button
							type="submit"
							className="flex w-[200px] justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
						>
							Save
						</button>
					</div>
				</form>
			</div>
			<hr></hr>
			<div className="flex flex-col gap-y-2">
				<h1 className="bg-gray-200 p-2 rounded-xl text-xl w-[fit-content]">
					Account deletion
				</h1>
				<p>
					<strong>Remember</strong>, if you delete your account, all
					your <strong>messages</strong>, <strong>settings</strong>{" "}
					will be <strong>permamently</strong> deleted!
				</p>
				<button
					type="button"
					onClick={() => {}}
					className="flex w-[200px] justify-center rounded-md bg-red-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
				>
					Delete account
				</button>
			</div>
		</div>
	);
};

export default ProfileSettingsView;
