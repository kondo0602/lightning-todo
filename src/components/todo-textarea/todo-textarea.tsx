import clsx from "clsx";
import { type ComponentProps, forwardRef } from "react";
import "./todo-textarea.css";

type TodoTextareaProps = ComponentProps<"textarea">;

export const TodoTextarea = forwardRef<HTMLTextAreaElement, TodoTextareaProps>(
	({ className, ...props }, ref) => {
		const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
			// 日本語変換中にEnterキーを押下された場合は予期しない動作が発生するため、日本語変換中は何もしない
			if (e.nativeEvent.isComposing) {
				return;
			}

			if (!e.shiftKey && e.key === "Enter") {
				e.preventDefault();
				e.currentTarget.blur();
			}
		};

		return (
			<textarea
				ref={ref}
				className={clsx("todo-textarea", className)}
				placeholder="Add a task..."
				required
				rows={1}
				spellCheck={false}
				onKeyDown={handleKeyDown}
				{...props}
			/>
		);
	},
);
