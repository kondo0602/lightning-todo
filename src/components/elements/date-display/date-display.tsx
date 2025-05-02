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
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

export const DateDisplay = () => {
	const now = Temporal.Now.plainDateISO();

	return (
		<div className={styles.dateDisplay}>
			<h1 className={styles.dateDisplayDay}>{now.day.toString()}</h1>
			<span className={styles.dateDisplayWeekday}>
				{WEEKDAYS[now.dayOfWeek]}
			</span>
			<span className={styles.dateDisplayMonthYear}>
				{`${MONTHS[now.month - 1]}, ${now.year.toString()}`}
			</span>
		</div>
	);
};
