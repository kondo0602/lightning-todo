import { TodoAddCard } from "./components/todo-add-card/todo-add-card";
import { TodoCard } from "./components/todo-card/todo-card";
import { TodoDateDisplay } from "./components/todo-date-display/todo-date-display";
import { useTodoList } from "./use-todo-list";
import "./App.css";

function App() {
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
			<TodoDateDisplay />

			<ul className="todo-list">
				<li>
					<TodoAddCard onAdd={addTodo} />
				</li>
				{activeTodos.map((todo) => (
					<li key={todo.id}>
						<TodoCard
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
