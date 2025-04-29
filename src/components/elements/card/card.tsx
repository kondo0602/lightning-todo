import clsx from "clsx";
import type { ComponentProps } from "react";
import "./card.css";

type CardProps = ComponentProps<"div">;

export const Card = ({ className, children, ...props }: CardProps) => {
	return (
		<div
			className={clsx("card", className)}
			role="button"
			tabIndex={-1}
			{...props}
		>
			{children}
		</div>
	);
};
