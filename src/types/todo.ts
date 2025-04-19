export type Todo = {
	id: string;
	task: string;
	startAt: string;
	completed: boolean;
	completedAt: string | null;
	order: number;
};
