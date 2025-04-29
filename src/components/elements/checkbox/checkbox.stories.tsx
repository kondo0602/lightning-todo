import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Checkbox } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
	title: "Components/Checkbox",
	component: Checkbox,
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
		checked: false,
		disabled: true,
	},
};

export const DisabledChecked: Story = {
	args: {
		checked: true,
		disabled: true,
	},
};
