import type { Todo } from "../../types/todo";

type GetMinOrder = (todos: Todo[]) => string | null;

export const getMinOrder: GetMinOrder = (todos: Todo[]) => {
	return todos.reduce((min, todo) => {
		return todo.order < min.order ? todo : min;
	}, todos[0]).order;
};
