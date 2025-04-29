import { useRef } from "react";
// import { FaAngleRight, FaRegTrashAlt } from "react-icons/fa";
import type { Todo } from "../../types/todo";
import { TodoCheckbox } from "../todo-checkbox/todo-checkbox";
import { TodoTaskTextarea } from "../todo-task-textarea/todo-task-textarea";
import "./todo-card.css";

type TodoCardProps = {
	todo: Todo;
	onToggle: (id: string) => void;
	onPostpone: (id: string) => void;
	onDelete: (id: string) => void;
	onSave: (id: string, text: string, note: string) => void;
};

export const TodoCard = (props: TodoCardProps) => {
	const formRef = useRef<HTMLFormElement>(null);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		// 日本語入力の変換中はEnterキーを無視する
		if (e.nativeEvent.isComposing) {
			return;
		}

		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			formRef.current?.requestSubmit();
			e.currentTarget.blur();
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// FormDataを使ってフォームの値を取得
		const formData = new FormData(e.currentTarget);
		const newTask = formData.get("task")?.toString() || "";
		const newNote = formData.get("note")?.toString() || "";

		// テキストか注釈が変更された場合のみ保存する
		if (newTask !== props.todo.task) {
			props.onSave(props.todo.id, newTask, newNote);
		}
	};

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: tabIndexを-1にしているため
		<div
			className="todo-card"
			data-state={props.todo.completed ? "complete" : "incomplete"}
			onClick={() => textareaRef.current?.focus()}
			role="button"
			tabIndex={-1}
		>
			<form
				className="todo-card-form"
				onBlur={handleSubmit}
				onSubmit={handleSubmit}
			>
				<TodoCheckbox
					checked={props.todo.completed}
					onChange={() => props.onToggle(props.todo.id)}
				/>
				<TodoTaskTextarea
					ref={textareaRef}
					className="todo-task-textarea"
					name="task"
					defaultValue={props.todo.task}
					onKeyDown={handleKeyDown}
				/>
				<button type="submit" className="visually-hidden" tabIndex={-1} />
			</form>
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
		</div>
	);
};
