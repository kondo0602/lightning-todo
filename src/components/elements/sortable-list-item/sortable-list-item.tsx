import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { UniqueIdentifier } from "@dnd-kit/core";
import type { PropsWithChildren } from "react";

type SortableListItemProps = PropsWithChildren<{
	id: UniqueIdentifier;
}>;

export const SortableListItem = (props: SortableListItemProps) => {
	const {
		attributes,
		isDragging,
		listeners,
		setNodeRef,
		transform,
		transition,
	} = useSortable({ id: props.id });

	const style = {
		opacity: isDragging ? 0.3 : 1,
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<li
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			tabIndex={-1}
		>
			{props.children}
		</li>
	);
};
