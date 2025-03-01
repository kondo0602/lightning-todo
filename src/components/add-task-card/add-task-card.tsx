import { useState, useRef } from "react";
import "./add-task-card.css";

interface AddTaskCardProps {
	onAdd: (text: string, note: string) => void;
}

export function AddTaskCard({ onAdd }: AddTaskCardProps) {
	const [isAddingTodo, setIsAddingTodo] = useState(false);
	const [newTodo, setNewTodo] = useState("");
	const [newNote, setNewNote] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	const handleAdd = () => {
		if (newTodo.trim() === "") return;

		onAdd(newTodo, newNote);
		setNewTodo("");
		setNewNote("");
		setIsAddingTodo(false);
	};

	return (
		<div
			className={`add-todo-card ${isAddingTodo ? "editing" : ""}`}
			onClick={() => {
				if (!isAddingTodo) {
					setIsAddingTodo(true);
					// 次のレンダリング後にフォーカスを設定
					setTimeout(() => inputRef.current?.focus(), 0);
				}
			}}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					!isAddingTodo && setIsAddingTodo(true);
				}
			}}
			role="button"
			tabIndex={0}
		>
			{!isAddingTodo ? (
				<div className="add-todo-placeholder">
					<span>＋</span> Add a task
				</div>
			) : (
				<div
					className="add-todo-form"
					onClick={(e) => e.stopPropagation()}
					onKeyDown={(e) => e.stopPropagation()}
				>
					<input
						type="text"
						value={newTodo}
						onChange={(e) => setNewTodo(e.target.value)}
						onKeyPress={(e) => e.key === "Enter" && handleAdd()}
						ref={inputRef}
					/>
					<input
						type="text"
						value={newNote}
						onChange={(e) => setNewNote(e.target.value)}
						onKeyPress={(e) => e.key === "Enter" && handleAdd()}
						placeholder="Add note..."
						className="note-input"
					/>
				</div>
			)}
		</div>
	);
}
