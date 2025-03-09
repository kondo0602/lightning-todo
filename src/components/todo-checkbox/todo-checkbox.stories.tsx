import type { Meta, StoryObj } from "@storybook/react";
import { TodoCheckbox } from "./todo-checkbox";
import { fn } from "@storybook/test";

const meta: Meta<typeof TodoCheckbox> = {
	title: "Components/TodoCheckbox",
	component: TodoCheckbox,
	parameters: {
		layout: "centered",
	},
	args: {
		onChange: fn(),
		onClick: fn(),
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
	args: {
		checked: false,
	},
};

export const Checked: Story = {
	args: {
		checked: true,
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		checked: false,
	},
};

export const DisabledChecked: Story = {
	args: {
		disabled: true,
		checked: true,
	},
};
