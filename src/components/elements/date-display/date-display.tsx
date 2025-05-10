import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Temporal } from "temporal-polyfill";
import { GhostButton } from "../ghost-button/ghost-button";
import styles from "./date-display.module.css";

const MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

const WEEKDAYS = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];

type Props = {
	date: Temporal.PlainDate;
	onClickYesterdayButton: () => void;
	onClickTodayButton: () => void;
	onClickTomorrowButton: () => void;
};

export const DateDisplay = ({
	date,
	onClickYesterdayButton,
	onClickTodayButton,
	onClickTomorrowButton,
}: Props) => {
	return (
		<div className={styles.dateDisplay}>
			<h1 className={styles.dateDisplayDay}>{date.day.toString()}</h1>
			<span className={styles.dateDisplayWeekday}>
				{WEEKDAYS[date.dayOfWeek - 1]}
			</span>
			<span className={styles.dateDisplayMonthYear}>
				{`${MONTHS[date.month - 1]}, ${date.year.toString()}`}
			</span>
			<GhostButton
				type="button"
				className={styles.dateDisplayYesterdayButton}
				disabled={date.day === Temporal.Now.plainDateISO().day}
				onClick={onClickYesterdayButton}
			>
				<IoIosArrowBack />
			</GhostButton>
			<GhostButton
				type="button"
				className={styles.dateDisplayTodayButton}
				onClick={onClickTodayButton}
			>
				Today
			</GhostButton>
			<GhostButton
				type="button"
				className={styles.dateDisplayTomorrowButton}
				onClick={onClickTomorrowButton}
			>
				<IoIosArrowForward />
			</GhostButton>
		</div>
	);
};
