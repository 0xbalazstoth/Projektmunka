import React, { useEffect } from "react";
import Typed from "../typed";

const TypedAnimation = ({ startText, strings }) => {
	useEffect(() => {
		const options = {
			strings,
			typeSpeed: 50,
			backSpeed: 25,
			loop: true,
		};

		const typed = new Typed("#typed-animation", options);

		return () => {
			typed.destroy(); // Clean up the Typed.js instance when the component unmounts.
		};
	}, [strings]);

	return (
		<div className="flex flex-row gap-x-1 text-center">
			<span className="text-xl ">{startText}</span>
			<span id="typed-animation" className="text-xl font-bold"></span>
		</div>
	);
};

export default TypedAnimation;
