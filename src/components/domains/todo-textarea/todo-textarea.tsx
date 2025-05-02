import clsx from "clsx";

import type { ComponentProps } from "react";

import styles from "./todo-textarea.module.css";

type TodoTextareaProps = ComponentProps<"textarea">;

export const TodoTextarea = ({
	ref,
	className,
	...props
}: TodoTextareaProps) => {
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
			className={clsx(styles.textarea, className)}
			placeholder="Add a task..."
			required
			rows={1}
			spellCheck={false}
			onKeyDown={handleKeyDown}
			{...props}
		/>
	);
};
