import { TodoAddCard } from "./components/todo-add-card/todo-add-card";
import { TodoCard } from "./components/todo-card/todo-card";
import { useSyncLocalStorage } from "./hooks/use-sync-local-storage";
import "./App.css";

import type { Todo } from "./repositories/todo-repository";

function App() {
	const getCurrentDate = () => {
		const now = new Date();
		const month = now.getMonth() + 1;
		const date = now.getDate();
		const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
		const day = dayNames[now.getDay()];
		return `${month}/${date} ${day}`;
	};

	const { storedValue: todos, setStoredValue: setTodos } = useSyncLocalStorage(
		"todos",
		[] as Todo[],
	);

	const handleAddTodo = (task: string, note: string) => {
		const newTodos = [
			{
				id: Date.now().toString(),
				task,
				note,
				completed: false,
			},
			...todos,
		];
		setTodos(newTodos);
	};

	const toggleTodo = (id: string) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo,
			),
		);
	};

	const deleteTodo = (id: string) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	const activeTodos = todos.filter((todo) => !todo.completed);
	const completedTodos = todos.filter((todo) => todo.completed);

	const handleSaveEdit = (id: string, text: string, note: string) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, text: text, note: note } : todo,
			),
		);
	};

	return (
		<div className="container">
			<div className="date-display">{getCurrentDate()}</div>

			<ul className="todo-list">
				<li className="todo-list-item">
					<TodoAddCard onAdd={handleAddTodo} />
				</li>
				{activeTodos.map((todo) => (
					<li key={todo.id} className="todo-list-item">
						<TodoCard
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
								<TodoCard
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
