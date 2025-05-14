import { Temporal } from "temporal-polyfill";
import type { Todo } from "../../types/todo";

type GetCompleteTodos = (props: {
	todos: Todo[];
	date: Temporal.PlainDate;
}) => Todo[];

export const getCompleteTodos: GetCompleteTodos = ({ todos, date }) => {
	return todos
		.filter(
			(todo) =>
				todo.completedAt &&
				Temporal.PlainDate.compare(
					Temporal.PlainDate.from(todo.completedAt),
					date,
				) === 0,
		)
		.filter((todo) => todo.completed)
		.sort((a, b) => (a.order < b.order ? -1 : a.order > b.order ? 1 : 0));
};
