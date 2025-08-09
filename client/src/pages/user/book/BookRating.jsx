import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import { Star } from "lucide-react";
import { use, useState } from "react";
import { fetchBookComments } from "@/services/bookService";
import { useMutation } from "@tanstack/react-query";
import { useParams, useNavigate, Link } from "react-router-dom";
import { formattedErrors } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

export default function BookRating({ onSuccess }) {
	const [userRating, setUserRating] = useState(0);
	const [comment, setComment] = useState("");
	const [errors, setErrors] = useState({});
	const { slug } = useParams();
	const { user } = useAuth();
	const navigate = useNavigate();
	const { mutate, isPending } = useMutation({
		mutationFn: ({ slug, data }) => fetchBookComments(slug, data),
		onSuccess: () => {
			// Invalidate the book detail query to refresh the comments
			onSuccess();
			setUserRating(0);
			setComment("");
			setErrors({});
		},
		onError: (error) => {
			if (error.response?.data?.errors) {
				const formatted = formattedErrors(error.response?.data?.errors);
				setErrors(formatted);
			}
		},
	});

	const validateComment = () => {
		const errors = {};

		if (!comment.trim()) {
			errors.comment = "Comment cannot be empty.";
		}

		if (userRating === 0) {
			errors.rating = "Please select a rating.";
		}

		if (userRating > 5 || userRating < 1) {
			errors.rating = "Rating must be between 1 and 5.";
		}

		setErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmitComment = (e) => {
		e.preventDefault();

		if (!user) {
			navigate("/login");
			return;
		}

		if (validateComment()) {
			mutate({
				slug,
				data: {
					rating: parseInt(userRating),
					comment: comment.trim(),
				},
			});
		}
	};

	return (
		<Card>
			<h3 className="text-2xl font-bold text-foreground mb-6">Rate and Review</h3>
			{!user ? (
				<div className="bg-yellow-50 text-yellow-800 border border-yellow-300 p-4 rounded-lg mb-6 text-sm flex gap-2">
					Please
					<Link to="/login" className="underline font-medium">Log In</Link>
					to rate and write a review.
				</div>
			) : null}
			<div className="flex items-center space-x-3 mb-6">
				<span className="text-gray-600 font-medium text-sm md:text-lg">Your rating:</span>
				{[...Array(5)].map((_, i) => (
					<button 
						key={i} 
						onClick={() => setUserRating(i + 1)} 
						className="focus:outline-none"
						disabled={!user}
					>
						<Star className={`size-6 md:size-8 transition-colors ${i < userRating ? "text-yellow-400 fill-current" : "text-gray-300 hover:text-yellow-400"}`} />
					</button>
				))}
				{userRating > 0 && user && (
					<span className="text-gray-600 ml-2 font-medium text-sm md:text-md">
						({userRating} star{userRating !== 1 ? "s" : ""})
					</span>
				)}
			</div>
			{errors?.rating && <p className="mb-4 -mt-3 text-sm text-red-600">{errors?.rating}</p>}

			<form onSubmit={handleSubmitComment} className="space-y-4">
				<textarea
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					placeholder="Share your thoughts about this book..."
					rows={4}
					disabled={!user}
					className={`w-full px-4 py-4 border-2 border-input rounded-xl focus:ring-2 focus:ring-black focus:border-black resize-none text-lg ${errors?.comment ? "border-red-500" : "border-gray-200"}`}
				/>
				{errors?.comment && <p className="-mt-1 text-sm text-red-600">{errors?.comment}</p>}

				<Button 
					size="lg" 
					disabled={!user || !comment.trim() || userRating === 0} 
					variant={isPending ? "outline" : "default"} 
					className="py-6! rounded-xl font-medium disabled:!cursor-not-allowed" 
					type="submit"
				>
					{isPending && <Loader className="mr-5" />}
					Submit Review
				</Button>
			</form>
		</Card>
	);
}
