import { TodoAddCard } from "./components/todo-add-card/todo-add-card";
import { TodoCard } from "./components/todo-card/todo-card";
import { useTodoList } from "./use-todo-list";
import "./App.css";
import { Temporal } from "temporal-polyfill";

function App() {
	const now = Temporal.Now.plainDateISO();

	const weekday = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	const month = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

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
			<div className="date-display">
				<h1 className="date-display-day">{now.day.toString()}</h1>
				<span className="date-display-weekday">{weekday[now.dayOfWeek]}</span>
				<span className="date-display-month-year">
					{`${month[now.month - 1]}, ${now.year.toString()}`}
				</span>
			</div>

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
