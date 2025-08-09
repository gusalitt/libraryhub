import { Search, BookOpen, Users, Star, Download } from "lucide-react";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { HeroStatsSkeleton } from "@/components/skeletons/Skeleton";
import { useNavigate } from "react-router-dom";

export default function HeroSection({ isLoading, totalBooks, bookReads, ratingAvg, totalDownloads, totalCategories }) {
	const [searchQuery, setSearchQuery] = useState("");
	const navigate = useNavigate();

	const heroStatsElement = isLoading ? (
		<HeroStatsSkeleton />
	) : (
		<>
			<div className="text-center">
				<div className="flex items-center justify-center w-16 h-16 bg-foreground rounded-2xl mx-auto mb-4">
					<BookOpen className="w-8 h-8 text-background" />
				</div>
				<div className="text-2xl md:text-3xl font-bold text-foreground mb-2">{isLoading ? "0" : totalBooks + "+"}</div>
				<div className="text-sm md:text-md text-muted-foreground">Books Available</div>
			</div>
			<div className="text-center">
				<div className="flex items-center justify-center w-16 h-16 bg-foreground rounded-2xl mx-auto mb-4">
					<Users className="w-8 h-8 text-background" />
				</div>
				<div className="text-2xl md:text-3xl font-bold text-foreground mb-2">{isLoading ? "0" : bookReads + "+"}</div>
				<div className="text-sm md:text-md text-muted-foreground">Book Reads</div>
			</div>
			<div className="text-center">
				<div className="flex items-center justify-center w-16 h-16 bg-foreground rounded-2xl mx-auto mb-4">
					<Star className="w-8 h-8 text-background" />
				</div>
				<div className="text-2xl md:text-3xl font-bold text-foreground mb-2">{totalCategories.length || 0}</div>
				<div className="text-sm md:text-md text-muted-foreground">Total Categories</div>
			</div>
			<div className="text-center">
				<div className="flex items-center justify-center w-16 h-16 bg-foreground rounded-2xl mx-auto mb-4">
					<Download className="w-8 h-8 text-background" />
				</div>
				<div className="text-2xl md:text-3xl font-bold text-foreground mb-2">{isLoading ? "0" : totalDownloads + "+"}</div>
				<div className="text-sm md:text-md text-muted-foreground">Downloads</div>
			</div>
		</>
	);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (searchQuery.trim()) {
			navigate('/books', {
				state: { searchQuery }
			});
		};
	};

	return (
		<section className="section-padding pt-30 md:pt-44">
			<div className="container">
				<div className="text-center">
					<h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
						Explore Books.
						<br />
						Expand Your Mind.
					</h2>
					<p className="text-md md:text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
						Access thousands of books, audiobooks, and digital resources — all in one place. Dive into stories, unlock ideas, and elevate your understanding with our modern digital library.
					</p>

					{/* Search Bar */}
					<form onSubmit={handleSubmit} className="max-w-2xl mx-auto relative mb-16">
						<div className="relative">
							<Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
							<input
								type="text"
								placeholder="Search books, authors, or topics..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full pl-16 pr-6 py-4 md:py-5 text-lg border-2 border-input rounded-2xl focus:ring-2 focus:ring-ring focus:border-border shadow-lg bg-card"
							/>
							<Button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 p-6! rounded-xl transition-colors font-medium">Search</Button>
						</div>
					</form>

					{/* Quick Stats */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">{heroStatsElement}</div>
				</div>
			</div>
		</section>
	);
}
