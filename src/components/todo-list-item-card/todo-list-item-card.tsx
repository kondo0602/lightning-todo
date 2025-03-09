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
	const noteInputRef = useRef<HTMLInputElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const cardRef = useRef<HTMLDivElement>(null);

	const handleSave = () => {
		if (textareaRef.current && noteInputRef.current) {
			const newText = textareaRef.current.value.trim();
			const newNote = noteInputRef.current.value.trim();

			// 値が変わっていたら保存
			if (newText !== props.todo.text || newNote !== props.todo.note) {
				props.onSave(props.todo.id, newText, newNote);
			}
		}
	};

	const handleFocus = (element: HTMLElement) => {
		// フォーカス時にカードをアクティブ状態にする
		if (cardRef.current) {
			cardRef.current.classList.add("editing");
		}

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

		// カードの編集状態を解除
		if (cardRef.current) {
			cardRef.current.classList.remove("editing");
		}

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
			ref={cardRef}
			role="button"
			tabIndex={-1}
		>
			<div className="todo-content">
				<div className="todo-main">
					<input
						type="checkbox"
						checked={props.todo.completed}
						onChange={() => props.onToggle(props.todo.id)}
						onClick={(e) => e.stopPropagation()}
					/>
					<textarea
						className="todo-task-text"
						value={props.todo.text}
						onChange={(e) => (e.currentTarget.value = e.currentTarget.value)}
						ref={textareaRef}
						onFocus={(e) => handleFocus(e.currentTarget)}
						onBlur={(e) => handleBlur(e.currentTarget)}
						onKeyDown={handleKeyDown}
						readOnly
						spellCheck={false}
					/>
				</div>
				<div className="todo-note-container">
					<input
						type="text"
						className="todo-note"
						value={props.todo.note}
						onChange={(e) => (e.currentTarget.value = e.currentTarget.value)}
						ref={noteInputRef}
						placeholder="Add a note..."
						onFocus={(e) => handleFocus(e.currentTarget)}
						onBlur={(e) => handleBlur(e.currentTarget)}
						onKeyDown={handleKeyDown}
						readOnly
					/>
				</div>
			</div>
			<div className="menu-container">
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
			</div>
		</div>
	);
};
