import type { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within } from "@storybook/test";
import { TodoAddCard } from "./todo-add-card";

const meta: Meta<typeof TodoAddCard> = {
	title: "Components/TodoAddCard",
	component: TodoAddCard,
	args: {
		onAdd: fn(),
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

export const Default: Story = {};

export const EditMode: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const card = canvas.getByRole("button");

		if (card) {
			await userEvent.click(card);
		}
	},
};
