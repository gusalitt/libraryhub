import Button from "@/components/ui/Button";
import { Link } from "react-router-dom";
import Card from "@/components/ui/Card";
import { Play, Heart, Bookmark, Share2, Download } from "lucide-react";
import { useState } from "react";
import { fetchSignedBookFile } from "@/services/bookService";
import Loader from "@/components/ui/Loader";

export default function BookCover({ book }) {
	const [isLiked, setIsLiked] = useState(false);
	const [isSaved, setIsSaved] = useState(false);
	const [isDownloading, setisDownloading] = useState(false);
	const { data } = book || {};

	const handleShare = () => {
		if (navigator.share) {
			navigator
				.share({
					title: data.title,
					text: `"${data.title}" — a book worth exploring. Find it now on LibraryHub.`,
					url: window.location.href,
				})
				.catch(console.error);
		} else {
			alert("Sharing not supported on this browser.");
		}
	};

	const handleDownload = async (path, filename) => {
		try {
			setisDownloading(true);

			const response = await fetchSignedBookFile(data.slug, path, filename);

			const blob = new Blob([response.data], { type: "application/pdf" });
			const url = window.URL.createObjectURL(blob);

			const a = document.createElement("a");
			a.href = url;
			a.download = filename + ".pdf";
			document.body.appendChild(a);
			a.click();
			a.remove();
			window.URL.revokeObjectURL(url);
		} catch (error) {
			console.error('Error downloading book:', error);
		} finally {
			setisDownloading(false);
		}
	};

	const coverUrl = import.meta.env.VITE_SUPABASE_STORAGE_URL + data.cover_url;

	return (
		<Card>
			<img src={coverUrl || "/placeholder.svg"} alt={data.title} className="w-full h-96 object-cover rounded-2xl mb-8 shadow-md" />

			<div className="space-y-4">
				<Button asChild className="w-full mb-5 py-7 rounded-xl font-bold text-[1.1rem] space-x-2">
					<Link to={`/book/${data.slug}/view`}>
						<Play className="w-5 h-5" />
						<span>Read Book</span>
					</Link>
				</Button>

				<div className="grid grid-cols-2 gap-3">
					{/* <Button
						variant="outline"
						onClick={() => setIsLiked(!isLiked)}
						className={`py-6 rounded-xl border-2 transition-colors 
									${isLiked ? "bg-red-600 hover:bg-red-600 text-white" : ""}`}
					>
						<Heart className={`w-5 h-5 ${isLiked ? "fill-white stroke-none" : ""} `} />
					</Button>

					<Button
						variant="outline"
						onClick={() => setIsSaved(!isSaved)}
						className={`py-6 rounded-xl border-2 transition-colors 
												${isSaved ? "bg-yellow-600 hover:bg-yellow-600 text-white" : ""}`}
					>
						<Bookmark className={`w-5 h-5 ${isSaved ? "fill-white stroke-none" : ""}`} />
					</Button> */}

					<Button variant="outline" onClick={handleShare} className="py-6 rounded-xl border-2 transition-colors">
						<Share2 className="w-5 h-5" />
					</Button>

					<Button onClick={() => handleDownload(data.file_url, data.title)} variant="outline" className="py-6 rounded-xl border-2 transition-colors">
						{isDownloading ? <Loader size="sm" /> : <Download className="w-5 h-5 text-foreground" />}
					</Button>
				</div>
			</div>
		</Card>
	);
}
