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
			id: 1,
			text: "買い物に行く",
			completed: false,
			note: "",
		},
	},
};

export const WithNote: Story = {
	args: {
		todo: {
			id: 2,
			text: "プロジェクトの計画を立てる",
			completed: false,
			note: "チームメンバーと相談する必要あり",
		},
	},
};

export const LongText: Story = {
	args: {
		todo: {
			id: 4,
			text: "これは非常に長いタスクのテキストです。複数行にわたって表示されるかどうかを確認するためのものです。レイアウトが崩れないことを確認します。",
			completed: false,
			note: "これも長いノートのテキストです。ノートも複数行にわたって適切に表示されるかどうかを確認します。",
		},
	},
};

export const Completed: Story = {
	args: {
		todo: {
			id: 3,
			text: "メールを確認する",
			completed: true,
			note: "返信が必要なものをチェック",
		},
	},
};
