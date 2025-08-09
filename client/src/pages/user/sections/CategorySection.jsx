import { bookCategories } from "@/data/mockData";
import Card from "@/components/ui/Card";
import { CategoryCardSkeleton } from "@/components/skeletons/Skeleton";

export default function CategorySection({ isLoading, totalCategories }) {
	const categoriesWithIcon = !isLoading && totalCategories?.length ? 
		totalCategories.map((cat) => {
					const match = bookCategories.find((b) => b.name.toLowerCase() === cat.name.toLowerCase());
					return {
						...cat,
						icon: match?.icon || "📁",
					};
		}) : [];

	const categoriesCard = isLoading ? (
		<>
			{Array.from({ length: 12 }).map((_, i) => (
				<CategoryCardSkeleton key={i} />
			))}
		</>
	) : (
		<>
			{categoriesWithIcon.map((category, index) => (
				<Card key={index} className="p-6 text-center cursor-pointer transition-all duration-200 hover:shadow-sm group hover:scale-105">
					<div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{category.icon}</div>
					<h4 className="font-semibold text-card-foreground">{category.name}</h4>
					<p className="text-sm text-muted-foreground mt-1">{category.book_count} books</p>
				</Card>
			))}
		</>
	);

	return (
		<section className="section-padding">
			<div className="container">
				<h3 className="text-3xl font-bold text-foreground mb-2">Explore Categories</h3>
				<p className="text-md md:text-lg text-muted-foreground mb-6">Discover books across various genres and topics</p>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">{categoriesCard}</div>
			</div>
		</section>
	);
}
