import { useRef } from "react";
import { TodoTextarea } from "../todo-textarea/todo-textarea";
import "./todo-add-card.css";

type TodoAddCardProps = {
	onAdd: (text: string) => void;
};

export const TodoAddCard = ({ onAdd }: TodoAddCardProps) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// TODO: textarea側に委譲する
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		// 日本語入力の変換中はEnterキーを無視する
		if (e.nativeEvent.isComposing) {
			return;
		}

		// NOTE: textareaでEnterを押すと改行されてしまいフォーム送信がされないため、以下のようにする
		//
		// Enterだけ押した場合：フォーム送信
		// Shift + Enterを押した場合：textarea内で改行
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			textareaRef.current?.blur();
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.currentTarget;
		const task = form.elements[0] as HTMLTextAreaElement;

		const taskText = task.value.trim();

		if (taskText) {
			onAdd(taskText);
			task.value = "";
		}
		task.blur();
	};

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: tabIndexを-1にしているため
		<div
			className="todo-add-card"
			role="button"
			tabIndex={-1}
			onClick={() => textareaRef.current?.focus()}
		>
			<div className="todo-add-card-placeholder">
				<span className="todo-add-card-icon">＋</span>
				<span>Add a task</span>
			</div>
			<form
				className="todo-add-form"
				onBlur={handleSubmit}
				onSubmit={handleSubmit}
			>
				<TodoTextarea
					ref={textareaRef}
					className="todo-add-card-task-textarea"
					name="task"
					onKeyDown={handleKeyDown}
				/>
				<button type="submit" className="visually-hidden" tabIndex={-1} />
			</form>
		</div>
	);
};
