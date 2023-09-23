import React, { useState, useEffect } from "react";
import { BsTrash, BsStar, BsBack, BsBackspace } from "react-icons/bs";
import MailList from "../components/MailList";
import OpenedMail from "../components/OpenedMail";

const InboxView = () => {
	const mailData = [
		{
			title: "Title",
			subject: "Subject",
			content:
				"Content1 <b>BOLD</b> asd as das as dasd <br>asdasd asd ad<br>asdasd asd asd <br>asdasdas <br><br><br>asdasd asd as d<br><br><br>asdasd asd as d<br><br><br>asdasd asd as d<br><br><br>asdasd asd as d<br><br><br>asdasd asd as d",
			date: "2023.09.23",
			imageUrl: "https://img.logoipsum.com/280.svg",
			id: 1,
		},
		{
			title: "Title2",
			subject: "Subject2",
			content: "asd2 <p>ddd</p>",
			date: "2023.09.23",
			imageUrl: "https://img.logoipsum.com/280.svg",
			id: 2,
		},
		{
			title: "Title3",
			subject: "Subject3",
			content: "simple text",
			date: "2023.09.23",
			imageUrl: "https://img.logoipsum.com/280.svg",
			id: 3,
		},
		{
			title: "Title3",
			subject: "Subject3",
			content: "simple text",
			date: "2023.09.23",
			imageUrl: "https://img.logoipsum.com/280.svg",
			id: 4,
		},
		{
			title: "Title3",
			subject: "Subject3",
			content: "simple text",
			date: "2023.09.23",
			imageUrl: "https://img.logoipsum.com/280.svg",
			id: 5,
		},
		{
			title: "Title3",
			subject: "Subject3",
			content: "simple text",
			date: "2023.09.23",
			imageUrl: "https://img.logoipsum.com/280.svg",
			id: 6,
		},
		{
			title: "Title3",
			subject: "Subject3",
			content: "simple text",
			date: "2023.09.23",
			imageUrl: "https://img.logoipsum.com/280.svg",
			id: 7,
		},
		{
			title: "Title3",
			subject: "Subject3",
			content: "simple text",
			date: "2023.09.23",
			imageUrl: "https://img.logoipsum.com/280.svg",
			id: 8,
		},
		{
			title: "Title3",
			subject: "Subject3",
			content: "simple text",
			date: "2023.09.23",
			imageUrl: "https://img.logoipsum.com/280.svg",
			id: 9,
		},
	];

	const [selectedMailId, setSelectedMailId] = useState(null);
	const [openMailView, setOpenMailView] = useState(
		false || selectedMailId === null
	);

	const handleSelectedMail = (email, openMailView) => {
		setSelectedMailId(email.id);

		setOpenMailView(openMailView);
	};

	const handleGoBackMail = () => {
		setOpenMailView(true);
	};

	return (
		<>
			{/* Desktop */}
			<div className="hidden lg:flex gap-x-6 min-h-[50vh]">
				<MailList
					mailData={mailData}
					handleSelectedMail={handleSelectedMail}
					selectedMailId={selectedMailId}
				></MailList>
				<OpenedMail
					selectedMailId={selectedMailId}
					handleGoBackMail={handleGoBackMail}
					mailData={mailData}
				></OpenedMail>
			</div>

			{/* Rest */}
			<div className="lg:hidden flex h-full">
				{openMailView ? (
					<MailList
						mailData={mailData}
						handleSelectedMail={handleSelectedMail}
						selectedMailId={selectedMailId}
					></MailList>
				) : (
					<OpenedMail
						selectedMailId={selectedMailId}
						handleGoBackMail={handleGoBackMail}
						mailData={mailData}
					></OpenedMail>
				)}
			</div>
		</>
	);
};

export default InboxView;
