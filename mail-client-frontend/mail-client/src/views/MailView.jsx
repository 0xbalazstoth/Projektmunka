/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const MailView = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<div className="grid grid-cols-2 grid-rows-1 gap-4">
			<div>4</div>
			<div>5</div>
		</div>
	);
};

export default MailView;
