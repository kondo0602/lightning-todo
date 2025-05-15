import { generateKeyBetween } from "fractional-indexing";
import { v4 as uuidv4 } from "uuid";

import { useStore } from "../use-store/use-store";
import { generateNewOrder } from "./generate-new-order";
import { getCompleteTodos } from "./get-complete-todos";
import { getIncompleteTodos } from "./get-incomplete-todos";
import { getMinOrder } from "./get-min-order";

import type { Temporal } from "temporal-polyfill";
import type { Todo } from "../../types/todo";

type Props = {
	date: Temporal.PlainDate;
};

export const useTodoList = ({ date }: Props) => {
	const [state, setState] = useStore<Todo[]>("todos", []);

	const addTodo = (task: string) => {
		const minOrderTodo = state.length > 0 ? getMinOrder(state) : null;

		setState([
			{
				id: uuidv4(),
				task,
				order: generateKeyBetween(null, minOrderTodo),
				startAt: date,
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
							completedAt: date,
						}
					: todo,
			),
		);
	};

	const unCompleteTodo = (id: string) => {
		setState(
			state.map((todo) =>
				todo.id === id
					? {
							...todo,
							startedAt: date,
							completed: false,
							completedAt: null,
						}
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
		const newOrder = generateNewOrder({
			todos: getIncompleteTodos({ todos: state, date }),
			activeId,
			overId,
		});

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
							startAt: date.add({ days: 1 }),
						}
					: todo,
			),
		);
	};

	return {
		incompleteTodos: getIncompleteTodos({ todos: state, date }),
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
