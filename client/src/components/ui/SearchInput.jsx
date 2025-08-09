import { Search } from "lucide-react";

export default function SearchInput({ searchQuery, setSearchQuery }) {

	return (
		<div className="relative">
			<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
			<input
				type="text"
				placeholder="Search your library..."
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				className="pl-10 pr-4 py-2 shadow-sm shadow-border border-2 border-border rounded-xl focus:ring-2 focus:ring-black focus:border-black w-64"
			/>
		</div>
	);
}
