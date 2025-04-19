import { TodoAddCard } from "./components/todo-add-card/todo-add-card";
import { TodoCard } from "./components/todo-card/todo-card";
import { TodoDateDisplay } from "./components/todo-date-display/todo-date-display";
import { useTodoList } from "./use-todo-list";
import "./App.css";
import {
	DndContext,
	type DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./components/sortable-item/sortable-item";

function App() {
	const {
		addTodo,
		deleteTodo,
		unCompleteTodo,
		completeTodo,
		postponeTodo,
		activeTodos,
		completedTodos,
		saveTodo,
		reorderTodos,
	} = useTodoList();

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

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			// ドラッグ&ドロップで並び替え
			reorderTodos(active.id.toString(), over.id.toString());
		}
	};

	return (
		<div className="container">
			<TodoDateDisplay />

			<ul className="todo-list">
				<li>
					<TodoAddCard onAdd={addTodo} />
				</li>
				<DndContext
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragEnd={handleDragEnd}
				>
					<SortableContext
						items={activeTodos.map((todo) => todo.id)}
						strategy={verticalListSortingStrategy}
					>
						{activeTodos.map((todo) => (
							<SortableItem key={todo.id} id={todo.id}>
								<li>
									<TodoCard
										todo={todo}
										onToggle={completeTodo}
										onPostpone={postponeTodo}
										onDelete={deleteTodo}
										onSave={saveTodo}
									/>
								</li>
							</SortableItem>
						))}
					</SortableContext>
				</DndContext>
			</ul>

			{completedTodos.length > 0 && (
				<div className="completed-section">
					<h2>DONE</h2>
					<ul className="todo-list completed-list">
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
					</ul>
				</div>
			)}
		</div>
	);
}

export default App;
