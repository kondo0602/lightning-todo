import "./todo-card.css";
import { TodoCheckbox } from "../todo-checkbox/todo-checkbox";
import { TodoTaskTextarea } from "../todo-task-textarea/todo-task-textarea";
import { TodoNoteTextarea } from "../todo-note-textarea/todo-note-textarea";
import { Todo } from "../../use-todo-list";

type TodoCardProps = {
	todo: Todo;
	onToggle: (id: string) => void;
	onDelete: (id: string) => void;
	onSave: (id: string, text: string, note: string) => void;
};

export const TodoCard = (props: TodoCardProps) => {
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		// 日本語入力の変換中はEnterキーを無視する
		if (e.nativeEvent.isComposing) {
			return;
		}

		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
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
		if (newTask !== props.todo.task || newNote !== props.todo.note) {
			props.onSave(props.todo.id, newTask, newNote);
		}
	};

	return (
		<div className={`todo-card ${props.todo.completed ? "completed" : ""}`}>
			<form
				className="todo-card-form"
				onBlur={handleSubmit}
				onSubmit={handleSubmit}
			>
				<div className="todo-task-container">
					<TodoCheckbox
						checked={props.todo.completed}
						onChange={() => props.onToggle(props.todo.id)}
					/>
					<TodoTaskTextarea
						className="todo-task-textarea"
						name="task"
						defaultValue={props.todo.task}
						onKeyDown={handleKeyDown}
					/>
				</div>
				<div className="todo-note-container">
					<TodoNoteTextarea
						className="todo-note-textarea"
						name="note"
						defaultValue={props.todo.note}
						onKeyDown={handleKeyDown}
					/>
				</div>
			</form>
			<button
				className="trash-button"
				type="button"
				aria-label="trash"
				onClick={() => props.onDelete(props.todo.id)}
				// NOTE: 削除ボタンを押した時にカードにフォーカスリングが表示されないようにするための記述
				onMouseDown={(e) => {
					e.preventDefault();
					e.stopPropagation();
				}}
			>
				trash
			</button>
		</div>
	);
};
