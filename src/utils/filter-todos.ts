import { Temporal } from "temporal-polyfill";
import type { Todo } from "../use-todo-list";

/**
 * 完了してから2日以上経過したTodoを除外するフィルタリング関数
 */
export const filterExpiredCompletedTodos = (todos: Todo[]): Todo[] => {
	return todos.filter((todo) => {
		if (!todo.completed || todo.completedAt === null) return true;

		const duration = Temporal.Now.plainDateISO().since(todo.completedAt);
		return duration.days <= 1;
	});
};
