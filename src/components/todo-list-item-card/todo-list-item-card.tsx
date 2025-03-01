import { useState } from "react";
import "./todo-list-item-card.css";
interface TodoListItemCardProps {
	todo: Todo;
	onToggle: (id: number) => void;
	onDelete: (id: number) => void;
	onSave: (id: number, text: string, note: string) => void;
}

interface Todo {
	id: number;
	text: string;
	completed: boolean;
	note: string;
}

export function TodoListItemCard(props: TodoListItemCardProps) {
	const [editingId, setEditingId] = useState<number | null>(null);
	const [initialFocus, setInitialFocus] = useState<"text" | "note">("text");

	const startEditing = (todo: Todo, focusField: "text" | "note") => {
		setEditingId(todo.id);
		setInitialFocus(focusField);
	};

	return editingId === props.todo.id ? (
		<TodoCardEdit
			{...props}
			onSave={(id, text, note) => {
				props.onSave(id, text, note);
				setEditingId(null);
			}}
			initialFocus={initialFocus}
		/>
	) : (
		<TodoCardView {...props} onStartEdit={startEditing} />
	);
}

interface TodoCardViewProps {
	todo: Todo;
	onToggle: (id: number) => void;
	onDelete: (id: number) => void;
	onStartEdit: (todo: Todo, focusField: "text" | "note") => void;
}

function TodoCardView({
	todo,
	onToggle,
	onDelete,
	onStartEdit,
}: TodoCardViewProps) {
	const [openMenuId, setOpenMenuId] = useState<number | null>(null);

	return (
		<div
			className={`todo-card ${todo.completed ? "completed" : ""}`}
			onClick={(e) => {
				if (
					e.target instanceof HTMLElement &&
					(e.target.closest(".menu-button") ||
						e.target.closest(".dropdown-menu"))
				) {
					return;
				}
				onStartEdit(todo, "text");
			}}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					onStartEdit(todo, "text");
				}
			}}
			role="button"
			tabIndex={0}
		>
			<div className="todo-content">
				<div className="todo-main">
					<input
						type="checkbox"
						checked={todo.completed}
						onChange={() => onToggle(todo.id)}
						onClick={(e) => e.stopPropagation()}
					/>
					<p className="todo-task-text">{todo.text}</p>
				</div>
				{todo.note && (
					<div
						className="todo-note-container"
						onClick={(e) => {
							e.stopPropagation();
							onStartEdit(todo, "note");
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								onStartEdit(todo, "note");
							}
						}}
						role="button"
						tabIndex={0}
					>
						<p className="todo-note">{todo.note}</p>
					</div>
				)}
			</div>
			<div className="menu-container">
				<button
					type="button"
					className="menu-button"
					onClick={() => setOpenMenuId(openMenuId === todo.id ? null : todo.id)}
				>
					⋮
				</button>
				{openMenuId === todo.id && (
					<div className="dropdown-menu">
						<button
							type="button"
							onClick={() => {
								onDelete(todo.id);
								setOpenMenuId(null);
							}}
						>
							Delete
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

interface TodoCardEditProps {
	todo: Todo;
	onToggle: (id: number) => void;
	onSave: (id: number, text: string, note: string) => void;
	initialFocus: "text" | "note";
}

function TodoCardEdit({
	todo,
	onToggle,
	onSave,
	initialFocus,
}: TodoCardEditProps) {
	const [editText, setEditText] = useState(todo.text);
	const [editNote, setEditNote] = useState(todo.note);
	const [focusedField, setFocusedField] = useState<"text" | "note">(
		initialFocus,
	);

	const handleSave = () => {
		onSave(todo.id, editText, editNote);
	};

	return (
		<div className={`todo-card ${todo.completed ? "completed" : ""}`}>
			<div className="todo-content">
				<div className="todo-main">
					<input
						type="checkbox"
						checked={todo.completed}
						onChange={() => onToggle(todo.id)}
						onClick={(e) => e.stopPropagation()}
					/>
					<textarea
						className="todo-task-text"
						value={editText}
						onChange={(e) => setEditText(e.target.value)}
						onKeyPress={(e) => e.key === "Enter" && handleSave()}
						onBlur={() => {
							if (focusedField !== "note") {
								handleSave();
							}
						}}
						ref={(input) => focusedField === "text" && input?.focus()}
						onClick={(e) => e.stopPropagation()}
						spellCheck={false}
					/>
				</div>
				<div className="todo-note-container">
					<input
						type="text"
						className="todo-note-text"
						value={editNote}
						onChange={(e) => setEditNote(e.target.value)}
						onKeyPress={(e) => e.key === "Enter" && handleSave()}
						onBlur={handleSave}
						ref={(input) => focusedField === "note" && input?.focus()}
						placeholder="Add a note..."
						onClick={(e) => {
							e.stopPropagation();
							setFocusedField("note");
						}}
					/>
				</div>
			</div>
		</div>
	);
}
