import { Temporal } from "temporal-polyfill";
import type { Todo } from "../../types/todo";

export const filterExpiredCompletedTodos = (todos: Todo[]): Todo[] => {
	const today = Temporal.Now.plainDateISO();

	return todos.filter((todo) => {
		if (Temporal.PlainDate.compare(todo.startAt, today) > 0) return false;

		return true;
	});
};
