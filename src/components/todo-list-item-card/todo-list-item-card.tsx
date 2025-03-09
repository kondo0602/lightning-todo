import { useRef } from "react";
import "./todo-list-item-card.css";
interface TodoListItemCardProps {
	todo: Todo;
	onToggle: (id: string) => void;
	onDelete: (id: string) => void;
	onSave: (id: string, text: string, note: string) => void;
}

interface Todo {
	id: string;
	text: string;
	completed: boolean;
	note: string;
}

export function TodoListItemCard(props: TodoListItemCardProps) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const noteInputRef = useRef<HTMLInputElement>(null);
	const formRef = useRef<HTMLFormElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);

	const handleSave = (e?: React.FormEvent) => {
		if (e) e.preventDefault();

		if (textareaRef.current && noteInputRef.current) {
			const newText = textareaRef.current.value.trim();
			const newNote = noteInputRef.current.value.trim();
			props.onSave(props.todo.id, newText, newNote);

			// フォームを非表示にして表示モードに戻す
			if (formRef.current) {
				formRef.current.classList.remove("editing");
			}
		}
	};

	const startEditing = (focusField: "text" | "note") => {
		if (formRef.current) {
			formRef.current.classList.add("editing");

			// フォーカスを設定
			setTimeout(() => {
				if (focusField === "text" && textareaRef.current) {
					textareaRef.current.focus();
				} else if (focusField === "note" && noteInputRef.current) {
					noteInputRef.current.focus();
				}
			}, 0);
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
			handleSave();
		}
	};

	return (
		<div className={`todo-card ${props.todo.completed ? "completed" : ""}`}>
			{/* 表示モード */}
			<div
				className="todo-view-mode"
				onClick={(e) => {
					if (
						e.target instanceof HTMLElement &&
						(e.target.closest(".menu-button") ||
							e.target.closest(".dropdown-menu"))
					) {
						return;
					}
					startEditing("text");
				}}
				role="button"
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						startEditing("text");
					}
				}}
			>
				<div className="todo-content">
					<div className="todo-main">
						<input
							type="checkbox"
							checked={props.todo.completed}
							onChange={() => props.onToggle(props.todo.id)}
							onClick={(e) => e.stopPropagation()}
						/>
						<p className="todo-task-text">{props.todo.text}</p>
					</div>
					{props.todo.note && (
						<div
							className="todo-note-container"
							onClick={(e) => {
								e.stopPropagation();
								startEditing("note");
							}}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									startEditing("note");
								}
							}}
							role="button"
							tabIndex={0}
						>
							<p className="todo-note">{props.todo.note}</p>
						</div>
					)}
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

			{/* 編集モード */}
			<form className="todo-edit-mode" ref={formRef} onSubmit={handleSave}>
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
							defaultValue={props.todo.text}
							ref={textareaRef}
							onKeyDown={handleKeyDown}
							onBlur={handleSave}
							spellCheck={false}
						/>
					</div>
					<div className="todo-note-container">
						<input
							type="text"
							className="todo-note-text"
							defaultValue={props.todo.note}
							ref={noteInputRef}
							placeholder="Add a note..."
							onKeyDown={handleKeyDown}
							onBlur={handleSave}
						/>
					</div>
				</div>
			</form>
		</div>
	);
}
