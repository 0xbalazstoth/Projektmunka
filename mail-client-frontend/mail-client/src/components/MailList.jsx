import React from "react";

const MailList = ({ mailData, selectedMailId, handleSelectedMail }) => {
	return (
		<div className="flex flex-col gap-y-4 w-full h-[50vh] overflow-y-auto">
			<ul role="list" className="divide-y divide-gray-100">
				{mailData.map((mail) => (
					<li
						key={mail.id}
						className={`p-5 rounded-xl flex justify-between gap-x-6 py-2 cursor-pointer ${
							selectedMailId === mail.id ? "bg-gray-200" : ""
						}`}
						onClick={() => handleSelectedMail(mail)}
					>
						<div className="flex min-w-0 gap-x-4">
							<img
								className="h-12 w-12 flex-none rounded-full bg-gray-50"
								src={mail.imageUrl}
								alt=""
							/>
							<div className="min-w-0 flex-auto">
								<p className="text-sm font-semibold leading-6 text-gray-900">
									{mail.title}
								</p>
								<p className="mt-1 truncate text-xs leading-5 text-gray-500">
									{mail.subject}
								</p>
							</div>
						</div>
						<div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
							<p className="text-sm leading-6 text-gray-900">
								{mail.date}
							</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default MailList;
