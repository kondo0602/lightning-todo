import clsx from "clsx";

import type { ComponentProps } from "react";

import styles from "./checkbox.module.css";

type CheckboxProps = ComponentProps<"input">;

export const Checkbox = ({ className, checked, ...props }: CheckboxProps) => {
	return (
		<input
			type="checkbox"
			className={clsx(styles.checkbox, className)}
			checked={checked}
			tabIndex={-1}
			{...props}
		/>
	);
};
