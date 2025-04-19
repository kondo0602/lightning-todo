import { Temporal } from "temporal-polyfill";
import type { Todo } from "../../types/todo";

export const filterTodosDueOnOrBeforeToday = (todos: Todo[]): Todo[] => {
	const today = Temporal.Now.plainDateISO();

	return todos.filter((todo) => {
		return Temporal.PlainDate.compare(todo.startAt, today) <= 0;
	});
};
