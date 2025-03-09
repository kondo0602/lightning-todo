import type { Meta, StoryObj } from "@storybook/react";
import { TodoAddCard } from "./todo-add-card";
import { fn, userEvent, within } from "@storybook/test";

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
} satisfies Meta<typeof TodoAddCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InputMode: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const card = canvas.getByRole("button");

		if (card) {
			await userEvent.click(card);
		}
	},
};
