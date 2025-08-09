import { mockBooks } from "@/data/mockData";
import BookCard from "@/components/BookCard";
import Button from "@/components/ui/Button";
import { BookCardSkeleton } from "@/components/skeletons/Skeleton";
import { Link } from "react-router-dom";

export default function LatestArrivalSection({ isLoading, latestBooks }) {
	const latestBooksElement = isLoading ? (
		<>
			{Array.from({ length: 10 }).map((_, i) => (
				<BookCardSkeleton key={i} />
			))}
		</>
	) : (
		<>
			{latestBooks.map((book, index) => (
				<BookCard key={index} book={book} />
			))}
		</>
	);
	return (
		<section className="section-padding">
			<div className="container">
				<div className="flex items-center justify-between mb-8">
					<h3 className="text-2xl font-bold text-foreground">Latest Arrivals</h3>
					<Link to={"/books"}>
						<Button variant="outline" className="text-blue-600 hover:text-blue-700 font-medium">
							View All
						</Button>
					</Link>
				</div>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">{latestBooksElement}</div>
			</div>
		</section>
	);
}
