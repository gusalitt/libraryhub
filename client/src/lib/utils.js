export function cn(...clasess) {
    return clasess.filter(Boolean).join(" ");
}


export function formatMonthYear(dateString) {
	const date = new Date(dateString);
	return date.toLocaleString("en-US", {
		month: "long",
		year: "numeric",
	});
}


export function timeAgo(dateString) {
	const now = new Date();
	const past = new Date(dateString);
	const diffInSeconds = Math.floor((now - past) / 1000);

	const intervals = [
		{ label: "year", seconds: 31536000 },
		{ label: "month", seconds: 2592000 },
		{ label: "week", seconds: 604800 },
		{ label: "day", seconds: 86400 },
		{ label: "hour", seconds: 3600 },
		{ label: "minute", seconds: 60 },
		{ label: "second", seconds: 1 },
	];

	for (const interval of intervals) {
		const count = Math.floor(diffInSeconds / interval.seconds);
		if (count >= 1) {
			return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
		}
	}

	return "just now";
}


export function formattedErrors(errors) {
	return errors.reduce((acc, error) => {
		acc[error.path] = error.msg;
		return acc;
	}, {});
}


export function getInitials(name) {
	if (!name) return "";

	const words = name.trim().split(/\s+/);

	if (words.length === 1) {
		return words[0].slice(0, 2).toUpperCase();
	}

	return words.slice(0, 2).map(word => word[0].toUpperCase()).join("");
}