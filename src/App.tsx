import { useState } from "react";

import { TodoAddCard } from "./components/domains/todo-add-card/todo-add-card";
import { TodoCard } from "./components/domains/todo-card/todo-card";
import { TodoList } from "./components/domains/todo-list/todo-list";
import { DateDisplay } from "./components/elements/date-display/date-display";
import { SortableListItem } from "./components/elements/sortable-list-item/sortable-list-item";
import { SortableList } from "./components/elements/sortable-list/sortable-list";
import { useTodoList } from "./hooks/use-todo/use-todo-list";

import type {
	DragEndEvent,
	DragStartEvent,
	UniqueIdentifier,
} from "@dnd-kit/core";

import { Temporal } from "temporal-polyfill";
import styles from "./App.module.css";

function App() {
	const [displayDate, setDisplayDate] = useState(Temporal.Now.plainDateISO());
	const goYesterday = () => setDisplayDate((prev) => prev.add({ days: -1 }));
	const goToday = () => setDisplayDate(Temporal.Now.plainDateISO());
	const goTomorrow = () => setDisplayDate((prev) => prev.add({ days: 1 }));

	const {
		todayTodos,
		completedTodos,
		addTodo,
		deleteTodo,
		unCompleteTodo,
		completeTodo,
		updateTodoTask,
		updateTodoOrder,
		postponeTodo,
	} = useTodoList({ date: displayDate });

	const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

	const handleReorderStart = (event: DragStartEvent) => {
		const { active } = event;
		setActiveId(active.id);
	};

	const handleReorderEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (over && active.id !== over.id) {
			updateTodoOrder(active.id.toString(), over.id.toString());
		}
	};

	return (
		<div className={styles.container}>
			<DateDisplay
				date={displayDate}
				onClickYesterdayButton={goYesterday}
				onClickTodayButton={goToday}
				onClickTomorrowButton={goTomorrow}
			/>
			<TodoList>
				<TodoAddCard onAdd={addTodo} />
				{todayTodos.length > 0 && (
					<SortableList
						items={todayTodos}
						onDragStart={handleReorderStart}
						onDragEnd={handleReorderEnd}
						sortableOverlay={
							activeId ? (
								<li>
									<TodoCard
										// biome-ignore lint/style/noNonNullAssertion: <explanation>
										todo={todayTodos.find((todo) => todo.id === activeId)!}
										onToggle={completeTodo}
										onSave={updateTodoTask}
									/>
								</li>
							) : null
						}
					>
						{todayTodos.map((todo) => (
							<SortableListItem key={todo.id} id={todo.id}>
								<TodoCard
									todo={todo}
									onToggle={completeTodo}
									onSave={updateTodoTask}
									onPostpone={postponeTodo}
									onDelete={deleteTodo}
								/>
							</SortableListItem>
						))}
					</SortableList>
				)}
			</TodoList>
			{completedTodos.length > 0 && (
				<TodoList title={"COMPLETED"}>
					{completedTodos.map((todo) => (
						<li key={todo.id}>
							<TodoCard
								todo={todo}
								onToggle={unCompleteTodo}
								onPostpone={postponeTodo}
								onDelete={deleteTodo}
								onSave={updateTodoTask}
							/>
						</li>
					))}
				</TodoList>
			)}
		</div>
	);
}

export default App;
