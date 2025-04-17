import { Temporal } from "temporal-polyfill";
import { describe, expect, it, vi } from "vitest";
import type { Todo } from "../use-todo-list";
import { filterExpiredCompletedTodos } from "./filter-todos";

describe("filterExpiredCompletedTodos", () => {
	vi.spyOn(Temporal.Now, "plainDateISO").mockImplementation(() => {
		return Temporal.PlainDate.from({ year: 2025, month: 4, day: 1 });
	});

	const defaultTodo: Todo = {
		id: "1",
		task: "タスク",
		startAt: Temporal.Now.plainDateISO(),
		completed: false,
		completedAt: null,
	};

	it("本日以前の日付に開始 かつ 未完了のタスクはフィルタリングされないこと", () => {
		const todos: Todo[] = [
			{
				...defaultTodo,
				startAt: Temporal.PlainDate.from({ year: 2025, month: 3, day: 31 }),
			},
			{
				...defaultTodo,
				startAt: Temporal.PlainDate.from({ year: 2025, month: 4, day: 1 }),
			},
		];

		const result = filterExpiredCompletedTodos(todos);

		expect(result.length).toEqual(todos.length);
	});

	it("本日以前の日付に開始 かつ 本日完了したタスクはフィルタリングされないこと", () => {
		const todos: Todo[] = [
			{
				...defaultTodo,
				startAt: Temporal.PlainDate.from({ year: 2025, month: 3, day: 31 }),
				completed: true,
				completedAt: Temporal.Now.plainDateISO(),
			},
			{
				...defaultTodo,
				startAt: Temporal.PlainDate.from({ year: 2025, month: 4, day: 1 }),
				completed: true,
				completedAt: Temporal.Now.plainDateISO(),
			},
		];

		const result = filterExpiredCompletedTodos(todos);

		expect(result.length).toEqual(todos.length);
	});

	it("本日以降の日付に開始するタスクはフィルタリングされること", () => {
		const todos: Todo[] = [
			{
				...defaultTodo,
				startAt: Temporal.PlainDate.from({ year: 2025, month: 4, day: 2 }),
			},
		];

		const result = filterExpiredCompletedTodos(todos);

		expect(result.length).toEqual(0);
	});

	it("本日以前の日付に完了したタスクはフィルタリングされること", () => {
		const todos: Todo[] = [
			{
				...defaultTodo,
				startAt: Temporal.PlainDate.from({ year: 2025, month: 3, day: 31 }),
				completed: true,
				completedAt: Temporal.PlainDate.from({ year: 2025, month: 3, day: 31 }),
			},
		];

		const result = filterExpiredCompletedTodos(todos);

		expect(result.length).toEqual(0);
	});
});
