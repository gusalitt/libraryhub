import { createContext, useContext, useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import "@react-pdf-viewer/core/lib/styles/index.css";
import '@react-pdf-viewer/page-navigation/lib/styles/index.css'

const PdfPluginContext = createContext(null);

export const PdfPluginProvider = ({ children }) => {
	const pageNavigationPluginInstance = pageNavigationPlugin();
    const zoomPluginInstance = zoomPlugin();
	const { GoToNextPage, GoToPreviousPage, jumpToPage, NumberOfPages } = pageNavigationPluginInstance;
    const { CurrentScale, ZoomIn, ZoomOut } = zoomPluginInstance;
    const [totalPage, setTotalPage] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);

    const handleTotalPages = (totalPages) => {
        setTotalPage(totalPages);
    }

    const contextValue = {
        Worker,
        Viewer,
        pageNavigationPluginInstance,
        zoomPluginInstance,
        GoToNextPage,
        GoToPreviousPage,
        jumpToPage,
        CurrentScale,
        ZoomIn,
        ZoomOut,
        totalPage,
        NumberOfPages,
        handleTotalPages,
        currentPage,
        setCurrentPage
    };

    return <PdfPluginContext.Provider value={contextValue} >{children}</PdfPluginContext.Provider>
}

export const usePdfPlugin = () => {
    const context = useContext(PdfPluginContext);

    if (!context) {
        throw new Error('usePdfPlugin must be used within a PdfPluginProvider');
    }

    return context;
}