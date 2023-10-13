import React from "react";
import { BsStar, BsTrash } from "react-icons/bs";
import { appPostRequest } from "../handlers/api";
import toast from "react-hot-toast";

const MailList = ({
	mailData,
	selectedMailId,
	handleSelectedMail,
	mailBoxName,
}) => {
	const sortedMailData = mailData
		.slice()
		.sort((a, b) => new Date(b.date) - new Date(a.date));

	const notifyMovedMessageToMailbox = (mailbox) =>
		toast.success(`Moved to ${mailbox}`);
	const moveMailBoxEndpoint = "/api/mail/moveMessage";

	const handleMoveToMailBox = async (
		message,
		fromMailBoxName,
		toMailBoxName
	) => {
		notifyMovedMessageToMailbox(toMailBoxName);

		// TODO: If toMailBoxName is 'TRASH', the deletion should be permament.

		const response = await appPostRequest(moveMailBoxEndpoint, {
			message: message,
			fromMailBoxName: fromMailBoxName,
			toMailBoxName: toMailBoxName,
		});
	};

	return (
		<div className="flex flex-col gap-y-4 w-full h-[50vh] overflow-y-auto">
			<ul role="list" className="divide-y divide-gray-100">
				{sortedMailData.map((mail) => (
					<li
						key={mail.messageId}
						className={`p-5 rounded-xl flex justify-between gap-x-6 py-2 cursor-pointer ${
							selectedMailId === mail.messageId
								? "bg-gray-200"
								: ""
						}`}
						onClick={() => handleSelectedMail(mail)}
					>
						<div className="flex min-w-0 gap-x-4">
							<div className="min-w-0 flex-auto">
								<p className="text-sm font-semibold leading-6 text-gray-900">
									{mail.subject}
								</p>
								<p className="mt-1 truncate text-xs leading-5 text-gray-500">
									{mail.text}
								</p>
							</div>
						</div>
						<div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
							<p className="text-sm leading-6 text-gray-900">
								{new Date(mail.date).toLocaleDateString(
									"hu-HU",
									{
										year: "numeric",
										month: "2-digit",
										day: "2-digit",
										hour: "2-digit",
										minute: "2-digit",
									}
								)}
							</p>
							<div className="flex flex-row gap-x-5">
								<button
									className="rounded-xl hover:text-gray-400"
									onClick={(e) => {
										e.stopPropagation();
										handleMoveToMailBox(
											mail,
											mailBoxName,
											"TRASH"
										);
									}}
								>
									<BsTrash size={20}></BsTrash>
								</button>
								<button
									className="rounded-xl hover:text-gray-400"
									onClick={(e) => {
										e.stopPropagation();
										handleMoveToMailBox(
											mail,
											mailBoxName,
											"STARS"
										);
									}}
								>
									<BsStar size={20}></BsStar>
								</button>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default MailList;
