import Button from "@/components/ui/Button";
import { Sun, Moon, ZoomIn as ZoomInIcon, ZoomOut as ZoomOutIcon, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { usePdfPlugin } from "@/contexts/PdfPluginContext";

export default function ReaderHeaderDesktop({ book }) {
	const data = book?.data || {};
	const { theme, toggleTheme } = useTheme();
	const { GoToNextPage, GoToPreviousPage, jumpToPage, CurrentScale, ZoomIn, ZoomOut, totalPage, currentPage, NumberOfPages } = usePdfPlugin();

	const navigate = useNavigate();
	const handleBack = () => {
		navigate(-1);
	};
	return (
		<header className="hidden lg:block bg-background border-b border-border shadow-lg shadow-accent/40 fixed top-0 z-40 w-full">
			<div className="container">
				<div className="flex items-center justify-between h-16">
					<div className="flex justify-center items-center gap-2">
						<Button onClick={handleBack} variant="ghost" className="flex items-center transition-colors">
							<ArrowLeft className="w-5 h-5 mr-2" />
							Back
						</Button>

						<div className="text-foreground">
							<h1 className="font-bold text-lg">{data?.title}</h1>
							<p className="text-sm text-muted-foreground">by {data?.author}</p>
						</div>
					</div>

					<div className="flex justify-center items-center">
						<div className="flex items-center space-x-6">
							{/* Pagination */}
							<div className="flex items-center space-x-3">
								<GoToPreviousPage>
									{(props) => (
										<Button variant="outline" size="icon" onClick={props.onClick} disabled={props.isDisabled}>
											<ChevronLeft className="w-5 h-5" />
										</Button>
									)}
								</GoToPreviousPage>

								<div className="flex items-center space-x-2 text-gray-600">
									<input
										type="number"
										value={currentPage}
										onChange={(e) => {
											const page = parseInt(e.target.value);
											if (!isNaN(page) && page >= 1 && page <= totalPage) {
												jumpToPage(page - 1);
											}
										}}
										className="w-16 px-2 py-1 bg-background border border-border rounded text-center text-foreground focus:ring-2 focus:ring-border focus:border-border"
									/>
									<span className="font-medium text-foreground">
										of <NumberOfPages />
									</span>
								</div>

								<GoToNextPage>
									{(props) => (
										<Button variant="outline" size="icon" onClick={props.onClick} disabled={props.isDisabled}>
											<ChevronRight className="w-5 h-5" />
										</Button>
									)}
								</GoToNextPage>
							</div>

							{/* Zoom */}
							<div className="flex items-center space-x-3">
								<ZoomOut>
									{(props) => (
										<Button variant="outline" size="icon" onClick={props.onClick} disabled={props.isDisabled}>
											<ZoomOutIcon className="w-5 h-5" />
										</Button>
									)}
								</ZoomOut>

								<span className="text-foreground text-sm w-12 text-center font-medium">
									<CurrentScale />
								</span>

								<ZoomIn>
									{(props) => (
										<Button variant="outline" size="icon" onClick={props.onClick} disabled={props.isDisabled}>
											<ZoomInIcon className="w-5 h-5" />
										</Button>
									)}
								</ZoomIn>
							</div>
						</div>

						<Button variant="ghost" size="icon" aria-label="Toggle Theme" className="ml-2" onClick={toggleTheme}>
							{theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
}
