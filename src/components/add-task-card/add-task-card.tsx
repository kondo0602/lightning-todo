import { useRef } from "react";
import "./add-task-card.css";

type AddTaskCardProps = {
	onAdd: (text: string, note: string) => void;
};

export const AddTaskCard = ({ onAdd }: AddTaskCardProps) => {
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
			className="add-todo-card"
			role="button"
			tabIndex={-1}
			onClick={() => inputRef.current?.focus()}
		>
			<div className="add-todo-card-placeholder">
				<span className="add-todo-card-icon">＋</span>Add a task
			</div>
			<form className="add-todo-form" onSubmit={handleAddTask}>
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
