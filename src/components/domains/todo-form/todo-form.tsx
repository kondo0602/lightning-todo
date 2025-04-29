import clsx from "clsx";
import type { ComponentProps, PropsWithChildren } from "react";
import "./todo-form.css";
type TodoFormProps = PropsWithChildren<ComponentProps<"form">>;

export const TodoForm = ({ className, children, ...props }: TodoFormProps) => {
	return (
		<form className={clsx("todo-form", className)} {...props}>
			{children}
			<button type="submit" className="visually-hidden" tabIndex={-1} />
		</form>
	);
};
