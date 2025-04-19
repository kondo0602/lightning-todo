import { Temporal } from "temporal-polyfill";
import { describe, expect, it, vi } from "vitest";
import type { Todo } from "../../types/todo";
import { filterExpiredCompletedTodos } from "./filter-todos";

describe("filterExpiredCompletedTodos", () => {
	vi.spyOn(Temporal.Now, "plainDateISO").mockImplementation(() => {
		return Temporal.PlainDate.from({ year: 2025, month: 4, day: 1 });
	});

	const defaultTodo: Todo = {
		id: "1",
		task: "タスク",
		startAt: Temporal.Now.plainDateISO().toString(),
		completed: false,
		completedAt: null,
		order: 0,
	};

	it("本日以前の日付に開始 かつ 未完了のタスクはフィルタリングされないこと", () => {
		const todos: Todo[] = [
			{
				...defaultTodo,
				startAt: Temporal.PlainDate.from({
					year: 2025,
					month: 3,
					day: 31,
				}).toString(),
			},
			{
				...defaultTodo,
				startAt: Temporal.PlainDate.from({
					year: 2025,
					month: 4,
					day: 1,
				}).toString(),
			},
		];

		const result = filterExpiredCompletedTodos(todos);

		expect(result.length).toEqual(todos.length);
	});

	it("本日以前の日付に開始 かつ 本日完了したタスクはフィルタリングされないこと", () => {
		const todos: Todo[] = [
			{
				...defaultTodo,
				startAt: Temporal.PlainDate.from({
					year: 2025,
					month: 3,
					day: 31,
				}).toString(),
				completed: true,
				completedAt: Temporal.Now.plainDateISO().toString(),
			},
			{
				...defaultTodo,
				startAt: Temporal.PlainDate.from({
					year: 2025,
					month: 4,
					day: 1,
				}).toString(),
				completed: true,
				completedAt: Temporal.Now.plainDateISO().toString(),
			},
		];

		const result = filterExpiredCompletedTodos(todos);

		expect(result.length).toEqual(todos.length);
	});

	it("本日以降の日付に開始するタスクはフィルタリングされること", () => {
		const todos: Todo[] = [
			{
				...defaultTodo,
				startAt: Temporal.PlainDate.from({
					year: 2025,
					month: 4,
					day: 2,
				}).toString(),
			},
		];

		const result = filterExpiredCompletedTodos(todos);

		expect(result.length).toEqual(0);
	});

	it("本日以前の日付に完了したタスクはフィルタリングされること", () => {
		const todos: Todo[] = [
			{
				...defaultTodo,
				startAt: Temporal.PlainDate.from({
					year: 2025,
					month: 3,
					day: 31,
				}).toString(),
				completed: true,
				completedAt: Temporal.PlainDate.from({
					year: 2025,
					month: 3,
					day: 31,
				}).toString(),
			},
		];

		const result = filterExpiredCompletedTodos(todos);

		expect(result.length).toEqual(0);
	});
});
