import { useState } from "react";
import "./App.css";

interface Todo {
	id: number;
	text: string;
	completed: boolean;
	note: string;
}

function App() {
	const getCurrentMonthYear = () => {
		const months = [
			"JANUARY",
			"FEBRUARY",
			"MARCH",
			"APRIL",
			"MAY",
			"JUNE",
			"JULY",
			"AUGUST",
			"SEPTEMBER",
			"OCTOBER",
			"NOVEMBER",
			"DECEMBER",
		];
		const now = new Date();
		const month = months[now.getMonth()];
		const year = now.getFullYear();
		return `${month} ${year}`;
	};

	const initialTodos: Todo[] = [
		{
			id: 1,
			text: "Create a new project presentation",
			note: "Include Q1 metrics and future roadmap",
			completed: false,
		},
		{
			id: 2,
			text: "Review pull requests",
			note: "Focus on the authentication module changes",
			completed: false,
		},
		{
			id: 3,
			text: "Update documentation",
			note: "Add examples for new API endpoints",
			completed: true,
		},
		{
			id: 4,
			text: "Fix navigation bug",
			note: "Issue occurs on mobile devices only",
			completed: true,
		},
	];

	const [todos, setTodos] = useState<Todo[]>(initialTodos);
	const [newTodo, setNewTodo] = useState("");
	const [newNote, setNewNote] = useState("");
	const [openMenuId, setOpenMenuId] = useState<number | null>(null);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [editText, setEditText] = useState("");
	const [editNote, setEditNote] = useState("");
	const [focusedField, setFocusedField] = useState<"text" | "note" | null>(
		null,
	);
	const [isAddingTodo, setIsAddingTodo] = useState(false);

	const addTodo = () => {
		if (newTodo.trim() === "") return;

		setTodos([
			{
				id: Date.now(),
				text: newTodo,
				completed: false,
				note: newNote,
			},
			...todos,
		]);
		setNewTodo("");
		setNewNote("");
		setIsAddingTodo(false);
	};

	const toggleTodo = (id: number) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo,
			),
		);
	};

	const deleteTodo = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	const toggleMenu = (id: number) => {
		setOpenMenuId(openMenuId === id ? null : id);
	};

	const startEditing = (todo: Todo) => {
		setEditingId(todo.id);
		setEditText(todo.text);
		setEditNote(todo.note);
		setFocusedField("text");
	};

	const saveEdit = () => {
		if (!editingId) return;

		setTodos(
			todos.map((todo) =>
				todo.id === editingId
					? { ...todo, text: editText, note: editNote }
					: todo,
			),
		);
		setEditingId(null);
		setFocusedField(null);
	};

	const activeTodos = todos.filter((todo) => !todo.completed);
	const completedTodos = todos.filter((todo) => todo.completed);

	return (
		<div className="container">
			<h1>{getCurrentMonthYear()}</h1>

			<div
				className={`add-todo-card ${isAddingTodo ? "editing" : ""}`}
				onClick={() => !isAddingTodo && setIsAddingTodo(true)}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						!isAddingTodo && setIsAddingTodo(true);
					}
				}}
				role="button"
				tabIndex={0}
			>
				{isAddingTodo ? (
					<div
						className="add-todo-form"
						onClick={(e) => e.stopPropagation()}
						onKeyDown={(e) => e.stopPropagation()}
					>
						<input
							type="text"
							value={newTodo}
							onChange={(e) => setNewTodo(e.target.value)}
							onKeyPress={(e) => e.key === "Enter" && addTodo()}
							placeholder="Enter new task..."
							ref={(input) => input?.focus()}
						/>
						<input
							type="text"
							value={newNote}
							onChange={(e) => setNewNote(e.target.value)}
							onKeyPress={(e) => e.key === "Enter" && addTodo()}
							placeholder="Add a note (optional)..."
							className="note-input"
						/>
					</div>
				) : (
					<div className="add-todo-placeholder">
						<span>＋</span> Add a task
					</div>
				)}
			</div>

			<ul className="todo-list">
				{activeTodos.map((todo) => (
					<li
						key={todo.id}
						className={todo.completed ? "completed" : ""}
						onClick={(e) => {
							if (
								e.target instanceof HTMLElement &&
								(e.target.closest(".menu-button") ||
									e.target.closest(".dropdown-menu"))
							) {
								return;
							}
							startEditing(todo);
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								startEditing(todo);
							}
						}}
						tabIndex={0}
						role="button"
					>
						<div className="todo-content">
							<div className="todo-main">
								<input
									type="checkbox"
									checked={todo.completed}
									onChange={() => toggleTodo(todo.id)}
									onClick={(e) => e.stopPropagation()}
								/>
								{editingId === todo.id ? (
									<input
										type="text"
										value={editText}
										onChange={(e) => setEditText(e.target.value)}
										onKeyPress={(e) => e.key === "Enter" && saveEdit()}
										onBlur={() => {
											if (focusedField !== "note") {
												saveEdit();
											}
										}}
										autoFocus={focusedField === "text"}
										onClick={(e) => e.stopPropagation()}
									/>
								) : (
									<span>{todo.text}</span>
								)}
							</div>
							{editingId === todo.id ? (
								<input
									type="text"
									value={editNote}
									onChange={(e) => setEditNote(e.target.value)}
									onKeyPress={(e) => e.key === "Enter" && saveEdit()}
									onBlur={saveEdit}
									autoFocus={focusedField === "note"}
									placeholder="Add a note..."
									className="edit-note"
									onClick={(e) => {
										e.stopPropagation();
										setFocusedField("note");
									}}
								/>
							) : (
								todo.note && (
									<div
										className="todo-note"
										onClick={(e) => {
											e.stopPropagation();
											startEditing(todo);
											setFocusedField("note");
										}}
									>
										{todo.note}
									</div>
								)
							)}
						</div>
						<div className="menu-container">
							<button
								type="button"
								className="menu-button"
								onClick={() => toggleMenu(todo.id)}
							>
								⋮
							</button>
							{openMenuId === todo.id && (
								<div className="dropdown-menu">
									<button
										type="button"
										onClick={() => {
											deleteTodo(todo.id);
											setOpenMenuId(null);
										}}
									>
										Delete
									</button>
								</div>
							)}
						</div>
					</li>
				))}
			</ul>

			{completedTodos.length > 0 && (
				<div className="completed-section">
					<h2>DONE</h2>
					<ul className="todo-list completed-list">
						{completedTodos.map((todo) => (
							<li
								key={todo.id}
								className="completed"
								onClick={(e) => {
									if (
										e.target instanceof HTMLElement &&
										(e.target.closest(".menu-button") ||
											e.target.closest(".dropdown-menu"))
									) {
										return;
									}
									startEditing(todo);
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										startEditing(todo);
									}
								}}
								tabIndex={0}
								role="button"
							>
								<div className="todo-content">
									<div className="todo-main">
										<input
											type="checkbox"
											checked={todo.completed}
											onChange={() => toggleTodo(todo.id)}
											onClick={(e) => e.stopPropagation()}
										/>
										{editingId === todo.id ? (
											<input
												type="text"
												value={editText}
												onChange={(e) => setEditText(e.target.value)}
												onKeyPress={(e) => e.key === "Enter" && saveEdit()}
												onBlur={() => {
													if (focusedField !== "note") {
														saveEdit();
													}
												}}
												autoFocus={focusedField === "text"}
												onClick={(e) => e.stopPropagation()}
											/>
										) : (
											<span>{todo.text}</span>
										)}
									</div>
									{editingId === todo.id ? (
										<input
											type="text"
											value={editNote}
											onChange={(e) => setEditNote(e.target.value)}
											onKeyPress={(e) => e.key === "Enter" && saveEdit()}
											onBlur={saveEdit}
											autoFocus={focusedField === "note"}
											placeholder="Add a note..."
											className="edit-note"
											onClick={(e) => {
												e.stopPropagation();
												setFocusedField("note");
											}}
										/>
									) : (
										todo.note && (
											<div
												className="todo-note"
												onClick={(e) => {
													e.stopPropagation();
													startEditing(todo);
													setFocusedField("note");
												}}
											>
												{todo.note}
											</div>
										)
									)}
								</div>
								<div className="menu-container">
									<button
										type="button"
										className="menu-button"
										onClick={() => toggleMenu(todo.id)}
									>
										⋮
									</button>
									{openMenuId === todo.id && (
										<div className="dropdown-menu">
											<button
												type="button"
												onClick={() => {
													deleteTodo(todo.id);
													setOpenMenuId(null);
												}}
											>
												Delete
											</button>
										</div>
									)}
								</div>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export default App;
