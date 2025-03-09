import { useRef } from "react";
import "./todo-add-card.css";

type TodoAddCardProps = {
	onAdd: (text: string, note: string) => void;
};

export const TodoAddCard = ({ onAdd }: TodoAddCardProps) => {
	const formRef = useRef<HTMLFormElement>(null);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		// NOTE: textareaでEnterを押すと改行されてしまいフォーム送信がされないため、以下のようにする
		//
		// Enterだけ押した場合：フォーム送信
		// Shift + Enterを押した場合：textarea内で改行
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			formRef.current?.requestSubmit();
		}
	};

	const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.currentTarget;
		const task = form.elements[0] as HTMLTextAreaElement;
		const note = form.elements[1] as HTMLInputElement;

		const taskText = task.value.trim();
		const noteText = note.value.trim();

		onAdd(taskText, noteText);
		task.value = "";
		note.value = "";
		task.blur();
	};

	return (
		<div
			className="todo-add-card"
			role="button"
			tabIndex={-1}
			onClick={() => textareaRef.current?.focus()}
		>
			<div className="todo-add-card-placeholder">
				<span className="todo-add-card-icon">＋</span>Add a task
			</div>
			<form className="todo-add-form" onSubmit={handleAddTask} ref={formRef}>
				<textarea
					ref={textareaRef}
					placeholder="Add a task..."
					required
					rows={1}
					onKeyDown={handleKeyDown}
				/>
				<textarea
					placeholder="Add note..."
					rows={1}
					// NOTE: イベントが伝播してタスク追加のtextareaにフォーカスしてしまうため、stopPropagationしている
					onClick={(e) => e.stopPropagation()}
					onKeyDown={handleKeyDown}
				/>
				<button type="submit" className="visually-hidden" tabIndex={-1} />
			</form>
		</div>
	);
};
