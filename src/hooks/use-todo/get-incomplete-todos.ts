import { Temporal } from "temporal-polyfill";

import type { Todo } from "../../types/todo";

type GetIncompleteTodos = (props: {
	todos: Todo[];
	date: Temporal.PlainDate;
}) => Todo[];

export const getIncompleteTodos: GetIncompleteTodos = ({ todos, date }) => {
	const today = Temporal.Now.plainDateISO();
	const isToday = Temporal.PlainDate.compare(date, today) === 0;

	return todos
		.filter((todo) => {
			const todoDate = Temporal.PlainDate.from(todo.startAt);
			if (isToday) {
				return Temporal.PlainDate.compare(todoDate, date) <= 0;
			}
			return Temporal.PlainDate.compare(todoDate, date) === 0;
		})
		.filter((todo) => !todo.completed)
		.sort((a, b) => (a.order < b.order ? -1 : a.order > b.order ? 1 : 0));
};
