import { useRef } from "react";
import { TodoTextarea } from "../todo-textarea/todo-textarea";
import "./todo-add-card.css";
import { Card } from "../../elements/card/card";
import { TodoForm } from "../todo-form/todo-form";

type TodoAddCardProps = {
	onAdd: (text: string) => void;
};

export const TodoAddCard = ({ onAdd }: TodoAddCardProps) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.currentTarget;
		const formData = new FormData(form);
		const taskText = formData.get("task")?.toString();

		if (taskText) {
			onAdd(taskText);
			form.reset();
		}
	};

	return (
		<Card
			className="todo-add-card"
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
		</Card>
	);
};
