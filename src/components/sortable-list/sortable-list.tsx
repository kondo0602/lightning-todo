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
import {
	Children,
	type PropsWithChildren,
	cloneElement,
	isValidElement,
	useState,
} from "react";
import { SortableListItem } from "../sortable-list-item/sortable-list-item";

type SortableListProps<T extends { id: UniqueIdentifier }> = PropsWithChildren<{
	items: T[];
	onReorder: (activeId: UniqueIdentifier, overId: UniqueIdentifier) => void;
}>;

export const SortableList = <T extends { id: UniqueIdentifier }>({
	items,
	onReorder,
	children,
}: SortableListProps<T>) => {
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 5,
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

	function handleDragStart(event: DragStartEvent) {
		const { active } = event;

		setActiveId(active.id);
	}

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			onReorder(active.id.toString(), over.id.toString());
		}

		setActiveId(null);
	};

	// activeIdに対応する子要素を見つける
	const findActiveChild = () => {
		if (!activeId) return null;

		const childrenArray = Children.toArray(children);
		const activeItem = items.find((item) => item.id === activeId);

		if (!activeItem) return null;

		// childrenが配列の場合、activeIdに対応する子要素を探す
		// Reactの子要素を処理
		for (const child of childrenArray) {
			if (
				isValidElement(child) &&
				child.props.todo &&
				child.props.todo.id === activeId
			) {
				return child;
			}
		}

		// 特定の子要素が見つからない場合、最初の子要素をクローンしてpropsを渡す
		if (childrenArray.length > 0 && isValidElement(childrenArray[0])) {
			return cloneElement(childrenArray[0] as React.ReactElement, {
				todo: activeItem,
			});
		}

		return null;
	};

	return (
		<ul className="todo-list">
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
			>
				<SortableContext
					items={items.map((todo) => todo.id)}
					strategy={verticalListSortingStrategy}
				>
					{items.map((item) => (
						<SortableListItem key={item.id} id={item.id}>
							{children}
						</SortableListItem>
					))}
				</SortableContext>
				<DragOverlay>{activeId && <li>{findActiveChild()}</li>}</DragOverlay>
			</DndContext>
		</ul>
	);
};
