import { generateKeyBetween } from "fractional-indexing";
import { Temporal } from "temporal-polyfill";
import { v4 as uuidv4 } from "uuid";

import { useStore } from "../use-store/use-store";
import { getMinOrder } from "./get-min-order";

import type { Todo } from "../../types/todo";
import { getCompleteTodos } from "./get-complete-todos";
import { getTodayTodos } from "./get-today-todos";
import { generateNewOrder } from "./update-todo-order";

type Props = {
	date: Temporal.PlainDate;
};

export const useTodoList = ({ date }: Props) => {
	const { state, setState } = useStore<Todo[]>("todos", []);

	const addTodo = (task: string) => {
		const minOrderTodo = state.length > 0 ? getMinOrder(state) : null;

		setState([
			{
				id: uuidv4(),
				task,
				order: generateKeyBetween(null, minOrderTodo),
				startAt: Temporal.Now.plainDateISO(),
				completed: false,
				completedAt: null,
			},
			...state,
		]);
	};

	const deleteTodo = (id: string) => {
		setState(state.filter((todo) => todo.id !== id));
	};

	const completeTodo = (id: string) => {
		setState(
			state.map((todo) =>
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
		setState(
			state.map((todo) =>
				todo.id === id
					? { ...todo, completed: false, completedAt: null }
					: todo,
			),
		);
	};

	const updateTodoTask = (id: string, text: string) => {
		setState(
			state.map((todo) => (todo.id === id ? { ...todo, task: text } : todo)),
		);
	};

	const updateTodoOrder = (activeId: string, overId: string) => {
		const activeTodoOrder = state.find((todo) => todo.id === activeId)?.order;
		const overTodoOrder = state.find((todo) => todo.id === overId)?.order;

		if (activeTodoOrder === undefined || overTodoOrder === undefined) return;
		if (activeTodoOrder === overTodoOrder) return;

		const newOrder = generateNewOrder(
			activeTodoOrder,
			overTodoOrder,
			getTodayTodos({ todos: state, date }),
		);

		if (!newOrder) return;

		setState(
			state.map((todo) =>
				todo.id === activeId ? { ...todo, order: newOrder } : todo,
			),
		);
	};

	const postponeTodo = (id: string) => {
		setState(
			state.map((todo) =>
				todo.id === id
					? {
							...todo,
							startAt: todo.startAt.add({ days: 1 }),
						}
					: todo,
			),
		);
	};

	return {
		todayTodos: getTodayTodos({ todos: state, date }),
		completedTodos: getCompleteTodos({ todos: state, date }),
		addTodo,
		deleteTodo,
		completeTodo,
		unCompleteTodo,
		updateTodoTask,
		updateTodoOrder,
		postponeTodo,
	};
};
