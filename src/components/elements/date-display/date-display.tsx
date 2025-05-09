import { Temporal } from "temporal-polyfill";

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
	onClickTodayButton: () => void
	onClickTomorrowButton: () => void
}

export const DateDisplay = ({
	date,
	onClickTodayButton,
	onClickTomorrowButton
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
			<button className={styles.dateDisplayTodayButton} onClick={onClickTodayButton} >Today</button>
			<button className={styles.dateDisplayTomorrowButton} onClick={onClickTomorrowButton}>Tomorrow</button>
		</div>
	);
};
