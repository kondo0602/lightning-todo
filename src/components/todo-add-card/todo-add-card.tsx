import { useRef } from "react";
import { TodoTextarea } from "../todo-textarea/todo-textarea";
import "./todo-add-card.css";
import { TodoForm } from "../todo-form/todo-form";

type TodoAddCardProps = {
	onAdd: (text: string) => void;
};

export const TodoAddCard = ({ onAdd }: TodoAddCardProps) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

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
			<TodoForm
				className="todo-add-form"
				onBlur={handleSubmit}
				onSubmit={handleSubmit}
			>
				<TodoTextarea
					ref={textareaRef}
					className="todo-add-textarea"
					name="task"
				/>
			</TodoForm>
		</div>
	);
};
