import type { PropsWithChildren } from "react";
import "./todo-list.css";

type TodoListProps = PropsWithChildren;

export const TodoList = ({ children }: TodoListProps) => {
	return <ul className="todo-list">{children}</ul>;
};
