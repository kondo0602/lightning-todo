import { TodoAddCard } from "./components/todo-add-card/todo-add-card";
import { TodoCard } from "./components/todo-card/todo-card";
import { useTodoList } from "./use-todo-list";
import "./App.css";

function App() {
	const getCurrentDate = () => {
		const now = new Date();
		const month = now.getMonth() + 1;
		const date = now.getDate();
		const dayNames = [
			"（日）",
			"（月）",
			"（火）",
			"（水）",
			"（木）",
			"（金）",
			"（土）",
		];
		const day = dayNames[now.getDay()];
		return `${month} / ${date} ${day}`;
	};

	const {
		addTodo,
		deleteTodo,
		unCompleteTodo,
		completeTodo,
		postponeTodo,
		activeTodos,
		completedTodos,
		saveTodo,
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
							onPostpone={postponeTodo}
							onDelete={deleteTodo}
							onSave={saveTodo}
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
									onPostpone={postponeTodo}
									onDelete={deleteTodo}
									onSave={saveTodo}
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
