import type { Meta, StoryObj } from "@storybook/react";
import { AddTaskCard } from "./add-task-card";

const meta = {
	title: "Components/AddTaskCard",
	component: AddTaskCard,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
			values: [
				{
					name: "dark",
					value: "#1a1a1a",
				},
			],
		},
	},
} satisfies Meta<typeof AddTaskCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		onAdd: (text: string, note: string) => {
			console.log("Added task:", { text, note });
		},
	},
};

export const InputMode: Story = {
	args: {
		onAdd: (text: string, note: string) => {
			console.log("Added task:", { text, note });
		},
	},
	play: async ({ canvasElement }) => {
		const input = canvasElement.querySelector("input");
		if (input) {
			input.focus();
		}
	},
};
