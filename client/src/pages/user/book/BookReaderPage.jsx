import { useState } from "react";
import PdfViewer from "@/pages/user/book/PdfViewer";
import ReaderHeaderDesktop from "@/pages/user/book/ReaderHeaderDesktop";
import ReaderHeaderMobile from "@/pages/user/book/ReaderHeaderMobile";
import { ReaderProvider } from "@/contexts/ReaderContext";
import BookInfoSidebar from "@/pages/user/book/BookInfoSidebar";
import Button from "@/components/ui/Button";
import { Link, useParams } from "react-router-dom";
import { PdfPluginProvider } from "@/contexts/PdfPluginContext";
import { useQuery } from "@tanstack/react-query";
import { fetchBookReadingPage } from "@/services/bookService";
import ErrorPage from "@/components/ErrorPage";
import { BookInfoSidebarSkeleton, PDFViewerSkeleton } from "@/components/skeletons/Skeleton";

export default function BookReaderPage() {
	const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
	const { slug } = useParams();
	const { isLoading, error, data } = useQuery({
		queryKey: ["book"],
		queryFn: async () => await fetchBookReadingPage(slug),
	});

	const { book, bookRelated, popularBooks } = data?.data?.data || {};

	if (error) {
		return <ErrorPage message={error.message} errorCode={error.code || 500} />;
	}

	return (
		// <ReaderProvider initialBook={book}>
		<PdfPluginProvider>
			<div className="min-h-screen bg-white">
				{/* Header Desktop */}
				<ReaderHeaderDesktop book={book} />

				{/* Header Mobile */}
				<ReaderHeaderMobile book={book} mobileSidebarOpen={mobileSidebarOpen} setMobileSidebarOpen={setMobileSidebarOpen} />

				<div className="w-full absolute top-16 bg-background">
					<div className="flex justify-center">
						{mobileSidebarOpen && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setMobileSidebarOpen(false)} />}

						{/* Book Info Sidebar */}
						<div className="sticky top-16 h-full z-50 lg:z-auto">
							{isLoading ? <BookInfoSidebarSkeleton mobileSidebarOpen={mobileSidebarOpen} /> : <BookInfoSidebar mobileSidebarOpen={mobileSidebarOpen} book={book} />}
						</div>

						{/* PDF Viewer */}
						{isLoading ? <PDFViewerSkeleton /> : <PdfViewer bookRelated={bookRelated} popularBooks={popularBooks} fileUrl={book?.data?.file_url} />}
					</div>
				</div>
			</div>
		</PdfPluginProvider>
		// </ReaderProvider>
	);
}
