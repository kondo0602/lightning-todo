import { useRef } from "react";
import "./todo-list-item-card.css";

type Todo = {
	id: string;
	text: string;
	completed: boolean;
	note: string;
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

	const handleFocus = (element: HTMLElement) => {
		// 要素を編集可能にする
		if (
			element instanceof HTMLTextAreaElement ||
			element instanceof HTMLInputElement
		) {
			element.readOnly = false;
		}
	};

	const handleBlur = (element: HTMLElement) => {
		// 編集終了時に保存
		handleSave();

		// 要素を読み取り専用に戻す
		if (
			element instanceof HTMLTextAreaElement ||
			element instanceof HTMLInputElement
		) {
			element.readOnly = true;
		}
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
						className="todo-task-text"
						ref={textareaRef}
						placeholder="Add a task..."
						rows={1}
						onFocus={(e) => handleFocus(e.currentTarget)}
						onBlur={(e) => handleBlur(e.currentTarget)}
						onKeyDown={handleKeyDown}
					/>
				</div>
				{/* <div className="todo-note-container"> */}
				<textarea
					className="todo-note"
					placeholder="Add a note..."
					rows={1}
					onClick={(e) => e.stopPropagation()}
					onFocus={(e) => handleFocus(e.currentTarget)}
					onBlur={(e) => handleBlur(e.currentTarget)}
					onKeyDown={handleKeyDown}
				/>
				{/* </div> */}
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
