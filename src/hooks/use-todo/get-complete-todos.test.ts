import { Temporal } from "temporal-polyfill";
import { describe, expect, it } from "vitest";

import type { Todo } from "../../types/todo";
import { getCompleteTodos } from "./get-complete-todos";

describe("getCompleteTodos", () => {
	const yesterday = Temporal.Now.plainDateISO().subtract({ days: 1 });
	const today = Temporal.Now.plainDateISO();
	const tomorrow = Temporal.Now.plainDateISO().add({ days: 1 });

	const defaultInput: Todo[] = [
		{
			id: "1",
			task: "昨日の未完了のタスク",
			order: "1",
			startAt: yesterday,
			completed: false,
			completedAt: null,
		},
		{
			id: "2",
			task: "昨日の完了済のタスク",
			order: "2",
			startAt: yesterday,
			completed: true,
			completedAt: yesterday,
		},
		{
			id: "3",
			task: "今日の未完了のタスク",
			order: "3",
			startAt: today,
			completed: false,
			completedAt: null,
		},
		{
			id: "4",
			task: "今日の完了済みのタスク",
			order: "4",
			startAt: today,
			completed: true,
			completedAt: today,
		},
		{
			id: "5",
			task: "明日の未完了のタスク",
			order: "5",
			startAt: tomorrow,
			completed: false,
			completedAt: null,
		},
		{
			id: "6",
			task: "明日の完了済みのタスク",
			order: "6",
			startAt: tomorrow,
			completed: true,
			completedAt: tomorrow,
		},
	];

	it("dateが本日日付の場合、本日の完了済みのタスクがorder順に返ること", () => {
		const result = getCompleteTodos({ todos: defaultInput, date: today });

		expect(result).toHaveLength(1);
		expect(result.map((todo) => todo.task)).toEqual(["今日の完了済みのタスク"]);
	});

	it("dateが未来日付の場合、その日の完了済みのタスクがorder順に返ること", () => {
		const result = getCompleteTodos({ todos: defaultInput, date: tomorrow });

		expect(result).toHaveLength(1);
		expect(result.map((todo) => todo.task)).toEqual(["明日の完了済みのタスク"]);
	});
});
