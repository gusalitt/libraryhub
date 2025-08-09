import { Star, Heart } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Link } from "react-router-dom";

export default function BookCard({ book, onClick, viewMode = "grid" }) {
	const { theme } = useTheme();
	const darkMode = theme === "dark";
	const coverUrl = import.meta.env.VITE_SUPABASE_STORAGE_URL + book.cover_url;

	if (viewMode === "list") {
		return (
			<Link to={`/book/${book.slug}`} className="flex items-center space-x-4 p-4 rounded-2xl cursor-pointer hover:shadow-lg group bg-card border-2 border-border transition-all duration-200 hover:scale-[1.02]">
				<img src={coverUrl || "/placeholder.svg"} alt={book.title} className="w-16 h-20 object-cover rounded-lg shadow-sm" />
				<div className="flex-1 min-w-0">
					<h3 className="font-semibold truncate transition-colors text-foreground">{book.title}</h3>
					<p className="text-sm truncate text-muted-foreground">by {book.author}</p>
					<div className="flex items-center space-x-2 mt-1">
						<div className="flex items-center space-x-1">
							<Star className="w-4 h-4 text-yellow-400 fill-current" />
							<span className="text-sm text-muted-foreground">{book.rating_avg ? book.rating_avg.toFixed(1) : "0.0"}</span>
						</div>
						<span className="inline-block px-2 py-1 rounded-full text-xs bg-accent text-accent-foreground">{book.book_categories?.name}</span>
					</div>
				</div>
				{/* <div className="flex items-center space-x-2">
					{book.price > 0 ? <span className={`font-semibold ${darkMode ? "text-green-400" : "text-green-600"}`}>${book.price}</span> : <span className={`font-semibold ${darkMode ? "text-green-400" : "text-green-600"}`}>Free</span>}
				</div> */}
			</Link>
		);
	}

	return (
		<Link to={`/book/${book.slug}`} className="group cursor-pointer transition-all duration-200 hover:scale-105 rounded-2xl">
			<div className="rounded-xl overflow-hidden bg-card border-2 border-border">
				{/* Book Cover & Free */}	
				<div className="relative">
					<img src={coverUrl || "/placeholder.svg"} alt={book.title} className="w-full h-64 object-cover" />

					{/* {book.price === 0 && <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">Free</div>} */}
				</div>

				<div className="p-4">
					<h3 className="font-semibold mb-1 line-clamp-2 transition-colors text-foreground truncate">{book.title}</h3>
					<p className="text-sm mb-2 text-muted-foreground truncate">by {book.author}</p>

					{/* Rating & Price */}
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-1">
							<Star className="w-4 h-4 text-yellow-400 fill-current" />
							<span className="text-sm text-muted-foreground">{book.rating_avg ? book.rating_avg.toFixed(1) : "0.0"}</span>
						</div>

						{/* {book.price > 0 && <span className={`font-semibold ${darkMode ? "text-green-400" : "text-green-600"}`}>Rp {book.price}</span>} */}
					</div>

					{/* Category */}
					<div className="mt-2">
						<span className="inline-block px-2 py-1 rounded-full text-xs bg-accent text-accent-foreground">{book?.book_categories?.name}</span>
					</div>
				</div>
			</div>
		</Link>
	);
}
