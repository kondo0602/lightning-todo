import clsx from "clsx";
import type { ComponentProps } from "react";
import "./todo-note-textarea.css";

type TodoNoteTextareaProps = ComponentProps<"textarea">;

export const TodoNoteTextarea = ({
	className,
	...props
}: TodoNoteTextareaProps) => {
	return (
		<textarea
			className={clsx("todo-note-textarea", className)}
			placeholder="Add a note..."
			rows={1}
			{...props}
		/>
	);
};
