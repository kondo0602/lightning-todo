import { useState } from "react";
import { Temporal } from "temporal-polyfill";
import { v4 as uuidv4 } from "uuid";
import { useSyncLocalStorage } from "../use-sync-local-storage/use-sync-local-storage";

import { generateKeyBetween } from "fractional-indexing";
import type { Todo } from "../../types/todo";
import { filterTodosDueOnOrBeforeToday } from "./filter-todos";

const isDev = () => {
	return import.meta.env.MODE === "development";
};

// 開発環境用
const useDevState = <T>(initialValue: T) => {
	const [state, setState] = useState<T>(initialValue);
	return { storedValue: state, setStoredValue: setState };
};

export const useTodoList = () => {
	const initialize = () => {
		const filteredTodos = filterTodosDueOnOrBeforeToday(storedValue);
		setStoredValue(filteredTodos);
	};

	// 開発環境と本番環境で使うフックを切り替え
	const { storedValue, setStoredValue } = isDev()
		? useDevState<Todo[]>([])
		: useSyncLocalStorage("todos", [] as Todo[], initialize);

	const addTodo = (task: string) => {
		const minOrderTodo = storedValue.reduce((min, todo) => {
			return todo.order < min.order ? todo : min;
		}, storedValue[0]);

		const newTodos = [
			{
				id: uuidv4(),
				task,
				startAt: Temporal.Now.plainDateISO().toString(),
				completed: false,
				completedAt: null,
				order:
					storedValue.length > 0
						? generateKeyBetween(null, minOrderTodo.order)
						: generateKeyBetween(null, null),
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

	const updateTodoOrder = (activeId: string, overId: string) => {
		const activeTodo = storedValue.find((todo) => todo.id === activeId);
		const overTodo = storedValue.find((todo) => todo.id === overId);
		if (!activeTodo || !overTodo) return;

		if (activeTodo.order === overTodo.order) return;

		let newOrder: string | null = null;

		if (activeTodo.order < overTodo.order) {
			// activeTodoを上から下に移動した場合
			// 対象のTODOを上から下に移動した場合は、対象のTODOの前後のTODOのorderを取得して、その間に新しいorderを生成する
			const overIndex = activeTodos.findIndex((todo) => todo.id === overId);
			const nextTodo =
				activeTodos[overIndex + 1] === undefined
					? null
					: activeTodos[overIndex + 1];

			newOrder = generateKeyBetween(overTodo.order, nextTodo?.order);
		} else {
			// activeTodoを下から上に移動した場合
			// 対象のTODOを下から上に移動した場合は、対象のTODOの前後のTODOのorderを取得して、その間に新しいorderを生成する
			const overIndex = activeTodos.findIndex((todo) => todo.id === overId);
			// TODO: もっといい判定方法ありそう
			const prevTodo =
				activeTodos[overIndex - 1] === undefined
					? null
					: activeTodos[overIndex - 1];

			newOrder = generateKeyBetween(prevTodo?.order, overTodo.order);
		}

		setStoredValue(
			storedValue.map((todo) =>
				todo.id === activeId ? { ...todo, order: newOrder } : todo,
			),
		);
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
		.sort((a, b) => (a.order < b.order ? -1 : a.order > b.order ? 1 : 0));

	const completedTodos = storedValue
		.filter((todo) => todo.completed)
		.sort((a, b) => (a.order < b.order ? -1 : a.order > b.order ? 1 : 0));

	return {
		addTodo,
		deleteTodo,
		completeTodo,
		unCompleteTodo,
		postponeTodo,
		saveTodo,
		updateTodoOrder,
		activeTodos,
		completedTodos,
	};
};
