/* eslint-disable no-unused-vars */
import React from "react";
import ViewContent from "../components/ViewContent";
import {
	ArrowPathIcon,
	CloudArrowUpIcon,
	FingerPrintIcon,
	LockClosedIcon,
	NewspaperIcon,
	PaintBrushIcon,
} from "@heroicons/react/24/outline";

const features = [
	{
		name: "New Features Galore",
		description:
			"Experience the latest in email technology. Our email client boasts a host of new features that will supercharge your email experience. From smart categorization to intuitive integrations, we've got it all.",
		icon: NewspaperIcon,
	},
	{
		name: "Passwordless authentication",
		description:
			"Your accounts deserve the best protection. Our Passwordless Authentication employs cutting-edge security protocols, making it virtually impossible for unauthorized access, even in the face of advanced threats.",
		icon: LockClosedIcon,
	},
	{
		name: "Intuitive design",
		description:
			"We've reimagined the email client interface, making it sleek, intuitive, and user-friendly. Say hello to a clutter-free inbox that's a joy to navigate.",
		icon: PaintBrushIcon,
	},
	{
		name: "Advanced security",
		description:
			"Your privacy is our top priority. Rest easy knowing that your emails are protected with state-of-the-art security measures, ensuring your personal and professional correspondence remains confidential.",
		icon: FingerPrintIcon,
	},
];

const HomeView = () => {
	return (
		<div className="py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col justify-center">
				<div className="mx-auto max-w-2xl lg:text-center flex flex-col justify-center items-center">
					<div className="flex gap-x-3 flex-shrink-0 items-center justify-center">
						<img
							className="h-8 w-8"
							src="https://img.logoipsum.com/247.svg"
							alt="OEMail"
						/>
						<span className="text-white font-bold text-2xl">
							OEMail
						</span>
					</div>
					<h2 className="text-base font-semibold leading-7 text-blue-600">
						Secure email client
					</h2>
					<p className="mt-2 text-3xl font-bold tracking-tight text-gray-300 sm:text-4xl">
						Everything you need to know about to get started!
					</p>
					<p className="mt-6 text-lg leading-8 text-gray-400">
						Elevate your email game with our cutting-edge email
						client, designed to revolutionize the way you
						communicate. Say goodbye to the ordinary and embrace a
						new era of productivity, security, and innovation.
					</p>
				</div>
				<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
					<dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
						{features.map((feature) => (
							<div key={feature.name} className="relative pl-16">
								<dt className="text-base font-semibold leading-7 text-gray-500">
									<div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
										<feature.icon
											className="h-6 w-6 text-white"
											aria-hidden="true"
										/>
									</div>
									{feature.name}
								</dt>
								<dd className="mt-2 text-base leading-7 text-gray-300">
									{feature.description}
								</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</div>
	);
};

export default HomeView;
