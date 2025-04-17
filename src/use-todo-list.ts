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
		const filteredTodos = filterExpiredCompletedTodos(storedValue);
		setStoredValue(filteredTodos);
	};

	const { storedValue, setStoredValue } = useSyncLocalStorage(
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
			...storedValue,
		];
		setStoredValue(newTodos);
	};

	const deleteTodo = (id: string) => {
		setStoredValue(storedValue.filter((todo) => todo.id !== id));
	};

	const completeTodo = (id: string) => {
		setStoredValue(
			storedValue.map((todo) =>
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

	const unCompleteTodo = (id: string) => {
		setStoredValue(
			storedValue.map((todo) =>
				todo.id === id ? { ...todo, completed: false } : todo,
			),
		);
	};

	const postponeTodo = (id: string) => {
		setStoredValue(
			storedValue.map((todo) =>
				todo.id === id
					? {
							...todo,
							startAt: Temporal.Now.plainDateISO().add({ days: 1 }),
						}
					: todo,
			),
		);
	};

	const saveTodo = (id: string, text: string, note: string) => {
		setStoredValue(
			storedValue.map((todo) =>
				todo.id === id ? { ...todo, text: text, note: note } : todo,
			),
		);
	};

	const activeTodos = storedValue.filter((todo) => !todo.completed);

	const completedTodos = storedValue.filter((todo) => todo.completed);

	return {
		addTodo,
		deleteTodo,
		completeTodo,
		unCompleteTodo,
		postponeTodo,
		saveTodo,
		activeTodos,
		completedTodos,
	};
};
