import { useRef } from "react";
import "./todo-list-item-card.css";

type Todo = {
	id: string;
	text: string;
	note: string;
	completed: boolean;
};

type TodoListItemCardProps = {
	todo: Todo;
	onToggle: (id: string) => void;
	onDelete: (id: string) => void;
	onSave: (id: string, text: string, note: string) => void;
};

export const TodoListItemCard = (props: TodoListItemCardProps) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);

	const handleSave = () => {
		// if (textareaRef.current && noteInputRef.current) {
		// 	const newText = textareaRef.current.value.trim();
		// 	// 値が変わっていたら保存
		// 	if (newText !== props.todo.text || newNote !== props.todo.note) {
		// 		props.onSave(props.todo.id, newText, newNote);
		// 	}
		// }
	};

	const toggleMenu = () => {
		if (menuRef.current) {
			menuRef.current.classList.toggle("open");
		}
	};

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => {
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
					<input
						type="checkbox"
						checked={props.todo.completed}
						onChange={() => props.onToggle(props.todo.id)}
						onClick={(e) => e.stopPropagation()}
					/>
					<textarea
						className="todo-task-textarea"
						ref={textareaRef}
						placeholder="Add a task..."
						rows={1}
						onKeyDown={handleKeyDown}
					/>
				</div>
				<div className="todo-note-container">
					<textarea
						className="todo-note-textarea"
						placeholder="Add a note..."
						rows={1}
						onClick={(e) => e.stopPropagation()}
						onKeyDown={handleKeyDown}
					/>
				</div>
			</form>
			{/* <div className="menu-container">
				<button type="button" className="menu-button" onClick={toggleMenu}>
					⋮
				</button>
				<div className="dropdown-menu" ref={menuRef}>
					<button
						type="button"
						onClick={() => {
							props.onDelete(props.todo.id);
							if (menuRef.current) {
								menuRef.current.classList.remove("open");
							}
						}}
					>
						Delete
					</button>
				</div>
			</div> */}
		</div>
	);
};
