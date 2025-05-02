import clsx from "clsx";

import type { ComponentProps } from "react";

import styles from "./card.module.css";

type CardProps = ComponentProps<"div">;

export const Card = ({ className, children, ...props }: CardProps) => {
	return (
		<div
			className={clsx(styles.card, className)}
			role="button"
			tabIndex={-1}
			{...props}
		>
			{children}
		</div>
	);
};
