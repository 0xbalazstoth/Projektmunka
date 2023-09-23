import React, { useEffect, useState } from "react";

const FadeInWrapper = ({ children }) => {
	const [fadeIn, setFadeIn] = useState(false);

	useEffect(() => {
		// Set fadeIn to true after a short delay to trigger the fade-in effect
		setTimeout(() => {
			setFadeIn(true);
		}, 50);
	}, []);

	const containerStyle = {
		transition: "opacity 0.5s ease-in-out", // Adjust the duration and easing as needed
		opacity: fadeIn ? 1 : 0,
	};

	return <div style={containerStyle}>{children}</div>;
};

export default FadeInWrapper;
