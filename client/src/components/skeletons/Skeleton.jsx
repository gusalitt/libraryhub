import { cn } from "@/lib/utils";
import Card from "@/components/ui/Card";
import useIsMobile from "@/hooks/useIsMobile";

export function HeroStatsSkeleton() {
	return (
		<>
			{Array.from({ length: 4 }).map((_, i) => (
				<div key={i} className="text-center animate-pulse">
					<div className="flex items-center justify-center w-16 h-16 bg-accent rounded-2xl mx-auto mb-4" />
					<div className="h-6 w-16 bg-accent rounded mx-auto mb-2" />
					<div className="h-4 w-24 bg-accent rounded mx-auto" />
				</div>
			))}
		</>
	);
}

export function CategoryCardSkeleton({ className }) {
	return (
		<div className={cn("bg-card border-2 border-border rounded-xl p-6 text-center animate-pulse cursor-default", className)}>
			<div className="w-10 h-10 mx-auto mb-3 bg-accent rounded-full group-hover:scale-110 transition-transform" />
			<div className="h-4 w-1/2 bg-accent rounded mx-auto mb-2" />
			<div className="h-3 w-1/3 bg-accent rounded mx-auto" />
		</div>
	);
}

export function BookCardSkeleton() {
	return (
		<div className="group transition-all duration-200 hover:scale-105 rounded-2xl">
			<div className="rounded-xl overflow-hidden bg-card border-2 border-border animate-pulse">
				{/* Cover */}
				<div className="relative w-full h-64 bg-accent" />

				<div className="p-4 pb-2 space-y-2">
					{/* Title */}
					<div className="h-4 w-3/4 bg-accent rounded" />
					{/* Author */}
					<div className="h-3 w-1/2 bg-accent rounded" />

					{/* Rating & Price */}
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<div className="w-4 h-4 bg-accent rounded-full" />
							<div className="h-3 w-6 bg-accent rounded" />
						</div>
						{/* <div className="h-4 w-10 bg-accent rounded" /> */}
					</div>

					{/* Category badge */}
					<div className="mt-4">
						<div className="inline-block h-5 w-20 rounded-full bg-accent" />
					</div>
				</div>
			</div>
		</div>
	);
}

export function BookCoverSkeleton() {
	return (
		<Card className="animate-pulse">
			{/* Book Cover */}
			<div className="w-full h-96 bg-accent rounded-2xl mb-8" />

			{/* Read Book Button */}
			<div className="w-full h-12 bg-accent rounded-xl mb-5" />

			{/* Action Buttons */}
			<div className="grid grid-cols-2 gap-3">
				{Array.from({ length: 2 }).map((_, i) => (
					<div key={i} className="h-12 bg-accent rounded-xl" />
				))}
			</div>
		</Card>
	);
}

export function BookStatisticsSkeleton() {
	return (
		<Card className="mt-6 animate-pulse">
			<div className="h-6 bg-accent rounded w-40 mb-6" />

			<div className="space-y-4">
				{Array.from({ length: 4 }).map((_, i) => (
					<div key={i} className="flex justify-between items-center">
						<div className="h-4 bg-accent rounded w-24" />
						<div className="h-4 bg-accent rounded w-16" />
					</div>
				))}
			</div>
		</Card>
	);
}

export function BookInfoSkeleton() {
	return (
		<Card className="animate-pulse">
			<div className="mb-8 space-y-4">
				{/* Title */}
				<div className="h-10 bg-accent rounded w-3/4" />

				{/* Author */}
				<div className="h-6 bg-accent rounded w-1/2" />

				{/* Rating & Info */}
				<div className="flex flex-wrap items-center gap-6">
					{/* Stars */}
					<div className="flex items-center space-x-2">
						{Array.from({ length: 5 }).map((_, i) => (
							<div key={i} className="w-6 h-6 bg-accent rounded" />
						))}
						<div className="h-5 bg-accent rounded w-24 ml-2" />
					</div>

					<div className="h-6 bg-accent rounded w-24" />
					<div className="h-6 bg-accent rounded w-28" />
				</div>

				{/* Price */}
				<div className="h-8 bg-accent rounded w-24 mt-4" />
			</div>

			{/* About section */}
			<div className="space-y-4 mt-6">
				<div className="h-6 bg-accent rounded w-1/3" />
				<div className="h-5 bg-accent rounded w-full" />
				<div className="h-5 bg-accent rounded w-5/6" />
				<div className="h-5 bg-accent rounded w-2/3" />
			</div>
		</Card>
	);
}

export function BookRatingSkeleton() {
	return (
		<Card className="animate-pulse">
			{/* Title */}
			<div className="h-8 bg-accent rounded w-1/3 mb-6" />

			{/* Star rating row */}
			<div className="flex items-center space-x-3 mb-6">
				<div className="h-5 w-20 bg-accent rounded" />
				{Array.from({ length: 5 }).map((_, i) => (
					<div key={i} className="size-6 md:size-8 bg-accent rounded" />
				))}
				<div className="h-5 w-16 bg-accent rounded" />
			</div>

			{/* Form: textarea + button */}
			<div className="space-y-4">
				<div className="w-full h-32 bg-accent rounded-xl" />
				<div className="h-12 w-40 bg-accent rounded-xl" />
			</div>
		</Card>
	);
}

export function BookCommentSkeleton() {
	return (
		<Card className="animate-pulse">
			{/* Title */}
			<div className="h-8 bg-accent rounded w-1/3 mb-8" />

			{/* Comment List Skeleton */}
			<div className="space-y-8 max-h-[400px] overflow-hidden pr-8">
				{Array.from({ length: 3 }).map((_, idx) => (
					<div key={idx} className="border-b border-border pb-8 last:border-b-0 flex space-x-4">
						{/* Avatar */}
						<div className="size-12 bg-accent rounded-full flex-shrink-0" />

						{/* Text block */}
						<div className="flex-1 space-y-3">
							<div className="flex items-center space-x-3">
								<div className="w-32 h-4 bg-accent rounded" />
								<div className="w-20 h-3 bg-accent rounded" />
							</div>
							{/* Stars */}
							<div className="flex space-x-1">
								{Array.from({ length: 5 }).map((_, i) => (
									<div key={i} className="w-4 h-4 bg-accent rounded" />
								))}
							</div>
							{/* Comment Text */}
							<div className="space-y-2">
								<div className="w-full h-3 bg-accent rounded" />
								<div className="w-5/6 h-3 bg-accent rounded" />
								<div className="w-3/4 h-3 bg-accent rounded" />
							</div>
						</div>
					</div>
				))}
			</div>
		</Card>
	);
}

export function RelatedBooksSkeleton() {
	return (
		<div className="mt-16">
			{/* Header Skeleton */}
			<div className="flex items-center justify-between mb-8">
				<div className="h-8 w-1/3 bg-accent animate-pulse rounded-md" />
				<div className="h-8 w-20 bg-accent animate-pulse rounded-md" />
			</div>

			{/* Book Card Skeletons */}
			<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
				{Array.from({ length: 5 }).map((_, i) => (
					<BookCardSkeleton key={i} />
				))}
			</div>
		</div>
	);
}

export function BookInfoSidebarSkeleton({ mobileSidebarOpen }) {
	const isMobile = useIsMobile();
	const sidebarClass = `w-80 bg-background shadow-md border-r p-6 transition-all duration-300 ${
		isMobile ? `fixed top-29 h-full z-40 ${mobileSidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}` : `relative overflow-y-auto h-auto block z-0 translate-x-0 opacity-100`
	}`;

	return (
		<div className={sidebarClass}>
			<div className="sticky block overflow-y-auto space-y-6 animate-pulse">
				{/* Mini Book Card Skeleton */}
				<Card className="shadow-sm">
					<div className="flex items-start space-x-4">
						<div className="w-16 h-20 bg-accent rounded-lg" />
						<div className="flex-1 min-w-0 space-y-2">
							<div className="h-4 bg-accent rounded w-3/4" />
							<div className="h-3 bg-accent rounded w-1/2" />
							<div className="flex items-center space-x-2">
								<div className="flex space-x-1">
									{[...Array(5)].map((_, i) => (
										<div key={i} className="w-3 h-3 bg-accent rounded-full" />
									))}
								</div>
								<div className="w-6 h-3 bg-accent rounded" />
							</div>
						</div>
					</div>
				</Card>

				{/* Reading Progress Skeleton */}
				<Card className="shadow-sm p-4 space-y-3">
					<div className="h-4 bg-accent rounded w-1/3" />
					<div className="flex justify-between">
						<div className="h-3 bg-accent rounded w-1/4" />
						<div className="h-3 bg-accent rounded w-1/6" />
					</div>
					<div className="h-2 bg-accent rounded-full w-full" />
					<div className="flex justify-between">
						<div className="h-3 bg-accent rounded w-1/4" />
						<div className="h-3 bg-accent rounded w-1/6" />
					</div>
				</Card>

				{/* Reading Flow Skeleton */}
				<Card className="shadow-sm p-4 space-y-3">
					<div className="h-4 bg-accent rounded w-1/3" />
					<div className="space-y-2">
						{[...Array(5)].map((_, i) => (
							<div key={i} className="space-y-1">
								<div className="h-4 bg-accent rounded w-full" />
								<div className="h-3 bg-accent rounded w-1/4" />
							</div>
						))}
					</div>
				</Card>
			</div>
		</div>
	);
}

export function PDFViewerSkeleton() {
	return (
		<div className="flex-1 flex flex-col">
			{/* PDF Viewer Skeleton */}
			<main className="flex-1 flex items-center pt-20 md:pt-22 lg:pt-0 xl:pt-10 pb-10 justify-center bg-background px-4 md:px-8">
				<div className="shadow-gray-300 w-full max-w-5xl h-[80vh] dark:shadow-gray-900 shadow-2xl rounded-lg overflow-hidden">
					<div className="w-full h-full dark:bg-[#1A1A1A] border-2 border-border rounded-lg py-8 relative flex items-center justify-center">
						<div className="w-2/3 h-3/4 bg-accent animate-pulse rounded-lg" />
					</div>
				</div>
			</main>

			{/* Related Books Skeleton */}
			<section className="bg-background border-border border-t-2 pb-10">
				<div className="container space-y-4">
					<RelatedBooksSkeleton />
				</div>
			</section>
		</div>
	);
}
