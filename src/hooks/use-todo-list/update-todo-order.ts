import { generateKeyBetween } from "fractional-indexing";

import type { Todo } from "../../types/todo";

type GenerateNewOrder = (
	activeTodoOrder: string,
	overTodoOrder: string,
	todos: Todo[],
) => string | null;

export const generateNewOrder: GenerateNewOrder = (
	activeTodoOrder,
	overTodoOrder,
	todos,
) => {
	// activeTodoを上から下に移動した場合
	if (activeTodoOrder < overTodoOrder) {
		const overIndex = todos.findIndex((todo) => todo.order === overTodoOrder);
		const nextTodo =
			todos[overIndex + 1] === undefined ? null : todos[overIndex + 1];

		return generateKeyBetween(overTodoOrder, nextTodo?.order);
	}

	// activeTodoを下から上に移動した場合
	if (activeTodoOrder > overTodoOrder) {
		const overIndex = todos.findIndex((todo) => todo.order === overTodoOrder);
		const prevTodo =
			todos[overIndex - 1] === undefined ? null : todos[overIndex - 1];

		return generateKeyBetween(prevTodo?.order, overTodoOrder);
	}

	return null;
};
