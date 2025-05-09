import { Temporal } from "temporal-polyfill";

import type { Todo } from "../../types/todo";

type GetTodayTodos = (props: {
	todos: Todo[];
	date: Temporal.PlainDate;
}) => Todo[];

export const getTodayTodos: GetTodayTodos = ({ todos, date }) => {
	return todos
		.filter((todo) => !todo.completed)
		.filter(
			(todo) =>
				Temporal.PlainDate.compare(
					Temporal.PlainDate.from(todo.startAt),
					date,
				) === 0,
		)
		.sort((a, b) => (a.order < b.order ? -1 : a.order > b.order ? 1 : 0));
};
