import { Temporal } from "temporal-polyfill";

import type { Todo } from "../../types/todo";

type DeleteOldCompletedTodosParams = {
	todos: Todo[];
};

type DeleteOldCompletedTodos = (
	params: DeleteOldCompletedTodosParams,
) => Todo[];

export const deleteOldCompletedTodos: DeleteOldCompletedTodos = ({ todos }) => {
	const today = Temporal.Now.plainDateISO();
	return todos.filter((todo) => {
		if (!todo.completed) return true;
		if (todo.completedAt) {
			return (
				Temporal.PlainDate.compare(
					Temporal.PlainDate.from(todo.completedAt),
					today,
				) >= 0
			);
		}
		return true;
	});
};
