import RelatedBooks from "@/pages/user/book/RelatedBooks";
import BookCover from "@/pages/user/book/BookCover";
import BookStatistics from "@/pages/user/book/BookStatistics";
import BookInfo from "@/pages/user/book/BookInfo";
import BookRating from "@/pages/user/book/BookRating";
import BookComment from "@/pages/user/book/BookComment";
import { ArrowLeft, Sun, Moon } from "lucide-react";
import Button from "@/components/ui/Button";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import UserFooter from "@/pages/user/UserFooter";
import { useQuery } from "@tanstack/react-query";
import { fetchBookDetail } from "@/services/bookService";
import { useState } from "react";
import ErrorPage from "@/components/ErrorPage";
import { BookCoverSkeleton, BookStatisticsSkeleton, BookInfoSkeleton, BookRatingSkeleton, BookCommentSkeleton, RelatedBooksSkeleton } from "@/components/skeletons/Skeleton";

export default function BookDetailPage() {
	const [isCommentRefetching, setIsCommentRefetching] = useState(false);
	const { theme, toggleTheme } = useTheme();
	const { slug } = useParams();
	const navigate = useNavigate();
	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["bookDetail", slug],
		queryFn: async () => await fetchBookDetail(slug),
	});
	const { book, bookRelated, comments } = data?.data?.data || {};

	const handleBack = () => {
		navigate(-1);
	};

	if (error) {
		return <ErrorPage message="Book not found or slug not unique." errorCode={404} />;
	}

	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<header className="bg-background border-b border-border shadow-lg shadow-accent/40 fixed top-0 z-40 w-full">
				<div className="container">
					<div className="flex items-center justify-between h-16">
						<Button onClick={handleBack} variant="ghost" className="pl-0 md:pl-5 flex items-center transition-colors">
							<ArrowLeft className="w-5 h-5 mr-2" />
							Back
						</Button>
						<Button variant="ghost" size="icon" aria-label="Toggle Theme" className="ml-2" onClick={toggleTheme}>
							{theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
						</Button>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-25">
				<div className="grid grid-cols-1 md:grid-cols-7 lg:grid-cols-12 gap-8">
					{/* Book Cover and Actions */}
					<div className="md:col-span-3 lg:col-span-4">
						<div className="sticky top-8">
							{isLoading ? <BookCoverSkeleton /> : <BookCover book={book} />}
							{isLoading ? <BookStatisticsSkeleton /> : <BookStatistics book={book} />}
						</div>
					</div>

					{/* Book Details */}
					<div className="md:col-span-4 lg:col-span-8 space-y-8">
						{isLoading ? <BookInfoSkeleton /> : <BookInfo book={book} />}
						{isLoading ? <BookRatingSkeleton /> : <BookRating onSuccess={async () => {
							setIsCommentRefetching(true);
							await refetch();
							setIsCommentRefetching(false);
						}} />}
						{isLoading ? <BookCommentSkeleton /> : <BookComment comments={comments} isCommentRefetching={isCommentRefetching} />}
					</div>
				</div>

				{/* Related Books */}
				{isLoading ? <RelatedBooksSkeleton /> : <RelatedBooks book={bookRelated} title="More books like this" />}
			</main>

			<UserFooter />
		</div>
	);
}
