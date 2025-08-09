import { useState } from "react";
import RelatedBooks from "@/pages/user/book/RelatedBooks";
import { useTheme } from "@/contexts/ThemeContext";
import { usePdfPlugin } from "@/contexts/PdfPluginContext";
import { SpecialZoomLevel } from '@react-pdf-viewer/core';
import ErrorPage from "@/components/ErrorPage";

export default function PdfViewer({ bookRelated, popularBooks, fileUrl }) {
	const { theme, toggleTheme } = useTheme();
	const { Worker, Viewer, pageNavigationPluginInstance, zoomPluginInstance, handleTotalPages, setCurrentPage } = usePdfPlugin();
	const pdfUrl = import.meta.env.VITE_SUPABASE_STORAGE_URL + fileUrl;

	return (
		<div className="flex flex-col">
			<main className="flex-1 flex items-center pt-20 md:pt-22 lg:pt-0 xl:pt-10 pb-10 justify-center bg-background px-4 md:px-8">
				<div className="shadow-gray-300 w-full max-w-5xl h-[80vh] dark:shadow-gray-900 shadow-2xl rounded-lg overflow-hidden">
					{/* PDF Content */}
					<div className="w-full h-full dark:bg-[#1A1A1A] border-2 border-border rounded-lg text-foreground py-8 relative">
						<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
							<Viewer
								fileUrl={pdfUrl}
								onDocumentLoad={(e) => handleTotalPages(e.doc.numPages)}
								onPageChange={(page) => setCurrentPage(page.currentPage + 1)}
								theme={theme}
								onSwitchTheme={() => toggleTheme}
								defaultScale={SpecialZoomLevel.PageFit}
								plugins={[pageNavigationPluginInstance, zoomPluginInstance]}
								renderError={() => <ErrorPage message={"Failed to load data of the book"} errorCode={400} className="min-h-full!" />}
							/>
						</Worker>
					</div>
				</div>
			</main>

			{/* Related Books */}
			<section className="bg-background border-border border-t-2 pb-10">
				<div className="container">
					<RelatedBooks book={bookRelated} title="More in this category" />
					<RelatedBooks book={popularBooks} title="Top Rated Books" />
				</div>
			</section>
		</div>
	);
}
