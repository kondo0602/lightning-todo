import clsx from "clsx";
import { type ComponentProps, forwardRef } from "react";
import "./todo-textarea.css";

type TodoTextareaProps = ComponentProps<"textarea">;

export const TodoTextarea = forwardRef<HTMLTextAreaElement, TodoTextareaProps>(
	({ className, ...props }, ref) => {
		return (
			<textarea
				ref={ref}
				className={clsx("todo-textarea", className)}
				placeholder="Add a task..."
				required
				rows={1}
				spellCheck={false}
				{...props}
			/>
		);
	},
);
