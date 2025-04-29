import type { ComponentProps, PropsWithChildren } from "react";
import "./todo-list.css";

type TodoListProps = PropsWithChildren<ComponentProps<"ul">> & {
	title?: string;
};

export const TodoList = ({ title, children, ...props }: TodoListProps) => {
	return (
		<>
			{title && <h2 className="todo-list-heading">{title}</h2>}
			<ul className="todo-list" {...props}>
				{children}
			</ul>
		</>
	);
};
