import React, { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import toast from "react-hot-toast";
import { appPostRequest, appPutRequest } from "../handlers/api";
import axios from "axios";
import Modal from "../components/Modal";
import { Dialog, Transition } from "@headlessui/react";
import { MdSecurity } from "react-icons/md";
import QRCode from "react-qr-code";

const ProfileSettingsView = () => {
	const { user } = useContext(UserContext);
	const [firstName, setFirstName] = useState(user ? user.firstName : "");
	const [lastName, setLastName] = useState(user ? user.lastName : "");
	const [testTOTPCode, setTestTOTPCode] = useState();
	const [totpEnabled, setTotpEnabled] = useState(user.totpAuthentication);
	const [recoveryCodes, setRecoveryCodes] = useState([]);
	const [isTOTPActivateModalOpen, setTOTPActivateModalOpen] = useState(false);
	const [isTOTPDeactivateModalOpen, setTOTPDeactivateModalOpen] =
		useState(false);
	const [error, setError] = useState(null);

	const updateUserEndpoint = "/api/users/";
	const recoveryCodesGenerationEndpoint = "/api/users/recoveryGeneration";
	const validateTOTPCodeEndpoint = "/api/users/totpValidation";

	const notifySaved = () => toast.success(`Saved!`);
	const notifyError = (error) => toast.error(error);
	const notifySuccessful = (message) => toast.success(message);

	const handleSubmit = async () => {
		const userData = {
			firstName: firstName,
			lastName: lastName,
			email: user.email,
			totpAuthentication: totpEnabled,
		};
		try {
			const response = await appPutRequest(updateUserEndpoint, {
				user: userData,
			});
			notifySaved();
		} catch (error) {
			notifyError(error);
		}
	};

	const handleValidateTOTPCode = async () => {
		try {
			const response = await appPostRequest(validateTOTPCodeEndpoint, {
				code: testTOTPCode,
			});

			if (response.isValid) {
				notifySuccessful("Valid code!");
			} else {
				notifyError("Invalid code!");
			}
		} catch (error) {
			notifyError(error);
		}
	};

	const handleRecoveryKeyGeneration = async () => {
		try {
			const response = await appPostRequest(
				recoveryCodesGenerationEndpoint,
				{}
			);

			setRecoveryCodes(response.recoveryKeys);
		} catch (error) {
			notifyError(error);
		}
	};

	const handleTestTOTP = () => {
		if (testTOTPCode) {
			handleValidateTOTPCode();
		} else {
			notifyError("Enter code to test it!");
		}
	};

	const handleToggleTotp = async () => {
		if (totpEnabled) {
			setTOTPDeactivateModalOpen(true);
		} else {
			setTOTPActivateModalOpen(true);
			await handleRecoveryKeyGeneration();
		}
	};

	const handleCloseActivateModal = () => {
		setTOTPActivateModalOpen(false);
	};

	const handleConfirmActivateModal = () => {
		setTOTPActivateModalOpen(false);
		setTotpEnabled(true);
	};

	const handleCancelActivateModal = () => {
		setTOTPActivateModalOpen(false);
	};

	const handleCloseDeactivateModal = () => {
		setTOTPDeactivateModalOpen(false);
	};

	const handleConfirmDeactivateModal = () => {
		setTOTPDeactivateModalOpen(false);
		setTotpEnabled(false);
	};

	const handleCancelDeactivateModal = () => {
		setTOTPDeactivateModalOpen(false);
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
						<div className="w-full lg:w-[20em] md:w-[20em]">
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

						<div className="w-full lg:w-[20em] md:w-[20em]">
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

					<div className="flex items-center">
						<input
							id="totp"
							name="totp"
							type="checkbox"
							checked={totpEnabled}
							onChange={handleToggleTotp}
							className="rounded text-blue-600 focus:ring-2 focus:ring-blue-600"
						/>
						<label
							htmlFor="totp"
							className="ml-2 text-sm text-gray-900"
						>
							TOTP Authentication
						</label>

						{isTOTPActivateModalOpen && (
							<Modal
								open={isTOTPActivateModalOpen}
								onClose={handleCloseActivateModal}
								onConfirm={handleConfirmActivateModal}
								onCancel={handleCancelActivateModal}
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
												Activate TOTP authentication
											</Dialog.Title>
											<div className="mt-2 flex flex-col gap-y-3">
												<div className="flex md:flex-row md:gap-x-[3vh] flex-col justify-center gap-y-2">
													<div className="mt-2">
														<p className="text-sm text-gray-500 text-justify">
															Are you sure you
															want to
															<strong>
																{" "}
																activate
															</strong>{" "}
															TOTP authentication?{" "}
															<strong>
																More safer{" "}
															</strong>
															way to log in to
															your account!
														</p>
														<label
															htmlFor="firstName"
															className="block text-sm font-medium leading-6 text-gray-900"
														>
															Test it!
														</label>
														<div className="flex gap-x-2">
															<input
																id="testTOTPCode"
																name="testTOTPCode"
																type="text"
																onChange={(e) =>
																	setTestTOTPCode(
																		e.target
																			.value
																	)
																}
																className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
															/>
															<button
																type="button"
																onClick={
																	handleTestTOTP
																}
																className="flex justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
															>
																Test
															</button>
														</div>
													</div>

													<div
														style={{
															height: "auto",
															maxWidth: 128,
															width: "100%",
														}}
													>
														<QRCode
															size={256}
															style={{
																height: "auto",
																maxWidth:
																	"100%",
																width: "100%",
															}}
															value={
																user.totpSecret
																	.totpIssuerUrl
															}
															viewBox={`0 0 256 256`}
														/>
													</div>
												</div>
												<hr></hr>
												<div>
													<h6>Recovery codes</h6>
													<p className="text-sm text-gray-500">
														Please save it and keep
														it in a very safe place!
													</p>
													<ul className="text-sm text-blue-600 py-2">
														{recoveryCodes.map(
															(item, index) => (
																<li key={index}>
																	{item}
																</li>
															)
														)}
													</ul>
												</div>
											</div>
										</div>
									</div>
								</div>
							</Modal>
						)}

						{isTOTPDeactivateModalOpen && (
							<Modal
								open={isTOTPDeactivateModalOpen}
								onClose={handleCloseDeactivateModal}
								onCancel={handleCancelDeactivateModal}
								onConfirm={handleConfirmDeactivateModal}
							>
								<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
									<div className="sm:flex sm:items-start">
										<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
											<MdSecurity
												className="h-6 w-6 text-red-600"
												aria-hidden="true"
											/>
										</div>
										<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
											<Dialog.Title
												as="h3"
												className="text-base font-semibold leading-6 text-gray-900"
											>
												Deactivate TOTP authentication
											</Dialog.Title>
											<div className="mt-2">
												<p className="text-sm text-gray-500">
													Are you sure you want to
													<strong>
														{" "}
														deactivate
													</strong>{" "}
													TOTP authentication?{" "}
												</p>
											</div>
										</div>
									</div>
								</div>
							</Modal>
						)}
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
