import { useState } from "react";
import "./add-task-card.css";

type AddTaskCardProps = {
	onAdd: (text: string, note: string) => void;
};

export const AddTaskCard = ({ onAdd }: AddTaskCardProps) => {
	const [isAddingTodo, setIsAddingTodo] = useState(false);
	const enterEditMode = () => {
		if (isAddingTodo) return;
		setIsAddingTodo(true);
	};
	const exitEditMode = () => {
		if (!isAddingTodo) return;
		setIsAddingTodo(false);
	};

	const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.currentTarget;
		const task = form.elements[0] as HTMLInputElement;
		const note = form.elements[1] as HTMLInputElement;
		onAdd(task.value, note.value);

		setIsAddingTodo(false);
	};

	return (
		<div
			className={`add-todo-card ${isAddingTodo ? "editing" : ""}`}
			onClick={enterEditMode}
			role="button"
			tabIndex={0}
		>
			{!isAddingTodo ? (
				<div className="add-todo-card-placeholder">
					<span className="add-todo-card-icon">＋</span>Add a task
				</div>
			) : (
				<form className="add-todo-form" onSubmit={handleAddTask}>
					<input type="text" placeholder="Add a task..." />
					<input type="text" placeholder="Add note..." />
					<button type="submit" style={{ display: "none" }} />
				</form>
			)}
		</div>
	);
};
