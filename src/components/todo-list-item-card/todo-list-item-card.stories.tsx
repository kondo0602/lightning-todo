import type { Meta, StoryObj } from "@storybook/react";
import { TodoListItemCard } from "./todo-list-item-card";
import { fn } from "@storybook/test";

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
			text: "エニタイムに行って走る",
			completed: false,
			note: "",
		},
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
			text: "これは非常に長いタスクのテキストです。複数行にわたって表示されるかどうかを確認するためのものです。レイアウトが崩れないことを確認します。",
			note: "これも長いノートのテキストです。ノートも複数行にわたって適切に表示されるかどうかを確認します。",
		},
	},
};

export const Completed: Story = {
	args: {
		todo: {
			id: "567f0378-9fae-411e-87bd-bcba5d54af4a",
			text: "メールを確認する",
			completed: true,
			note: "返信が必要なものをチェック",
		},
	},
};
