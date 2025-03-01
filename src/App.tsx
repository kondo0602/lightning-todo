import { useState } from "react";
import "./App.css";
import { TodoListItemCard } from "./components/todo-list-item-card/todo-list-item-card";
import { AddTaskCard } from "./components/add-task-card/add-task-card";

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
			text: "Create a new project presentation. Create a new project presentation. Create a new project presentation.asdfadsfadsfads",
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

	const handleAddTodo = (text: string, note: string) => {
		setTodos([
			{
				id: Date.now(),
				text,
				note,
				completed: false,
			},
			...todos,
		]);
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

	const activeTodos = todos.filter((todo) => !todo.completed);
	const completedTodos = todos.filter((todo) => todo.completed);

	const handleSaveEdit = (id: number, text: string, note: string) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, text: text, note: note } : todo,
			),
		);
	};

	return (
		<div className="container">
			<h1>{getCurrentMonthYear()}</h1>

			<ul className="todo-list">
				<li className="todo-list-item">
					<AddTaskCard onAdd={handleAddTodo} />
				</li>
				{activeTodos.map((todo) => (
					<li key={todo.id} className="todo-list-item">
						<TodoListItemCard
							key={todo.id}
							todo={todo}
							onToggle={toggleTodo}
							onDelete={deleteTodo}
							onSave={handleSaveEdit}
						/>
					</li>
				))}
			</ul>

			{completedTodos.length > 0 && (
				<div className="completed-section">
					<h2>DONE</h2>
					<ul className="todo-list completed-list">
						{completedTodos.map((todo) => (
							<li key={todo.id}>
								<TodoListItemCard
									todo={todo}
									onToggle={toggleTodo}
									onDelete={deleteTodo}
									onSave={handleSaveEdit}
								/>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export default App;
