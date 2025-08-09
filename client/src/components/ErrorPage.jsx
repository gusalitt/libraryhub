import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function ErrorPage({ 
	message, 
	errorCode,
	className,
	onGoHome = () => (window.location.href = "/"), 
	onReload = () => window.location.reload() 
}) {
	// Determine content based on error code
	const getErrorContent = () => {
		switch (errorCode) {
			case 404:
				return {
					emoji: "🕵️",
					title: "Page not found",
					description: "The page you're looking for seems to have wandered off. Let's get you back on track!",
				};
			case 500:
				return {
					emoji: "⚠️",
					title: "Server Error",
					description: "Something went wrong on our end. We're working to fix it. Please try again in a moment.",
				};
			case 403:
				return {
					emoji: "🔒",
					title: "Access Denied",
					description: "You don't have permission to access this resource. Please check your credentials.",
				};
			case 503:
				return {
					emoji: "⌛",
					title: "Service Unavailable",
					description: "We're currently undergoing maintenance. Please try again later.",
				};
			default:
				return {
					emoji: "❌",
					title: "Something went wrong",
					description: "An unexpected error occurred. Don't worry, it happens to the best of us!",
				};
		}
	};

	const errorContent = getErrorContent();
	const displayMessage = message || errorContent.title;

	return (
		<div className={cn("min-h-screen bg-background flex flex-col items-center justify-center p-6 space-y-6 scale-80", className)}>
			{/* Error Icon/Emoji */}
			<div className="flex justify-center">
				<div className="w-24 h-24 bg-secondary/50 text-foreground rounded-full flex items-center justify-center border-border border-2 transition-transform duration-300 hover:scale-105">
					<span className="text-5xl" role="img" aria-label="Error icon">
						{errorContent.emoji}
					</span>
				</div>
			</div>

			{/* Error Code Badge */}
			{errorCode && <div className="inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold bg-secondary/50 text-foreground border-border border-2">Error {errorCode}</div>}

			{/* Main Headline */}
			<h1 className="text-2xl md:text-4xl font-bold text-foreground text-center">Oops, something went wrong!</h1>

			{/* Dynamic Message */}
			<p className="text-lg font-medium text-muted-foreground text-center">{displayMessage}</p>

			{/* Description */}
			<p className="text-md text-muted-foreground leading-relaxed text-center max-w-2xl">{errorContent.description}</p>

			{/* Action Buttons */}
			<div className="flex flex-row gap-4 pt-6">
				{/* Primary Button - Reload */}
				<Button
					onClick={onReload}
					size="lg"
					className="py-6"
					aria-label="Reload the current page"
				>
					<span className="flex items-center justify-center gap-2">
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
						</svg>
						Reload Page
					</span>
				</Button>

				{/* Secondary Button - Go Home */}
				<Button
					onClick={onGoHome}
					size="lg"
					variant="secondary"
					className="py-6"
					aria-label="Go back to homepage"
				>
					<span className="flex items-center justify-center gap-2">
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
						</svg>
						Go Home
					</span>
				</Button>
			</div>
		</div>
	);
};

