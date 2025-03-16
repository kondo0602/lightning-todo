import "./todo-card.css";
import { TodoCheckbox } from "../todo-checkbox/todo-checkbox";
import { TodoTaskTextarea } from "../todo-task-textarea/todo-task-textarea";
import { TodoNoteTextarea } from "../todo-note-textarea/todo-note-textarea";

export type Todo = {
	id: string;
	text: string;
	note: string;
	completed: boolean;
};

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
		const newText = formData.get("text")?.toString() || "";
		const newNote = formData.get("note")?.toString() || "";

		// テキストか注釈が変更された場合のみ保存する
		if (newText !== props.todo.text || newNote !== props.todo.note) {
			props.onSave(props.todo.id, newText, newNote);
		}
	};

	const handleBlur = (e: React.FocusEvent<HTMLFormElement>) => {
		// フォームのsubmitイベントを発火
		e.currentTarget.requestSubmit();
	};

	return (
		<div className={`todo-card ${props.todo.completed ? "completed" : ""}`}>
			<form onSubmit={handleSubmit} onBlur={handleBlur}>
				<div className="todo-task-container">
					<TodoCheckbox
						checked={props.todo.completed}
						onChange={() => props.onToggle(props.todo.id)}
					/>
					<TodoTaskTextarea
						className="todo-task-textarea"
						name="text"
						defaultValue={props.todo.text}
						onKeyDown={handleKeyDown}
					/>
				</div>
				<div className="todo-note-container">
					<TodoNoteTextarea
						name="note"
						defaultValue={props.todo.note}
						onKeyDown={handleKeyDown}
					/>
				</div>
			</form>
		</div>
	);
};
