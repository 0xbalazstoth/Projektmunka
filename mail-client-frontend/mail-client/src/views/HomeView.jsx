import React from "react";
import TypedAnimation from "../components/TypedAnimation";
import FadeInWrapper from "../components/FadeInWrapper";

const HomeView = () => {
	const animationStrings = [
		"robust security.",
		"confidence in email.",
		"complete control.",
		"privacy assurance.",
	];

	return (
		<FadeInWrapper>
			<div className="flex flex-col justify-center items-center min-h-[30vh]">
				<div className="flex flex-col items-center mt-1 ml-1 text-[20px] font-bold text-navy-700 dark:text-white">
					<img
						src="https://img.logoipsum.com/280.svg"
						className="w-16"
					></img>
					<span>OEMail.</span>
				</div>
				<div className="flex flex-row gap-x-1 text-4xl">
					<h1>Welcome, </h1>
					<h1 className="font-bold">username!</h1>
				</div>
				<div>
					<TypedAnimation
						strings={animationStrings}
						startText={"We offer"}
					></TypedAnimation>
				</div>
			</div>
		</FadeInWrapper>
	);
};

export default HomeView;
