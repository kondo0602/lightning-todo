import clsx from "clsx";
import { type ComponentProps, forwardRef } from "react";
import "./todo-task-textarea.css";

type TodoTaskTextareaProps = ComponentProps<"textarea">;

export const TodoTaskTextarea = forwardRef<
	HTMLTextAreaElement,
	TodoTaskTextareaProps
>(({ className, ...props }, ref) => {
	return (
		<textarea
			ref={ref}
			className={clsx("todo-task-textarea", className)}
			placeholder="Add a task..."
			required
			rows={1}
			{...props}
		/>
	);
});
