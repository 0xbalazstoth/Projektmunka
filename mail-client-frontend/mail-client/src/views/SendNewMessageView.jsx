import React, { useContext, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import TextEditor from "../components/TextEditor";
import { appPostRequest } from "../handlers/api";
import UserContext from "../contexts/UserContext";

const SendNewMessageView = () => {
	const [toInput, setToInput] = useState("");
	const [toAddresses, setToAddresses] = useState([]);
	const [subject, setSubject] = useState("");
	const [content, setContent] = useState("");
	const [attachments, setAttachments] = useState([]);
	const [toError, setToError] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const { user } = useContext(UserContext);

	const sendEmailEndpoint = "/api/users/sendEmail";

	const handleToInputChange = (e) => {
		const inputValue = e.target.value;
		setToInput(inputValue);

		// Email validation regex pattern
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

		if (inputValue.trim() !== "") {
			if (!emailRegex.test(inputValue)) {
				setToError("Invalid email address");
			} else if (toAddresses.includes(inputValue.trim())) {
				setToError("Duplicate email address");
			} else {
				setToError("");
			}
		} else {
			setToError("");
		}
	};

	const handleToInputBlur = () => {
		// Check for duplicate email address
		if (toInput.trim() !== "" && !toAddresses.includes(toInput.trim())) {
			// Add the email address to the list
			setToAddresses([...toAddresses, toInput.trim()]);

			// Clear the input
			setToInput("");
		} else if (toAddresses.includes(toInput.trim())) {
			// Show duplicate error message
			setToError("Duplicate email address");
		}
	};

	const handleToInputKeyDown = (e) => {
		if (e.key === " " && toInput.trim() !== "") {
			// Prevent space from being added to the field
			e.preventDefault();

			// Check for duplicate email address
			if (!toAddresses.includes(toInput.trim())) {
				// Add the email address to the list
				setToAddresses([...toAddresses, toInput.trim()]);

				// Clear the input
				setToInput("");
			} else {
				// Show duplicate error message
				setToError("Duplicate email address");
			}
		}
	};

	const handleRemoveToAddress = (index) => {
		const updatedAddresses = [...toAddresses];
		updatedAddresses.splice(index, 1);
		setToAddresses(updatedAddresses);
	};

	const handleSubjectChange = (e) => {
		setSubject(e.target.value);
	};

	const handleContentChange = (e) => {
		setContent(e.target.value);
	};

	const handleAttachmentChange = (e) => {
		const files = Array.from(e.target.files);
		setAttachments([...attachments, ...files]);
	};

	const handleRemoveAttachment = (index) => {
		const updatedAttachments = [...attachments];
		updatedAttachments.splice(index, 1);
		setAttachments(updatedAttachments);
	};

	const handleSend = async () => {
		// Implement your send message logic here.
		const text = document.querySelector(".ql-editor").innerHTML;

		try {
			const response = await appPostRequest(sendEmailEndpoint, {
				from: user.email,
				receivers: toAddresses.join(","),
				subject: subject,
				content: text,
			});

			// Clear input fields
			setToAddresses([]);
			setSubject("");
			setContent("");
			setAttachments([]);
			setErrorMessage("");

			document.querySelector(".ql-editor").innerHTML = "";
		} catch (error) {
			console.error("An error occurred:", error);
			setErrorMessage("Failed to send message.");
		}
	};

	return (
		<div className="min-h-[50vh] w-full bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-y-6">
			<div>
				<label htmlFor="to" className="block text-gray-700">
					To:
				</label>
				<div className="w-full  border-none outline-none bg-gray-200 shadow-sm rounded-2xl text-sm p-2 flex flex-wrap">
					{toAddresses.map((address, index) => (
						<div
							key={index}
							className="bg-gray-300 rounded-xl px-2 py-1 m-1 flex items-center"
						>
							{address}
							<button
								className="ml-2 text-navy-700"
								onClick={() => handleRemoveToAddress(index)}
							>
								<span className="text-[12px]">&#x2715;</span>
							</button>
						</div>
					))}
					<input
						type="text"
						id="to"
						className={`w-full border-none outline-none bg-[transparent] ${
							toError ? "border-red-400" : ""
						}`}
						value={toInput}
						onChange={handleToInputChange}
						onKeyDown={handleToInputKeyDown}
						onBlur={handleToInputBlur}
						placeholder="E-mail address"
					/>
				</div>
				{toError && <p className="text-red-400 mt-2">{toError}</p>}
			</div>

			<div>
				<label htmlFor="subject" className="block text-gray-700">
					Subject:
				</label>
				<input
					type="text"
					id="subject"
					className="w-full p-2 border-none outline-none bg-gray-200 shadow-sm rounded-2xl text-sm"
					value={subject}
					onChange={handleSubjectChange}
					placeholder="Subject"
				/>
			</div>

			<TextEditor></TextEditor>

			<div>
				<div className="flex items-center gap-x-6 mb-2">
					<label
						htmlFor="file-upload"
						className="cursor-pointer bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-2xl shadow-sm flex items-center"
					>
						<GrAttachment className="mr-2" color="white" />
						Attach File(s)
					</label>
					<input
						type="file"
						id="file-upload"
						className="hidden"
						multiple
						onChange={handleAttachmentChange}
					/>
					<button
						className="bg-blue-500 text-white p-2 rounded-2xl shadow-sm hover:bg-blue-600"
						onClick={handleSend}
					>
						Send
					</button>
				</div>
				{attachments.length >= 1 ? (
					<div className="mt-2 h-[7vh] overflow-y-auto">
						{attachments.map((file, index) => (
							<div
								key={index}
								className="flex items-center gap-x-3 mb-2"
							>
								<div className="flex items-center">
									<span className="text-gray-700">
										{file.name}
									</span>
									<span className="text-sm text-gray-500 ml-2">
										({(file.size / 1024).toFixed(2)} KB)
									</span>
								</div>
								<button
									className="text-red-600 hover:text-red-800"
									onClick={() =>
										handleRemoveAttachment(index)
									}
								>
									&#x2715;
								</button>
							</div>
						))}
					</div>
				) : (
					<></>
				)}

				{errorMessage && (
					<div className="text-red-400 mt-2">{errorMessage}</div>
				)}
			</div>
		</div>
	);
};

export default SendNewMessageView;
