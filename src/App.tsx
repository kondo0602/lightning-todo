import { TodoAddCard } from "./components/todo-add-card/todo-add-card";
import { TodoCard } from "./components/todo-card/todo-card";
import { TodoDateDisplay } from "./components/todo-date-display/todo-date-display";
import { useTodoList } from "./hooks/use-todo-list/use-todo-list";
import "./App.css";
import {
	DndContext,
	type DragEndEvent,
	DragOverlay,
	type DragStartEvent,
	KeyboardSensor,
	PointerSensor,
	type UniqueIdentifier,
	closestCenter,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { SortableListItem } from "./components/sortable-list-item/sortable-list-item";
import { TodoList } from "./components/todo-list/todo-list";

function App() {
	const {
		addTodo,
		deleteTodo,
		unCompleteTodo,
		completeTodo,
		postponeTodo,
		saveTodo,
		reorderTodos,
		activeTodos,
		completedTodos,
	} = useTodoList();

	const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

	const pointerSensor = useSensor(PointerSensor, {
		activationConstraint: {
			distance: 10,
		},
	});

	const sensors = useSensors(
		pointerSensor,
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	function handleDragStart(event: DragStartEvent) {
		const { active } = event;

		setActiveId(active.id);
	}

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			reorderTodos(active.id.toString(), over.id.toString());
		}

		setActiveId(null);
	};

	return (
		<div className="container">
			<TodoDateDisplay />
			<TodoAddCard onAdd={addTodo} />
			{activeTodos.length > 0 && (
				<TodoList>
					<DndContext
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragStart={handleDragStart}
						onDragEnd={handleDragEnd}
					>
						<SortableContext
							items={activeTodos.map((todo) => todo.id)}
							strategy={verticalListSortingStrategy}
						>
							{activeTodos.map((todo) => (
								<SortableListItem key={todo.id} id={todo.id}>
									<TodoCard
										todo={todo}
										onToggle={completeTodo}
										onPostpone={postponeTodo}
										onDelete={deleteTodo}
										onSave={saveTodo}
									/>
								</SortableListItem>
							))}
						</SortableContext>
						<DragOverlay>
							{activeId ? (
								<li>
									<TodoCard
										// biome-ignore lint/style/noNonNullAssertion: <explanation>
										todo={activeTodos.find((todo) => todo.id === activeId)!}
										onToggle={completeTodo}
										onPostpone={postponeTodo}
										onDelete={deleteTodo}
										onSave={saveTodo}
									/>
								</li>
							) : null}
						</DragOverlay>
					</DndContext>
				</TodoList>
			)}
			{completedTodos.length > 0 && (
				<TodoList title={"COMPLETED"}>
					{completedTodos.map((todo) => (
						<li key={todo.id}>
							<TodoCard
								todo={todo}
								onToggle={unCompleteTodo}
								onPostpone={postponeTodo}
								onDelete={deleteTodo}
								onSave={saveTodo}
							/>
						</li>
					))}
				</TodoList>
			)}
		</div>
	);
}

export default App;
