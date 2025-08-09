import { createContext, useContext, useState } from "react";

const ReaderContext = createContext(null);

export const ReaderProvider = ({ children, initialBook }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [zoom, setZoom] = useState(100);

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handleZoomIn = () => {
		if (zoom < 200) {
			setZoom(zoom + 25);
		}
	};

	const handleZoomOut = () => {
		if (zoom > 50) {
			setZoom(zoom - 25);
		}
	};

    const handleTotalPages = (totalPages) => {
        setTotalPages(totalPages);
    };

	const contextValue = {
        book: initialBook,
        currentPage,
        setCurrentPage,
        totalPages,
        zoom,
        setZoom,
        handlePrevPage,
        handleNextPage,
        handleZoomIn,
        handleZoomOut,
        handleTotalPages
	};

	return <ReaderContext.Provider value={contextValue}>{children}</ReaderContext.Provider>;
};

export const useReader = () => {
	const context = useContext(ReaderContext);

	if (!context) {
		throw new Error("useReader must be used within a ReaderProvider");
	}

	return context;
};
