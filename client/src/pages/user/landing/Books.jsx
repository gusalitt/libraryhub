import { useState, useEffect } from "react";
import { Search, Grid, List } from "lucide-react";
import { mockBooks, bookCategories } from "@/data/mockData";
import BookCard from "@/components/BookCard";
import Pagination from "@/components/ui/Pagination";
import SelectFilter from "@/components/ui/SelectFilter";
import { useLocation } from "react-router-dom";
import useFilteredBooks from "@/hooks/useFilteredBooks";
import { BookCardSkeleton } from "@/components/skeletons/Skeleton";

export default function Books({ onNavigate }) {
	const [viewMode, setViewMode] = useState("grid");
	const location = useLocation();

	useEffect(() => {
		// Get search query from search bar in home page of hero section
		if (location.state?.searchQuery) {
			setFilters({ ...filters, search: location.state.searchQuery });
		}
		
		// Get category from onClick in category card in categories page
		if (location.state?.category) {
			setFilters({ ...filters, category: location.state.category });
		}
	}, [location.state]);

	const { isLoading, currentPage, setCurrentPage, totalPages, filters, setFilters, paginatedBooks, categories, bookFoundCount } = useFilteredBooks({
		search: "",
		category: "all",
		rating: "all",
		price: "all",
		sortBy: "popular",
	});

	const paginatedBooksElement = isLoading ? (
		<>
			{Array.from({ length: 10 }).map((_, i) => (
				<BookCardSkeleton key={i} />
			))}
		</>
	) : (
		<>
			{paginatedBooks.map((book, index) => (
				<BookCard key={index} book={book} viewMode={viewMode} />
			))}
		</>
	);

	return (
		<div className="section-padding pt-28">
			<div className="container">
				{/* Search Bar */}
				<div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center mb-8">
					<h1 className="text-3xl md:text-4xl font-bold text-foreground mb-5 md:mb-0">Browse Books</h1>
					<div className="relative max-w-2xl w-full">
						<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
						<input
							type="text"
							placeholder="Search books, authors, or topics..."
							value={filters.search}
							onChange={(e) => setFilters({ ...filters, search: e.target.value })}
							className="w-full pl-12 pr-4 py-3.5 md:py-4 bg-card shadow-sm border-2 border-border rounded-xl focus:ring-2 focus:ring-black focus:border-border text-lg"
						/>
					</div>
				</div>

				{/* Filters and Sort Bar */}
				<div className="bg-card rounded-2xl p-6 shadow-sm border border-border mb-8">
					<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
						<div className="flex flex-wrap items-center gap-4">
							{/* Category Filter */}
							<SelectFilter
								value={filters.category}
								onChange={(e) => setFilters({ ...filters, category: e.target.value })}
								options={categories?.map((category) => ({
									value: category.name,
									label: category.name,
								}))}
								placeholder="All Categories"
							/>

							{/* Rating Filter */}
							<SelectFilter
								value={filters.rating}
								onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
								options={[
									{ value: "4.5", label: "4.5+ Stars" },
									{ value: "4.0", label: "4.0+ Stars" },
									{ value: "3.5", label: "3.5+ Stars" },
								]}
								placeholder="All Ratings"
							/>

							{/* Price Filter */}
							{/* <SelectFilter
								value={filters.price}
								onChange={(e) => setFilters({ ...filters, price: e.target.value })}
								options={[
									{ value: "free", label: "Free" },
									{ value: "paid", label: "Paid" },
								]}
								placeholder="All Prices"
							/> */}
						</div>

						<div className="flex items-center space-x-4">
							{/* View Mode */}
							<div className="flex items-center space-x-2">
								<button onClick={() => setViewMode("grid")} className={`p-3 rounded-xl ${viewMode === "grid" ? "bg-foreground text-background" : "border-2 border-border text-foreground hover:bg-accent"}`}>
									<Grid className="w-4 h-4" />
								</button>
								<button onClick={() => setViewMode("list")} className={`p-3 rounded-xl ${viewMode === "list" ? "bg-foreground text-background" : "border-2 border-border text-foreground hover:bg-accent"}`}>
									<List className="w-4 h-4" />
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Results Info */}
				<div className="flex items-center justify-between mb-8">
					<div>
						<h2 className="text-2xl font-bold text-foreground">{bookFoundCount} books found</h2>
						<p className="text-gray-600">
							{filters.search && `Results for "${filters.search}"`}
							{filters.category !== "all" && ` in ${filters.category}`}
						</p>
					</div>
				</div>

				{/* Books Grid/List */}
				<div className={`mb-12 ${viewMode === "grid" ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-8" : "space-y-3 sm:space-y-6"}`}>{paginatedBooksElement}</div>
				{paginatedBooks.length === 0 && filters.search ? (
					<div className="text-center py-16">
						<div className="w-20 h-20 md:w-24 md:h-24 bg-foreground rounded-full flex items-center justify-center mx-auto mb-4">
							<Search className="w-8 h-8 text-background" />
						</div>
						<h3 className="text-lg font-medium text-foreground mb-2">No books found</h3>
						<p className="text-gray-500">Try adjusting your search or filters</p>
					</div>
				) : ''}

				{/* Pagination */}
				{!isLoading && <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />}
			</div>
		</div>
	);
}
