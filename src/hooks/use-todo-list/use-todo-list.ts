import { generateKeyBetween } from "fractional-indexing";
import { Temporal } from "temporal-polyfill";
import { v4 as uuidv4 } from "uuid";

import { useStore } from "../use-store/use-store";
import { getMinOrder } from "./get-min-order";

import type { Todo } from "../../types/todo";
import { getCompleteTodos } from "./get-complete-todos";
import { getTodayTodos } from "./get-today-todos";
import { generateNewOrder } from "./update-todo-order";

export const useTodoList = () => {
	const { storedValue, setStoredValue } = useStore<Todo[]>("todos", []);

	const addTodo = (task: string) => {
		const minOrderTodo =
			storedValue.length > 0 ? getMinOrder(storedValue) : null;

		setStoredValue([
			{
				id: uuidv4(),
				task,
				order: generateKeyBetween(null, minOrderTodo),
				startAt: Temporal.Now.plainDateISO().toString(),
				completed: false,
				completedAt: null,
			},
			...storedValue,
		]);
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

	const updateTodoTask = (id: string, text: string) => {
		setStoredValue(
			storedValue.map((todo) =>
				todo.id === id ? { ...todo, task: text } : todo,
			),
		);
	};

	const updateTodoOrder = (activeId: string, overId: string) => {
		const activeTodoOrder = storedValue.find(
			(todo) => todo.id === activeId,
		)?.order;
		const overTodoOrder = storedValue.find((todo) => todo.id === overId)?.order;

		if (activeTodoOrder === undefined || overTodoOrder === undefined) return;
		if (activeTodoOrder === overTodoOrder) return;

		const newOrder = generateNewOrder(
			activeTodoOrder,
			overTodoOrder,
			getTodayTodos(storedValue),
		);

		if (!newOrder) return;

		setStoredValue(
			storedValue.map((todo) =>
				todo.id === activeId ? { ...todo, order: newOrder } : todo,
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

	return {
		todayTodos: getTodayTodos(storedValue),
		completedTodos: getCompleteTodos(storedValue),
		addTodo,
		deleteTodo,
		completeTodo,
		unCompleteTodo,
		updateTodoTask,
		updateTodoOrder,
		postponeTodo,
	};
};
