import clsx from "clsx";
import type { ComponentProps } from "react";
import "./checkbox.css";

type CheckboxProps = ComponentProps<"input">;

export const Checkbox = ({ className, checked, ...props }: CheckboxProps) => {
	return (
		<input
			type="checkbox"
			className={clsx("checkbox", className)}
			checked={checked}
			tabIndex={-1}
			{...props}
		/>
	);
};
