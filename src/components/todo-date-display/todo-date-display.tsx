import { Temporal } from "temporal-polyfill";
import "./todo-date-display.css";

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

export const TodoDateDisplay = () => {
	const now = Temporal.Now.plainDateISO();

	return (
		<div className="date-display">
			<h1 className="date-display-day">{now.day.toString()}</h1>
			<span className="date-display-weekday">{WEEKDAYS[now.dayOfWeek]}</span>
			<span className="date-display-month-year">
				{`${MONTHS[now.month - 1]}, ${now.year.toString()}`}
			</span>
		</div>
	);
};
