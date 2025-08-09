import { useState, useEffect, useMemo } from "react";
import { ArrowLeft, BookOpen, Search } from "lucide-react";
import { bookCategories } from "@/data/mockData";
import Button from "@/components/ui/Button";
import { fetchCategories } from "@/services/landingService";
import { CategoryCardSkeleton } from "@/components/skeletons/Skeleton";
import useCategoriesWithIcon from "@/hooks/useCategoriesWithIcon";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "@/hooks/useDebounce";
import ErrorPage from "@/components/ErrorPage";
import { useNavigate, Link } from "react-router-dom";

export default function Categories({ onNavigate }) {
	const [searchQuery, setSearchQuery] = useState("");
	const debounceValue = useDebounce(searchQuery, 500);
	const { isLoading, error, data } = useQuery({
		queryKey: ["categories"],
		queryFn: fetchCategories,
	});

	// Add icon for each category name
	const categoriesWithIcon = useCategoriesWithIcon(data?.data?.data);

	// Filter categories if search query is not empty
	const filteredCategories = useMemo(() => {
		if (!debounceValue) return categoriesWithIcon;

		return categoriesWithIcon.filter((category) => category.name.toLowerCase().includes(debounceValue.toLowerCase()));
	}, [categoriesWithIcon, debounceValue]);

	return (
		<>
			{error ? (
				<ErrorPage message={error.message} errorCode={error.code || 500} />
			) : (
				<div className="section-padding pt-28">
					<div className="container">
						{/* Hero Section */}
						<div className="text-center mb-16">
							<h2 className="text-4xl font-bold text-foreground mb-6">Explore by Category</h2>
							<p className="text-md md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">Discover books across various genres and topics. From fiction to science, find exactly what you're looking for in our organized collection.</p>
						</div>

						{/* Search Categories */}
						<div className="mb-12">
							<div className="relative max-w-xl mx-auto">
								<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
								<input
									type="text"
									placeholder="Search categories..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="w-full pl-12 pr-4 py-4 bg-card shadow-sm border-2 border-border rounded-xl focus:ring-2 focus:ring-black focus:border-border text-lg"
								/>
							</div>
						</div>

						{/* Categories Grid */}
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">{categoriesCard(isLoading, filteredCategories)}</div>

						{/* No Results */}
						{filteredCategories.length === 0 && searchQuery && (
							<div className="text-center py-16">
								<div className="w-24 h-24 bg-foreground rounded-full flex items-center justify-center mx-auto mb-4">
									<Search className="w-8 h-8 text-background" />
								</div>
								<h3 className="text-lg font-medium text-foreground mb-2">No categories found</h3>
								<p className="text-gray-500">Try a different search term</p>
							</div>
						)}

						{/* Popular Categories Highlight */}
						<div className="mt-20">
							<h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">Most Popular Categories</h3>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-8">{popularCategories(isLoading, categoriesWithIcon)}</div>
						</div>

						{/* CTA Section */}
						<div className="mt-20 bg-foreground rounded-2xl px-12 py-16 text-center">
							<h3 className="text-2xl md:text-3xl font-bold text-background mb-4">Ready to Explore More?</h3>
							<p className="text-md md:text-xl text-muted-foreground mb-8 w-[85%] mx-auto">Browse our complete collection of books or learn more about how this library project works and why it matters.</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Button variant="outline" className="px-8 !py-6 font-bold md:text-lg!">
									<Link to="/books">Browse All Books</Link>
								</Button>
								<Button variant="outline" className="bg-foreground text-background px-8 py-6 border-2 md:text-lg! border-background!">
									<Link to="/about">Learn More</Link>
								</Button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

function categoriesCard(isLoading, filteredCategories) {
	const navigate = useNavigate();

	const handleClick = (categoryName) => {
		navigate("/books", {
			state: { category: categoryName },
		});
	};
	return isLoading ? (
		<>
			{Array.from({ length: 12 }).map((_, i) => (
				<CategoryCardSkeleton key={i} />
			))}
		</>
	) : (
		<>
			{filteredCategories.length > 0 &&
				filteredCategories.map((category, index) => (
					<div key={index} onClick={() => handleClick(category.name)} className="group bg-card border-2 border-border rounded-2xl py-3 px-5 shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 hover:scale-105">
						<div className="text-center">
							{/* Icon */}
							<div className="w-15 h-15 bg-foreground md:bg-transparent md:group-hover:bg-foreground rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300">
								<span className="text-4xl group-hover:scale-110 transition-transform">{category.icon}</span>
							</div>

							{/* Info */}
							<h3 className="text-xl font-bold text-foreground transition-colors mb-2">{category.name}</h3>
							<p className="text-muted-foreground mb-4">{category.book_count} books available</p>

							{/* Button */}
							<button className="w-full bg-foreground md:bg-transparent md:group-hover:bg-foreground text-background sm:text-muted-foreground group-hover:text-background py-3 rounded-xl transition-all duration-300 font-medium">
								Browse {category.name}
							</button>
						</div>
					</div>
				))}
		</>
	);
}

function popularCategories(isLoading, categoriesWithIcon) {
	return isLoading ? (
		<>
			{Array.from({ length: 3 }).map((_, i) => (
				<CategoryCardSkeleton key={i} />
			))}
		</>
	) : (
		<>
			{categoriesWithIcon.length > 0 &&
				categoriesWithIcon.slice(0, 3).map((category, index) => (
					<div key={index} onClick={() => onNavigate("books")} className="group bg-card border-2 border-border rounded-2xl p-8 cursor-pointer hover:bg-primary-foreground transition-all duration-300">
						<div className="text-center">
							<div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{category.icon}</div>
							<h4 className="text-2xl font-bold mb-2">{category.name}</h4>
							<p className="text-muted-foreground mb-6">{category.book_count} books</p>
							<div className="w-full h-1 bg-secondary rounded-full">
								<div className="h-full bg-muted-foreground rounded-full transition-all duration-500 group-hover:w-full" style={{ width: `${Math.min(100, (category.book_count / 200) * 100)}%` }} />
							</div>
						</div>
					</div>
				))}
		</>
	);
}
