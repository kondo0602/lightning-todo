import { ComponentProps } from "react";
import "./todo-checkbox.css";

type TodoCheckboxProps = ComponentProps<"input">;

export const TodoCheckbox = ({
	checked,
	onChange,
	onClick,
}: TodoCheckboxProps) => {
	return (
		<input
			type="checkbox"
			className="todo-checkbox"
			checked={checked}
			onChange={onChange}
			onClick={onClick}
		/>
	);
};
