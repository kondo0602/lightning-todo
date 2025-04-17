import { Temporal } from "temporal-polyfill";
import { describe, expect, it, vi } from "vitest";
import type { Todo } from "../use-todo-list";
import { filterExpiredCompletedTodos } from "./filter-todos";

describe("filterExpiredCompletedTodos", () => {
	// モックで現在日時を固定
	const mockNow = new Date("2023-01-10T12:00:00Z");
	vi.spyOn(Temporal.Now, "plainDateISO").mockImplementation(() => {
		return Temporal.PlainDate.from({ year: 2023, month: 1, day: 10 });
	});

	it("未完了のタスクはフィルタリングされないこと", () => {
		const todos: Todo[] = [
			{
				id: "1",
				task: "未完了タスク",
				startAt: Temporal.Now.plainDateISO(),
				completed: false,
				completedAt: null,
			},
		];

		const result = filterExpiredCompletedTodos(todos);

		expect(result.length).toEqual(todos.length);
	});

	it("完了日付が本日のタスクはフィルタリングされないこと", () => {
		const todos: Todo[] = [
			{
				id: "1",
				task: "本日完了したタスク",
				startAt: Temporal.Now.plainDateISO(),
				completed: true,
				completedAt: Temporal.Now.plainDateISO(),
			},
		];

		const result = filterExpiredCompletedTodos(todos);

		expect(result.length).toEqual(todos.length);
	});

	it("完了日付が本日より前のタスクはフィルタリングされること", () => {
		const todos: Todo[] = [
			{
				id: "3",
				task: "古い完了タスク",
				startAt: Temporal.PlainDate.from({ year: 2023, month: 1, day: 1 }),
				completed: true,
				completedAt: Temporal.PlainDate.from({ year: 2023, month: 1, day: 7 }),
			},
		];

		const result = filterExpiredCompletedTodos(todos);

		expect(result.length).toEqual(0);
	});
});
