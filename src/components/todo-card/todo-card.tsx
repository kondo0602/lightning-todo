import { useRef } from "react";
import "./todo-card.css";
import { TodoCheckbox } from "../todo-checkbox/todo-checkbox";

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
	const textareaRef = useRef<HTMLTextAreaElement>(null);

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

	return (
		<div
			className={`todo-card ${props.todo.completed ? "completed" : ""}`}
			role="button"
			tabIndex={-1}
			onClick={() => textareaRef.current?.focus()}
		>
			<form>
				<div className="todo-task-container">
					<TodoCheckbox
						checked={props.todo.completed}
						onChange={() => props.onToggle(props.todo.id)}
						onClick={(e) => e.stopPropagation()}
					/>
					<textarea
						className="todo-task-textarea"
						ref={textareaRef}
						defaultValue={props.todo.text}
						placeholder="Add a task..."
						rows={1}
						onKeyDown={handleKeyDown}
					/>
				</div>
				<div className="todo-note-container">
					<textarea
						className="todo-note-textarea"
						defaultValue={props.todo.note}
						placeholder="Add a note..."
						rows={1}
						onClick={(e) => e.stopPropagation()}
						onKeyDown={handleKeyDown}
					/>
				</div>
			</form>
		</div>
	);
};
