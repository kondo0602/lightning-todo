import { useRef } from "react";
// import { FaAngleRight, FaRegTrashAlt } from "react-icons/fa";
import type { Todo } from "../../../types/todo";
import { Card } from "../../elements/card/card";
import { Checkbox } from "../../elements/checkbox/checkbox";
import { TodoForm } from "../todo-form/todo-form";
import { TodoTextarea } from "../todo-textarea/todo-textarea";
import styles from "./todo-card.module.css";

type TodoCardProps = {
	todo: Todo;
	onToggle: (id: string) => void;
	onPostpone: (id: string) => void;
	onDelete: (id: string) => void;
	onSave: (id: string, text: string) => void;
};

export const TodoCard = (props: TodoCardProps) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.currentTarget;
		const formData = new FormData(form);
		const newTask = formData.get("task")?.toString();

		if (newTask && props.todo.task !== newTask) {
			props.onSave(props.todo.id, newTask);
		}
	};

	return (
		<Card
			className={styles.card}
			data-state={props.todo.completed ? "complete" : "incomplete"}
			onClick={() => textareaRef.current?.focus()}
		>
			<TodoForm onBlur={handleSubmit} onSubmit={handleSubmit}>
				<div className={styles.cardContainer}>
					<Checkbox
						checked={props.todo.completed}
						onChange={() => props.onToggle(props.todo.id)}
					/>
					<TodoTextarea
						ref={textareaRef}
						className={styles.textarea}
						name="task"
						defaultValue={props.todo.task}
					/>
				</div>
			</TodoForm>
			{/* {!props.todo.completed && (
				<button
				className="right-button"
				type="button"
				onClick={(e) => {
					e.stopPropagation();
					props.onPostpone(props.todo.id);
					}}
					// NOTE: 削除ボタンを押した時にカードにフォーカスリングが表示されないようにするための記述
					onMouseDown={(e) => {
						e.preventDefault();
						e.stopPropagation();
						}}
						>
						<FaAngleRight />
						</button>
						)}
						<button
						className="trash-button"
						type="button"
						aria-label="trash"
						onClick={(e) => {
							e.stopPropagation(); // カードのクリックイベントが発火しないようにする
							props.onDelete(props.todo.id);
							}}
							// NOTE: 削除ボタンを押した時にカードにフォーカスリングが表示されないようにするための記述
							onMouseDown={(e) => {
								e.preventDefault();
								e.stopPropagation();
								}}
								>
								<FaRegTrashAlt />
								</button> */}
		</Card>
	);
};
