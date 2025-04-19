import { Temporal } from "temporal-polyfill";
import { v4 as uuidv4 } from "uuid";
import { useSyncLocalStorage } from "./hooks/use-sync-local-storage";
import { filterExpiredCompletedTodos } from "./utils/filter-todos";

export type Todo = {
	id: string;
	task: string;
	startAt: string;
	completed: boolean;
	completedAt: string | null;
	order: number;
};

export const useTodoList = () => {
	const deleteExpiredCompletedTodos = () => {
		const filteredTodos = filterExpiredCompletedTodos(storedValue);
		setStoredValue(filteredTodos);
	};

	const { storedValue, setStoredValue } = useSyncLocalStorage(
		"todos",
		[] as Todo[],
		deleteExpiredCompletedTodos,
	);

	const addTodo = (task: string) => {
		const minOrder =
			storedValue.length > 0
				? Math.min(...storedValue.map((todo) => todo.order)) - 1
				: 0;

		const newTodos = [
			{
				id: uuidv4(),
				task,
				startAt: Temporal.Now.plainDateISO().toString(),
				completed: false,
				completedAt: null,
				order: minOrder,
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
							completedAt: Temporal.Now.plainDateISO().toString(),
						}
					: todo,
			),
		);
	};

	const unCompleteTodo = (id: string) => {
		setStoredValue(
			storedValue.map((todo) =>
				todo.id === id
					? { ...todo, completed: false, completedAt: null }
					: todo,
			),
		);
	};

	const postponeTodo = (id: string) => {
		setStoredValue(
			storedValue.map((todo) =>
				todo.id === id
					? {
							...todo,
							startAt: Temporal.Now.plainDateISO().add({ days: 1 }).toString(),
						}
					: todo,
			),
		);
	};

	const saveTodo = (id: string, text: string) => {
		setStoredValue(
			storedValue.map((todo) =>
				todo.id === id ? { ...todo, task: text } : todo,
			),
		);
	};

	const reorderTodos = (activeId: string, overId: string) => {
		setStoredValue((prevTodos) => {
			const activeTodo = prevTodos.find((todo) => todo.id === activeId);
			const overTodo = prevTodos.find((todo) => todo.id === overId);

			if (!activeTodo || !overTodo) return prevTodos;

			const oldOrder = activeTodo.order;
			const newOrder = overTodo.order;

			return prevTodos.map((todo) => {
				if (todo.id === activeId) {
					return { ...todo, order: newOrder };
				}

				if (
					oldOrder < newOrder &&
					todo.order > oldOrder &&
					todo.order <= newOrder
				) {
					return { ...todo, order: todo.order - 1 };
				}

				if (
					oldOrder > newOrder &&
					todo.order < oldOrder &&
					todo.order >= newOrder
				) {
					return { ...todo, order: todo.order + 1 };
				}

				return todo;
			});
		});
	};

	const activeTodos = storedValue
		.filter((todo) => !todo.completed)
		.filter(
			(todo) =>
				Temporal.PlainDate.compare(
					Temporal.PlainDate.from(todo.startAt),
					Temporal.Now.plainDateISO(),
				) <= 0,
		)
		.sort((a, b) => a.order - b.order);

	const completedTodos = storedValue
		.filter((todo) => todo.completed)
		.sort((a, b) => a.order - b.order);

	return {
		addTodo,
		deleteTodo,
		completeTodo,
		unCompleteTodo,
		postponeTodo,
		saveTodo,
		reorderTodos,
		activeTodos,
		completedTodos,
	};
};
