import type { Todo } from "../../types/todo";

type GetCompleteTodos = (todos: Todo[]) => Todo[];

export const getCompleteTodos: GetCompleteTodos = (todos) => {
	return todos
		.filter((todo) => todo.completed)
		.sort((a, b) => (a.order < b.order ? -1 : a.order > b.order ? 1 : 0));
};
