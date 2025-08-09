import Card from "@/components/ui/Card";
import { Star } from "lucide-react";
import useIsMobile from "@/hooks/useIsMobile";
import { usePdfPlugin } from "@/contexts/PdfPluginContext";

export default function BookInfoSidebar({ mobileSidebarOpen, book }) {
	const data = book?.data || {};
	const isMobile = useIsMobile();
	const { currentPage, totalPage, jumpToPage } = usePdfPlugin();
	const labels = totalPage === 1 ? ["Single Page"] : totalPage < 6 ? ["Start", "End"] : ["Start", "Early", "Develop", "Middle", "Late", "End"];

	const chapterPages = Array.from({ length: labels.length }, (_, i) => {
		return {
			title: labels[i],
			page: totalPage < 6 ? i + 1 : Math.floor((i / (labels.length - 1)) * (totalPage - 1)) + 1,
		};
	});

	const sidebarClass = `w-80 bg-background shadow-md-r border-r p-6 transition-all duration-300 ${
		isMobile ? `fixed top-29 h-full z-50 ${mobileSidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}` : `relative overflow-y-auto h-screen block z-0 translate-x-0 opacity-100`
	}
    `;

	const coverUrl = import.meta.env.VITE_SUPABASE_STORAGE_URL + data?.cover_url;

	return (
		<div className={sidebarClass}>
			<div className="block overflow-y-auto">
				{/* Book Mini Card */}
				<Card className="shadow-sm mb-6">
					<div className="flex items-start space-x-4">
						<img src={coverUrl || "/placeholder.svg"} alt={data?.title} className="w-16 h-20 object-cover rounded-lg" />
						<div className="flex-1 min-w-0">
							<h3 className="font-bold text-foreground text-sm mb-1 truncate">{data?.title}</h3>
							<p className="text-muted-foreground text-sm mb-2">by {data?.author}</p>
							<div className="flex items-center space-x-1">
								<div className="flex">
									{[...Array(5)].map((_, i) => (
										<Star key={i} className={`w-3 h-3 ${i < Math.floor(data?.rating_avg) ? "text-yellow-400 fill-current" : "text-foreground"} rounded-full mr-1`} />
									))}
								</div>
								<span className="text-xs text-gray-500">{data?.rating_avg ? data?.rating_avg.toFixed(1) : "0.0"}</span>
							</div>
						</div>
					</div>
				</Card>

				{/* Reading Progress */}
				<Card className="shadow-sm mb-6">
					<h4 className="font-bold text-foreground mb-4">Reading Progress</h4>
					<div className="space-y-3">
						<div className="flex justify-between text-sm">
							<span className="text-muted-foreground">Current Page</span>
							<span className="font-medium text-foreground">
								{currentPage} / {totalPage}
							</span>
						</div>
						<div className="w-full bg-gray-300 dark:bg-gray-800 rounded-full h-2">
							<div className="bg-foreground h-2 rounded-full transition-all duration-300" style={{ width: `${(currentPage / totalPage) * 100}%` }} />
						</div>
						<div className="flex justify-between text-sm">
							<span className="text-muted-foreground">Progress</span>
							<span className="font-medium text-foreground">{totalPage > 0 && currentPage > 0 ? `${Math.round((currentPage / totalPage) * 100)}%` : "0%"}</span>
						</div>
					</div>
				</Card>

				{/* Reading Flow */}
				<Card className="p-6 shadow-sm">
					<h4 className="font-bold text-foreground mb-4">Reading Flow</h4>
					<div className="space-y-2 max-h-56 overflow-y-auto pr-3.5">
						{chapterPages.map((chapter, index) => (
							<button
								key={index}
								onClick={() => {
									const page = parseInt(chapter.page);
									if (!isNaN(page) && page >= 1 && page <= totalPage) {
										jumpToPage(page - 1);
									}
								}}
								className={`w-full text-left p-3 rounded-lg group transition-colors ${currentPage >= chapter.page ? "bg-foreground text-background" : "bg-accent hover:bg-foreground text-background"}`}
							>
								<div className={`font-medium text-sm group-hover:text-background ${currentPage >= chapter.page ? "text-background" : "text-foreground"}`}>{chapter.title}</div>
								<div className="text-xs opacity-75 text-muted-foreground font-semibold">Page {chapter.page}</div>
							</button>
						))}
					</div>
				</Card>
			</div>
		</div>
	);
}
