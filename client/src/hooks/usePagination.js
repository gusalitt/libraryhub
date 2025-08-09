import { useState, useMemo } from "react";

function usePagination(data = [], itemsPerPage = 10) {
	const [currentPage, setCurrentPage] = useState(null);

	const totalPages = useMemo(() => {
		return Math.ceil(data.length / itemsPerPage);
	}, [data.length, itemsPerPage]);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const currentItems = () => {
		return data.slice(startIndex, startIndex + itemsPerPage);
	};

	return {
		currentPage,
		setCurrentPage,
		totalPages,
		currentItems,
	};
}

export default usePagination;
