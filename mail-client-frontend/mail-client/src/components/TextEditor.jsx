import React, { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const TextEditor = (props) => {
	const theme = "snow";
	const modules = {
		toolbar: [
			["bold", "italic", "underline", "strike"],
			["blockquote", "code-block"],
			[{ align: [] }],
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			[{ list: "ordered" }, { list: "bullet" }],
			[{ script: "sub" }, { script: "super" }],
			[{ indent: "-1" }, { indent: "+1" }],
			["clean"],
		],
		clipboard: {
			matchVisual: false,
		},
	};
	const placeholder = "Módosítás...";
	const formats = [
		"bold",
		"italic",
		"underline",
		"strike",
		"blockquote",
		"code-block",
		"align",
		"header",
		"list",
		"script",
		"indent",
		"direction",
		"color",
		"clean",
	];

	const { quill, quillRef, Quill } = useQuill({
		theme,
		modules,
		formats,
		placeholder,
	});

	useEffect(() => {
		if (quill) {
			// Register components to quill
			var block = Quill.import("blots/block");
			block.tagName = "div";
			Quill.register(block);
			var DirectionAttribute = Quill.import(
				"attributors/attribute/direction"
			);
			Quill.register(DirectionAttribute, true);
			var AlignClass = Quill.import("attributors/class/align");
			Quill.register(AlignClass, true);
			var BackgroundClass = Quill.import("attributors/class/background");
			Quill.register(BackgroundClass, true);
			var ColorClass = Quill.import("attributors/class/color");
			Quill.register(ColorClass, true);
			var DirectionClass = Quill.import("attributors/class/direction");
			Quill.register(DirectionClass, true);
			var FontClass = Quill.import("attributors/class/font");
			Quill.register(FontClass, true);
			var SizeClass = Quill.import("attributors/class/size");
			Quill.register(SizeClass, true);
			var AlignStyle = Quill.import("attributors/style/align");
			Quill.register(AlignStyle, true);
			var BackgroundStyle = Quill.import("attributors/style/background");
			Quill.register(BackgroundStyle, true);
			var ColorStyle = Quill.import("attributors/style/color");
			Quill.register(ColorStyle, true);
			var DirectionStyle = Quill.import("attributors/style/direction");
			Quill.register(DirectionStyle, true);
			var FontStyle = Quill.import("attributors/style/font");
			Quill.register(FontStyle, true);
			var SizeStyle = Quill.import("attributors/style/size");
			Quill.register(SizeStyle, true);

			quill.getModule("toolbar").addHandler("color", (value) => {
				if (value == "custom-color") {
					value = prompt("Hex/RGB/RGBA");
				}

				quill.format("color", value);
			});

			quill.clipboard.dangerouslyPasteHTML("<h1>asd</h1>"); // Set content from db
			quill.history.clear(); // Needed because of CTRL-Z (undo)

			const qlContainer = document.querySelector(".ql-container");
			if (qlContainer) {
				qlContainer.style.height = "20vh";
			}
		}
	}, [quill]);

	return (
		<div>
			<div>
				<div ref={quillRef} />
			</div>
		</div>
	);
};

export default TextEditor;
