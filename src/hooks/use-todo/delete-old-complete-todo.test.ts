import { Temporal } from "temporal-polyfill";
import { describe, expect, it } from "vitest";
import { deleteOldCompletedTodos } from "./delete-old-complete-todo";

import type { Todo } from "../../types/todo";

describe("deleteOldCompletedTodos", () => {
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

	it("完了日が過去日になっているタスクが削除されること", () => {
		const result = deleteOldCompletedTodos({ todos: defaultInput });

		expect(result).toEqual([
			expect.objectContaining({
				id: "1",
			}),
			expect.objectContaining({
				id: "3",
			}),
			expect.objectContaining({
				id: "4",
			}),
			expect.objectContaining({
				id: "5",
			}),
			expect.objectContaining({
				id: "6",
			}),
		]);
	});
});
