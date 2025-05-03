import { Temporal } from "temporal-polyfill";

import type { Todo } from "../../types/todo";

type GetTodayTodos = (todos: Todo[]) => Todo[];

export const getTodayTodos: GetTodayTodos = (todos) => {
	return todos
		.filter((todo) => !todo.completed)
		.filter(
			(todo) =>
				Temporal.PlainDate.compare(
					Temporal.PlainDate.from(todo.startAt),
					Temporal.Now.plainDateISO(),
				) <= 0,
		)
		.sort((a, b) => (a.order < b.order ? -1 : a.order > b.order ? 1 : 0));
};
