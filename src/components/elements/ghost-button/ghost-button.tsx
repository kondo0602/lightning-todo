import clsx from "clsx";
import styles from "./ghost-button.module.css";

import type { ComponentProps } from "react";

type Props = ComponentProps<"button">;

export const GhostButton = ({ className, children, ...props }: Props) => {
	return (
		<button className={clsx(styles.button, className)} {...props}>
			{children}
		</button>
	);
};
