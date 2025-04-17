import { Temporal } from "temporal-polyfill";
import { v4 as uuidv4 } from "uuid";
import { useSyncLocalStorage } from "./hooks/use-sync-local-storage";
import { filterExpiredCompletedTodos } from "./utils/filter-todos";

export type Todo = {
	id: string;
	task: string;
	startAt: Temporal.PlainDate;
	completed: boolean;
	completedAt: Temporal.PlainDate | null;
};

export const useTodoList = () => {
	const onInitialize = () => {
		const filteredTodos = filterExpiredCompletedTodos(todos);
		setTodos(filteredTodos);
	};

	const { storedValue: todos, setStoredValue: setTodos } = useSyncLocalStorage(
		"todos",
		[] as Todo[],
		onInitialize,
	);

	const addTodo = (task: string) => {
		const newTodos = [
			{
				id: uuidv4(),
				task,
				startAt: Temporal.Now.plainDateISO(),
				completed: false,
				completedAt: null,
			},
			...todos,
		];
		setTodos(newTodos);
	};

	const deleteTodo = (id: string) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	const unCompleteTodo = (id: string) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, completed: false } : todo,
			),
		);
	};

	const completeTodo = (id: string) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id
					? {
							...todo,
							completed: true,
							completedAt: Temporal.Now.plainDateISO(),
						}
					: todo,
			),
		);
	};

	const postponeTodo = (id: string) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id
					? { ...todo, startAt: Temporal.Now.plainDateISO() }
					: todo,
			),
		);
	};

	const saveTodo = (id: string, text: string, note: string) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, text: text, note: note } : todo,
			),
		);
	};

	const activeTodos = todos.filter((todo) => !todo.completed);

	const completedTodos = todos.filter((todo) => todo.completed);

	return {
		addTodo,
		deleteTodo,
		unCompleteTodo,
		completeTodo,
		postponeTodo,
		saveTodo,
		activeTodos,
		completedTodos,
	};
};
