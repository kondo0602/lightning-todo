import type { ComponentProps, PropsWithChildren } from "react";

import styles from "./todo-list.module.css";

type TodoListProps = PropsWithChildren<ComponentProps<"ul">> & {
	title?: string;
};

export const TodoList = ({ title, children, ...props }: TodoListProps) => {
	return (
		<>
			{title && <h2 className={styles.heading}>{title}</h2>}
			<ul className={styles.list} {...props}>
				{children}
			</ul>
		</>
	);
};
