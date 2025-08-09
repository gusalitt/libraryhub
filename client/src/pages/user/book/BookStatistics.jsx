import Card from "@/components/ui/Card";
export default function BookStatistics({ book }) {
	return (
		<Card className="mt-6">
			<h3 className="font-bold text-foreground mb-4">Book Statistics</h3>
			<div className="space-y-3">
				<div className="flex justify-between">
					<span className="text-foreground">Pages</span>
					<span className="font-medium text-card-foreground">{book?.data.pages || 0}</span>
				</div>
				{/* <div className="flex justify-between">
					<span className="text-foreground">Likes</span>
					<span className="font-medium text-card-foreground">{book?.data.likes}</span>
				</div>
				<div className="flex justify-between">
					<span className="text-foreground">Favorites</span>
					<span className="font-medium text-card-foreground">{book?.data.favorites}</span>
				</div> */}
				<div className="flex justify-between">
					<span className="text-foreground">Estimated File Size</span>
					<span className="font-medium text-card-foreground">{book?.data.file_size} MB</span>
				</div>
				<div className="flex justify-between">
					<span className="text-foreground">Category</span>
					<span className="font-medium text-card-foreground">{book?.data.book_categories.name}</span>
				</div>
				<div className="flex justify-between">
					<span className="text-foreground">Views</span>
					<span className="font-medium text-card-foreground">{book?.data.views || 0}</span>
				</div>
				<div className="flex justify-between">
					<span className="text-foreground">Downloads</span>
					<span className="font-medium text-card-foreground">{book?.data.downloads || 0}+</span>
				</div>
			</div>
		</Card>
	);
}
