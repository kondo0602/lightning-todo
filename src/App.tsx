import { TodoAddCard } from "./components/todo-add-card/todo-add-card";
import { TodoCard } from "./components/todo-card/todo-card";
import { useTodoList } from "./use-todo-list";
import "./App.css";

function App() {
	const getCurrentDate = () => {
		const now = new Date();
		const month = now.getMonth() + 1;
		const date = now.getDate();
		const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
		const day = dayNames[now.getDay()];
		return `${month}/${date} ${day}`;
	};

	const {
		addTodo,
		unCompleteTodo,
		completeTodo,
		deleteTodo,
		activeTodos,
		completedTodos,
		handleSaveEdit,
	} = useTodoList();

	return (
		<div className="container">
			<div className="date-display">{getCurrentDate()}</div>

			<ul className="todo-list">
				<li className="todo-list-item">
					<TodoAddCard onAdd={addTodo} />
				</li>
				{activeTodos.map((todo) => (
					<li key={todo.id} className="todo-list-item">
						<TodoCard
							key={todo.id}
							todo={todo}
							onToggle={completeTodo}
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
									onToggle={unCompleteTodo}
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
