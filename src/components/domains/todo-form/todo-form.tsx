import clsx from "clsx";
import type { ComponentProps, PropsWithChildren } from "react";
import styles from "./todo-form.module.css";

type TodoFormProps = PropsWithChildren<ComponentProps<"form">>;

export const TodoForm = ({ className, children, ...props }: TodoFormProps) => {
	return (
		<form className={clsx(styles.form, className)} {...props}>
			{children}
			<button type="submit" className="visually-hidden" tabIndex={-1} />
		</form>
	);
};
