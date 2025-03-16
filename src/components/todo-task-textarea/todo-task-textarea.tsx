import clsx from "clsx";
import { ComponentProps } from "react";
import "./todo-task-textarea.css";

type TodoTaskTextareaProps = ComponentProps<"textarea">;

export const TodoTaskTextarea = ({
	className,
	...props
}: TodoTaskTextareaProps) => {
	return (
		<textarea
			className={clsx("todo-task-textarea", className)}
			placeholder="Add a task..."
			required
			rows={1}
			{...props}
		/>
	);
};
