import { useRef } from "react";

import { Card } from "../../elements/card/card";
import { Checkbox } from "../../elements/checkbox/checkbox";
import { TodoForm } from "../todo-form/todo-form";
import { TodoTextarea } from "../todo-textarea/todo-textarea";

import type { Todo } from "../../../types/todo";

import { IoIosArrowForward, IoMdTrash } from "react-icons/io";
import { GhostButton } from "../../elements/ghost-button/ghost-button";
import styles from "./todo-card.module.css";

type TodoCardProps = {
	todo: Todo;
	onToggle: (id: string) => void;
	onSave: (id: string, text: string) => void;
	onPostpone?: (id: string) => void;
	onDelete?: (id: string) => void;
};

export const TodoCard = ({
	todo,
	onToggle,
	onSave,
	onPostpone,
	onDelete,
}: TodoCardProps) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.currentTarget;
		const formData = new FormData(form);
		const newTask = formData.get("task")?.toString();

		if (newTask && todo.task !== newTask) {
			onSave(todo.id, newTask);
		}
	};

	return (
		<Card
			className={styles.card}
			data-state={todo.completed ? "complete" : "incomplete"}
			onClick={() => textareaRef.current?.focus()}
		>
			<TodoForm onBlur={handleSubmit} onSubmit={handleSubmit}>
				<div className={styles.cardContainer}>
					<Checkbox
						checked={todo.completed}
						onChange={() => onToggle(todo.id)}
					/>
					<TodoTextarea
						ref={textareaRef}
						className={styles.textarea}
						name="task"
						defaultValue={todo.task}
					/>
				</div>
			</TodoForm>
			<div className={styles.buttonContainer}>
				{onDelete && (
					<GhostButton
						className={styles.button}
						type="button"
						tabIndex={-1}
						onClick={(e) => {
							e.stopPropagation();
							onDelete(todo.id);
						}}
						onMouseDown={(e) => {
							e.preventDefault();
							e.stopPropagation();
						}}
					>
						<IoMdTrash />
					</GhostButton>
				)}
				{!todo.completed && onPostpone && (
					<GhostButton
						className={styles.button}
						type="button"
						tabIndex={-1}
						onClick={(e) => {
							e.stopPropagation();
							onPostpone(todo.id);
						}}
						onMouseDown={(e) => {
							e.preventDefault();
							e.stopPropagation();
						}}
					>
						<IoIosArrowForward />
					</GhostButton>
				)}
			</div>
		</Card>
	);
};
