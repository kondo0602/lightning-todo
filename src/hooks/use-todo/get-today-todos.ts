import { Temporal } from "temporal-polyfill";

import type { Todo } from "../../types/todo";

type GetTodayTodos = (props: {
	todos: Todo[];
	date: Temporal.PlainDate;
}) => Todo[];

export const getTodayTodos: GetTodayTodos = ({ todos, date }) => {
	const today = Temporal.Now.plainDateISO();
	const isToday = Temporal.PlainDate.compare(date, today) === 0;

	return todos
		.filter((todo) => !todo.completed)
		.filter((todo) => {
			const todoDate = Temporal.PlainDate.from(todo.startAt);
			if (isToday) {
				return Temporal.PlainDate.compare(todoDate, date) <= 0;
			}
			return Temporal.PlainDate.compare(todoDate, date) === 0;
		})
		.sort((a, b) => (a.order < b.order ? -1 : a.order > b.order ? 1 : 0));
};
