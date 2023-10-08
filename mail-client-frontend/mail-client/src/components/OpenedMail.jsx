import React from "react";
import parse from "html-react-parser";
import InboxSVG from "../assets/inbox.svg";
import { GrFormPrevious } from "react-icons/gr";
import { BsSend } from "react-icons/bs";

const OpenedMail = ({ handleGoBackMail, selectedMailId, mailData }) => {
	return (
		<div className="w-full bg-white rounded-2xl shadow-sm">
			<div className="p-4 h-full">
				{selectedMailId !== null ? (
					<div>
						<div className="flex flex-row justify-between">
							<div
								className="rounded-lg bg-gray-50 w-[fit-content] p-1 cursor-pointer hover:bg-gray-200 transition delay-25"
								onClick={handleGoBackMail}
							>
								<GrFormPrevious size={20}></GrFormPrevious>
							</div>
							<div className="flex items-center flex-row gap-x-2">
								<BsSend size={15}></BsSend>
								<span>{mailData[0].date}</span>
							</div>
						</div>
						<div className="h-[1vh] border-b-2 border-b-gray-50"></div>
						{mailData.map((mail) =>
							mail.messageId === selectedMailId ? (
								<div key={mail.messageId}>
									<h1 className="font-bold text-2xl">
										{mail.subject}
									</h1>
									<p>{mail.subject}</p>
									<div className="h-[35vh] overflow-y-auto">
										{parse(mail.html)}
									</div>
								</div>
							) : null
						)}
					</div>
				) : (
					<div className="h-full flex flex-col justify-center items-center text-center">
						<h1 className="font-bold text-2xl">Inbox</h1>
						<p>Find your messages here.</p>
						<img className="h-48 py-5" src={InboxSVG}></img>
					</div>
				)}
			</div>
		</div>
	);
};

export default OpenedMail;
