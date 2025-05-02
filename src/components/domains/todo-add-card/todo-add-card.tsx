import { useRef } from "react";

import { Card } from "../../elements/card/card";
import { TodoForm } from "../todo-form/todo-form";
import { TodoTextarea } from "../todo-textarea/todo-textarea";

import styles from "./todo-add-card.module.css";

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
		<Card className={styles.card} onClick={() => textareaRef.current?.focus()}>
			<div className={styles.placeholder}>
				<span className={styles.placeholderIcon}>＋</span>
				<span>Add a task</span>
			</div>
			<TodoForm
				className={styles.form}
				onBlur={handleSubmit}
				onSubmit={handleSubmit}
			>
				<TodoTextarea
					ref={textareaRef}
					className={styles.textarea}
					name="task"
				/>
			</TodoForm>
		</Card>
	);
};
