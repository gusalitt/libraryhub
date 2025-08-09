import Card from "@/components/ui/Card";
import { Star } from "lucide-react";
import { formatMonthYear } from "@/lib/utils";

export default function BookInfo({ book }) {	
	
	return (
		<Card>
			<div className="mb-8">
				<h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">{book?.data?.title}</h1>
				<p className="font-medium text-2xl text-gray-600 mb-6">by {book?.data?.author}</p>

				<div className="flex flex-wrap items-center gap-6 mb-6">
					<div className="flex items-center space-x-2">
						{[...Array(5)].map((_, i) => (
							<Star key={i} className={`w-6 h-6 ${i < Math.floor(book?.data?.rating_avg) ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
						))}
						<span className="text-gray-600 ml-2 font-medium">
							{book?.data?.rating_avg ? book?.data?.rating_avg.toFixed(1) : "0.0"}
						</span>
					</div>

					<span className="text-gray-500 font-medium">Published {formatMonthYear(book?.data?.upload_date)}</span>
				</div>

				{/* {book?.data?.price > 0 ? <div className="text-3xl font-bold text-green-600">${book?.data?.price}</div> : <div className="text-3xl font-bold text-green-600">Free</div>} */}
			</div>

			<div className="prose max-w-none">
				<h3 className="text-2xl font-bold text-foreground mb-4">About this book</h3>
				<p className="text-muted-foreground leading-relaxed text-lg mb-6">{book?.data?.description || "No description available."}</p>
			</div>
		</Card>
	);
}
