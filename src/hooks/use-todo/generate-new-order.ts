import { generateKeyBetween } from "fractional-indexing";

import type { Todo } from "../../types/todo";

type GenerateNewOrderParams = {
	todos: Todo[];
	// 移動させたTODOのID
	activeId: string;
	// 移動によって飛び越されたTODOのID
	overId: string;
};

type GenerateNewOrder = (params: GenerateNewOrderParams) => string | null;

export const generateNewOrder: GenerateNewOrder = ({
	todos,
	activeId,
	overId,
}) => {
	if (activeId === overId) return null;

	const activeTodoOrder = todos.find((todo) => todo.id === activeId)?.order;
	const overTodoOrder = todos.find((todo) => todo.id === overId)?.order;
	if (activeTodoOrder === undefined || overTodoOrder === undefined) return null;

	// activeTodoを上から下に移動した場合
	if (activeTodoOrder < overTodoOrder) {
		const overTodoIndex = todos.findIndex((t) => t.order === overTodoOrder);
		const nextTodo =
			todos[overTodoIndex + 1] === undefined ? null : todos[overTodoIndex + 1];

		return generateKeyBetween(overTodoOrder, nextTodo?.order);
	}

	// activeTodoを下から上に移動した場合
	if (activeTodoOrder > overTodoOrder) {
		const overTodoIndex = todos.findIndex((t) => t.order === overTodoOrder);
		const prevTodo =
			todos[overTodoIndex - 1] === undefined ? null : todos[overTodoIndex - 1];

		return generateKeyBetween(prevTodo?.order, overTodoOrder);
	}

	return null;
};
