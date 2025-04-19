import type { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within } from "@storybook/test";
import { Temporal } from "temporal-polyfill";
import { TodoCard } from "./todo-card";

const meta: Meta<typeof TodoCard> = {
	title: "Components/TodoCard",
	component: TodoCard,
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
			task: "エニタイムに行って5km走る",
			startAt: Temporal.Now.plainDateISO(),
			completed: false,
			completedAt: null,
		},
	},
};

export const EditMode: Story = {
	args: {
		todo: {
			// biome-ignore lint/style/noNonNullAssertion:
			...Default.args?.todo!,
		},
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const textarea = canvas.getByDisplayValue("エニタイムに行って5km走る");
		await userEvent.click(textarea);
	},
};

export const WithLongText: Story = {
	args: {
		todo: {
			// biome-ignore lint/style/noNonNullAssertion:
			...Default.args?.todo!,
			task: "エニタイムに行って5km走る！".repeat(10),
		},
	},
};

export const Completed: Story = {
	args: {
		todo: {
			// biome-ignore lint/style/noNonNullAssertion:
			...Default.args?.todo!,
			completed: true,
			completedAt: Temporal.Now.plainDateISO(),
		},
	},
};
