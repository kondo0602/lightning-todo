import { useState } from "react";
import "./add-task-card.css";

type AddTaskCardProps = {
	onAdd: (text: string, note: string) => void;
};

export const AddTaskCard = ({ onAdd }: AddTaskCardProps) => {
	const [isEditMode, setIsEditMode] = useState(false);

	const enterEditMode = () => {
		if (isEditMode) return;
		setIsEditMode(true);
	};

	const exitEditMode = () => {
		if (!isEditMode) return;
		setIsEditMode(false);
	};

	const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.currentTarget;
		const task = form.elements[0] as HTMLInputElement;
		const note = form.elements[1] as HTMLInputElement;

		onAdd(task.value, note.value);
		exitEditMode();
	};

	return (
		<div
			// TODO: 編集中はフォーカスリングを表示するように修正する
			className="add-todo-card"
			data-state={isEditMode ? "editing" : "placeholder"}
			onClick={enterEditMode}
			onKeyDown={(e) => {
				if (
					e.target === e.currentTarget &&
					(e.key === "Enter" || e.key === " ")
				) {
					// NOTE: イベントが子要素のformに伝播してタスク追加が行われることを防いでいる
					e.preventDefault();
					enterEditMode();
				}
			}}
			role="button"
			tabIndex={0}
		>
			{!isEditMode ? (
				<div className="add-todo-card-placeholder">
					<span className="add-todo-card-icon">＋</span>Add a task
				</div>
			) : (
				<form className="add-todo-form" onSubmit={handleAddTask}>
					<input type="text" placeholder="Add a task..." autoFocus />
					<input type="text" placeholder="Add note..." />
					<button type="submit" className="visually-hidden" />
				</form>
			)}
		</div>
	);
};
