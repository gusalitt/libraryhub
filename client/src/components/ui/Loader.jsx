export default function Loader({ size = "md", className = "", }) {
	const sizeMap = {
		sm: "h-4 w-4 border-2",
		md: "h-6 w-6 border-4",
		lg: "h-8 w-8 border-4",
	}; 

	return (
		<div className={`flex items-center justify-center ${className}`}>
			<div className={`animate-spin rounded-full border-t-transparent border-gray-600 ${sizeMap[size]}`} role="status" />
		</div>
	);
}
