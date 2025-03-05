import "./task-edit-form.css";

interface TaskEditFormProps {
	text?: string;
	note?: string;
	onSubmit: (text: string, note: string) => void;
	onBlur?: () => void;
}

export const TaskEditForm = ({
	text = "",
	note = "",
	onSubmit,
	onBlur,
}: TaskEditFormProps) => {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const taskText = (form.elements[0] as HTMLInputElement).value.trim();
		const noteText = (form.elements[1] as HTMLInputElement).value.trim();

		// タスクが空の場合は送信しない
		if (!taskText) return;

		onSubmit(taskText, noteText);
	};

	return (
		<form className="task-edit-form" onSubmit={handleSubmit}>
			<input
				type="text"
				defaultValue={text}
				placeholder="Add a task..."
				onBlur={onBlur}
			/>
			<input
				type="text"
				defaultValue={note}
				placeholder="Add note..."
				onBlur={onBlur}
			/>
			<button type="submit" className="visually-hidden" tabIndex={-1} />
		</form>
	);
}; 