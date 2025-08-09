import Card from "@/components/ui/Card";
import { Star } from "lucide-react";
import { timeAgo, getInitials } from "@/lib/utils";
import Loader from "@/components/ui/Loader";

export default function BookComment({ comments, isCommentRefetching }) {
	return (
		<Card>
			<div className="flex justify-between items-center mb-8">
				<h3 className="text-xl md:text-2xl font-bold text-foreground">Reviews ({comments.length})</h3>
				{isCommentRefetching && (
					<div className="flex items-center space-x-2">
						<Loader className="animate-pulse mr-4" />
						<p className="hidden md:block text-sm animate-pulse text-gray-500">Loading comments...</p>
					</div>
				)}
			</div>

			<div className="space-y-8 max-h-[400px] overflow-y-auto pr-8">
				{comments.length === 0 && <p className="text-muted-foreground">No comments yet.</p>}
				{comments.map((comment, index) => (
					<div key={index} className="border-b border-border pb-8 last:border-b-0">
						<div className="flex items-start space-x-4">
							<div className="size-9 sm:size-12 bg-foreground rounded-full flex items-center justify-center">
								<span className="text-sm sm:text-md text-background font-bold">{getInitials(comment.users.name)}</span>
							</div>
							<div className="flex-1">
								<div className="flex items-center space-x-3 mb-1">
									<h4 className="text-sm sm:text-md font-bold text-foreground">{comment.users.name}</h4>
									<span className="text-sm text-gray-600">{timeAgo(comment.created_at)}</span>
								</div>

								<div className="flex items-center space-x-1 mt-0 mb-3">
									{[...Array(5)].map((_, i) => (
										<Star key={i} className={`w-4 h-4 ${i < comment.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
									))}
								</div>
								<p className="text-muted-foreground leading-relaxed mb-4">{comment.comment}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</Card>
	);
}
