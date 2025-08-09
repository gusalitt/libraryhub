import Button from "@/components/ui/Button";
import useIsMobile from "@/hooks/useIsMobile";

export default function Pagination({ currentPage, totalPages, setCurrentPage }) {
	const isMobile = useIsMobile();

	return (
		<div className="flex items-center justify-center space-x-2">
			{totalPages > 1 && (
				<>
					{/* Previous Button */}
					<Button variant="outline" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="px-4! py-5! border-2! disabled:opacity-50 disabled:cursor-not-allowed">
						Previous
					</Button>

					{/* Page Numbers */}
					{[...Array(totalPages)].map((_, index) => {
						const page = index + 1;

						const isFirst = page === 1;
						const isLast = page === totalPages;
						const isCurrent = page === currentPage;

						const isVisibleMid = isMobile
							? isCurrent 
							: Math.abs(currentPage - page) <= 1;

						const showEllipsisLeft = page === currentPage - 2 && page > 2;
						const showEllipsisRight = page === currentPage + 2 && page < totalPages - 1;

						if (isFirst || isLast || isVisibleMid) {
							return (
								<Button key={page} variant="outline" onClick={() => setCurrentPage(page)} className={`px-4 py-2 rounded-lg ${currentPage === page ? "bg-foreground text-background" : "border"}`}>
									{page}
								</Button>
							);
						}

						if (!isMobile && (showEllipsisLeft || showEllipsisRight)) {
							return (
								<span key={page} className="px-2 select-none">
									...
								</span>
							);
						}

						return null;
					})}

					{/* Next Button */}
					<Button variant="outline" onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="px-4! py-5! border! disabled:opacity-50 disabled:cursor-not-allowed">
						Next
					</Button>
				</>
			)}
		</div>
	);
}
