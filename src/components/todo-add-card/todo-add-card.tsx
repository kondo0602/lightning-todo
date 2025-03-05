import { useRef } from "react";
import "./todo-add-card.css";

type TodoAddCardProps = {
	onAdd: (text: string, note: string) => void;
};

export const TodoAddCard = ({ onAdd }: TodoAddCardProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.currentTarget;
		const task = form.elements[0] as HTMLInputElement;
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
			onClick={() => inputRef.current?.focus()}
		>
			<div className="todo-add-card-placeholder">
				<span className="todo-add-card-icon">＋</span>Add a task
			</div>
			<form className="todo-add-form" onSubmit={handleAddTask}>
				<input
					ref={inputRef}
					type="text"
					placeholder="Add a task..."
					required
				/>
				<input
					type="text"
					placeholder="Add note..."
					onClick={(e) => e.stopPropagation()}
				/>
				<button type="submit" className="visually-hidden" tabIndex={-1} />
			</form>
		</div>
	);
};
