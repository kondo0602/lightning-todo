import type { Meta, StoryObj } from "@storybook/react";
import { TodoListItemCard } from "./todo-list-item-card";
import { fn, userEvent, within } from "@storybook/test";

const meta: Meta<typeof TodoListItemCard> = {
	title: "Components/TodoListItemCard",
	component: TodoListItemCard,
	args: {
		onToggle: fn(),
		onDelete: fn(),
		onSave: fn(),
	},
	decorators: [
		(Story) => (
			<div style={{ width: "400px" }}>
				<Story />
			</div>
		),
	],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		todo: {
			id: "6f488950-603a-4ddc-9ef9-ba8ef9b5b1bd",
			text: "エニタイムに行って5km走る",
			completed: false,
			note: "",
		},
	},
};

export const EditMode: Story = {
	args: {
		todo: {
			...Default.args?.todo!,
		},
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const card = canvas.getByRole("button");

		if (card) {
			await userEvent.click(card);
		}
	},
};

export const WithNote: Story = {
	args: {
		todo: {
			...Default.args?.todo!,
			note: "終わったらアイスコーヒーが飲める",
		},
	},
};

export const WithLongText: Story = {
	args: {
		todo: {
			...Default.args?.todo!,
			text: "エニタイムに行って5km走る！".repeat(10),
			note: "終わったらアイスコーヒーが飲める！".repeat(10),
		},
	},
};

export const Completed: Story = {
	args: {
		todo: {
			...WithNote.args?.todo!,
			completed: true,
		},
	},
};
