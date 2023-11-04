import React, { useContext, useState } from "react";
import { appPostRequest } from "../handlers/api";
import UserContext from "../contexts/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import { Dialog, Transition } from "@headlessui/react";
import { MdSecurity } from "react-icons/md";
import { IoMdInformationCircle } from "react-icons/io";

const LoginView = () => {
	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const [error, setError] = useState(null);
	const { setUser } = useContext(UserContext);
	const [totpCode, setTotpCode] = useState();
	const [isTOTPValidationModalOpen, setTOTPValidationModalOpen] =
		useState(false);
	const [loginResponse, setLoginResponse] = useState();
	const [isTOTPValidated, setTOTPValidated] = useState(false);

	const loginEndpoint = "/api/users/login";
	const validateTOTPCodeEndpoint = "/api/users/totpValidation";

	const notifyError = (error) => toast.error(error);
	const notifySuccessful = (message) => toast.success(message);

	const navigate = useNavigate();

	const handleCloseTOTPModal = () => {
		setTOTPValidationModalOpen(false);
	};

	const handleConfirmTOTPModal = () => {
		handleNavigation();
		setTOTPValidationModalOpen(false);
	};

	const handleCancelTOTPModal = () => {
		setTOTPValidationModalOpen(false);
	};

	const handleSubmit = async () => {
		try {
			const response = await appPostRequest(loginEndpoint, {
				email: email,
				password: pwd,
			});
			setLoginResponse(response);

			if (response.totpAuthentication === true) {
				setTOTPValidationModalOpen(true);
			} else {
				const token = response.apiKeys[0].token;
				localStorage.setItem("tkn", token);
				setUser(response.data);
				navigate("/mail");
			}
		} catch (error) {
			console.error("Login failed", error.message);
			setError("Invalid email or password. Please try again."); // Set error message
		}
	};

	const handleValidateTOTPCode = async () => {
		if (totpCode) {
			try {
				const response = await appPostRequest(
					validateTOTPCodeEndpoint,
					{
						totpSecret: loginResponse.totpSecret.base32Secret,
						code: totpCode,
					}
				);

				if (response.isValid) {
					notifySuccessful("Valid code!");
					setTOTPValidated(true);
				} else {
					notifyError("Invalid code!");
					setTOTPValidated(false);
				}
			} catch (error) {
				notifyError(error);
				setTOTPValidated(false);
			}
		} else {
			notifyError("Enter a code to validate it!");
			setTOTPValidated(false);
		}
	};

	const handleNavigation = () => {
		const token = loginResponse.apiKeys[0].token;
		localStorage.setItem("tkn", token);
		setUser(loginResponse.data);
		navigate("/mail");
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
							setError(null);
							handleSubmit();
						}}
					>
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

						{isTOTPValidationModalOpen && (
							<Modal
								open={isTOTPValidationModalOpen}
								onClose={handleCloseTOTPModal}
								onConfirm={handleConfirmTOTPModal}
								onCancel={handleCancelTOTPModal}
								isConfirmDisabled={
									isTOTPValidated ? false : true
								}
							>
								<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
									<div className="sm:flex sm:items-start">
										<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
											<MdSecurity
												className="h-6 w-6 text-blue-600"
												aria-hidden="true"
											/>
										</div>
										<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
											<Dialog.Title
												as="h3"
												className="text-base font-semibold leading-6 text-gray-900"
											>
												Enter TOTP Code
											</Dialog.Title>
											<div className="mt-2 flex flex-col gap-y-3">
												<div className="flex flex-col justify-center gap-y-2">
													<div className="mt-2">
														<p className="text-sm text-gray-500 text-justify">
															Enter code to log in
															safely!
														</p>
														<div className="flex gap-x-2">
															<input
																id="TOTPCode"
																name="TOTPCode"
																type="text"
																onChange={(e) =>
																	setTotpCode(
																		e.target
																			.value
																	)
																}
																className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
															/>
															<button
																type="button"
																onClick={
																	handleValidateTOTPCode
																}
																className="flex justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
															>
																Validate
															</button>
														</div>
													</div>
												</div>
												{/* <hr></hr>
												<div>
													<h6>Recovery codes</h6>
													<p className="text-sm text-gray-500">
														Please save it and keep
														it in a very safe place!
													</p>
													<div className="flex flex-row items-center gap-x-3 justify-center">
														<ul className="text-sm text-blue-600 py-2">
															{recoveryCodes.map(
																(
																	item,
																	index
																) => (
																	<li
																		key={
																			index
																		}
																	>
																		{item}
																	</li>
																)
															)}
														</ul>
														<button
															type="button"
															onClick={
																handleRecoveryCodesCopy
															}
															className="mt-3 inline-flex h-full w-30 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0"
														>
															Copy
														</button>
													</div>
												</div> */}
											</div>
										</div>
									</div>
								</div>
							</Modal>
						)}

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
						Not a member?{" "}
						<a
							href="/create"
							className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
						>
							Create new account!
						</a>
					</p>
				</div>
			</div>
		</>
	);
};

export default LoginView;
