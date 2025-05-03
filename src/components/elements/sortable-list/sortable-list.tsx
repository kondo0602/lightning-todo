import {
	DndContext,
	DragOverlay,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import type {
	DragEndEvent,
	DragStartEvent,
	UniqueIdentifier,
} from "@dnd-kit/core";
import type { PropsWithChildren } from "react";

type SortableListProps = PropsWithChildren<{
	items: Array<{ id: UniqueIdentifier } & Record<string, unknown>>;
	onDragStart: (event: DragStartEvent) => void;
	onDragEnd: (event: DragEndEvent) => void;
	sortableOverlay?: React.ReactNode;
}>;

export const SortableList = ({
	items,
	onDragStart,
	onDragEnd,
	children,
	sortableOverlay,
}: SortableListProps) => {
	const pointerSensor = useSensor(PointerSensor, {
		activationConstraint: {
			distance: 10,
		},
	});

	const sensors = useSensors(
		pointerSensor,
		// TODO: キーボードアクションによるソートに対応する
		// useSensor(KeyboardSensor, {
		// 	coordinateGetter: sortableKeyboardCoordinates,
		// }),
	);

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
		>
			<SortableContext
				items={items.map((item) => item.id)}
				strategy={verticalListSortingStrategy}
			>
				{children}
			</SortableContext>
			<DragOverlay>{sortableOverlay}</DragOverlay>
		</DndContext>
	);
};
