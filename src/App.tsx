import { useState, useEffect } from "react";
import "./App.css";
import { TodoListItemCard } from "./components/todo-list-item-card/todo-list-item-card";
import { TodoAddCard } from "./components/todo-add-card/todo-add-card";

interface Todo {
	id: number;
	text: string;
	completed: boolean;
	note: string;
}

function App() {
	const getCurrentDate = () => {
		const now = new Date();
		const month = now.getMonth() + 1;
		const date = now.getDate();
		const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
		const day = dayNames[now.getDay()];
		return `${month}/${date} ${day}`;
	};

	const [todos, setTodos] = useState<Todo[]>([]);

	// 初回マウント時にストレージからデータを読み込む
	useEffect(() => {
		const loadTodos = async () => {
			const result = await chrome.storage.local.get(["todos"]);
			setTodos(result.todos || []);
		};
		loadTodos();
	}, []);

	// todosが更新されたらストレージに保存
	useEffect(() => {
		if (todos.length > 0) {
			chrome.storage.local.set({ todos });
		}
	}, [todos]);

	const handleAddTodo = (text: string, note: string) => {
		const newTodos = [
			{
				id: Date.now(),
				text,
				note,
				completed: false,
			},
			...todos,
		];
		setTodos(newTodos);
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
			<div className="date-display">{getCurrentDate()}</div>

			<ul className="todo-list">
				<li className="todo-list-item">
					<TodoAddCard onAdd={handleAddTodo} />
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
