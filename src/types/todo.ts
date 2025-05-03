import type { Temporal } from "temporal-polyfill";

export type Todo = {
	id: string;
	task: string;
	order: string;
	startAt: Temporal.PlainDate;
	completed: boolean;
	completedAt: Temporal.PlainDate | null;
};
