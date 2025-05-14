import { describe, expect, it } from "vitest";

import { Temporal } from "temporal-polyfill";
import type { Todo } from "../../types/todo";
import { generateNewOrder } from "./generate-new-order";

describe("generateNewOrder", () => {
	const defaultInput: Todo[] = [
		{
			id: "1",
			task: "タスクA",
			order: "a0",
			startAt: Temporal.Now.plainDateISO(),
			completed: false,
			completedAt: null,
		},
		{
			id: "2",
			task: "タスクB",
			order: "a1",
			startAt: Temporal.Now.plainDateISO(),
			completed: false,
			completedAt: null,
		},
		{
			id: "3",
			task: "タスクC",
			order: "a2",
			startAt: Temporal.Now.plainDateISO(),
			completed: false,
			completedAt: null,
		},
		{
			id: "4",
			task: "タスクD",
			order: "a3",
			startAt: Temporal.Now.plainDateISO(),
			completed: false,
			completedAt: null,
		},
	];

	it("TODOが移動していない場合、nullを返すこと", () => {
		const result = generateNewOrder({
			todos: defaultInput,
			activeId: "1",
			overId: "1",
		});

		expect(result).toBeNull();
	});

	it("TODOを上から下に移動させた場合、飛び越えたTODOとその次のTODOの中間のorderを返すこと", () => {
		const result = generateNewOrder({
			todos: defaultInput,
			activeId: "1",
			overId: "2",
		});

		expect(result).toBe("a1V");
	});

	it("TODOを上から下端に移動させた場合、末尾になるorderを返すこと", () => {
		const result = generateNewOrder({
			todos: defaultInput,
			activeId: "1",
			overId: "4",
		});

		expect(result).toBe("a4");
	});

	it("TODOを下から上に移動させた場合、飛び越えたTODOとその前のTODOの中間のorderを返すこと", () => {
		const result = generateNewOrder({
			todos: defaultInput,
			activeId: "3",
			overId: "2",
		});

		expect(result).toBe("a0V");
	});

	it("TODOを下から上端に移動させた場合、先頭になるorderを返すこと", () => {
		const result = generateNewOrder({
			todos: defaultInput,
			activeId: "4",
			overId: "1",
		});

		expect(result).toBe("Zz");
	});
});
