import Button from "@/components/ui/Button";
import { Sun, Moon, ZoomIn as ZoomInIcon, ZoomOut as ZoomOutIcon, ChevronLeft, ChevronRight, ArrowLeft, X, Menu } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { usePdfPlugin } from "@/contexts/PdfPluginContext";
import { useNavigate } from "react-router-dom";

export default function ReaderHeaderMobile({ book, mobileSidebarOpen, setMobileSidebarOpen }) {
	const data = book?.data || {};
	const { theme, toggleTheme } = useTheme();
	const navigate = useNavigate();
	const { GoToNextPage, GoToPreviousPage, jumpToPage, CurrentScale, ZoomIn, ZoomOut, totalPage, currentPage, NumberOfPages } = usePdfPlugin();

	const toggleMobileSidebar = () => {
		setMobileSidebarOpen(!mobileSidebarOpen);
	};
	const handleBack = () => {
		navigate(-1);
	};

	return (
		<header className="block lg:hidden bg-background border-b border-border shadow-lg shadow-accent/40 fixed top-0 z-50 w-full">
			<div className="container border-b-2 border-border">
				<div className="flex items-center justify-between h-16">
					<div className="flex justify-center items-center gap-2">
						<Button onClick={handleBack} variant="ghost" className="pl-0 flex items-center transition-colors">
							<ArrowLeft className="w-5 h-5 mr-2" />
							Back
						</Button>
					</div>
					<div className="text-foreground text-center">
						<h1 className="font-bold text-lg truncate">{data?.title}</h1>
						<p className="text-sm text-muted-foreground truncate">by {data?.author}</p>
					</div>

					<div className="flex justify-center items-center">
						<Button variant="ghost" size="icon" aria-label="Toggle Theme" className="ml-2" onClick={toggleTheme}>
							{theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
						</Button>
					</div>
				</div>
			</div>

			<div className="container bg-background border-b-2 border-border">
				<div className="flex justify-between items-center p-2">
					<div className="text-foreground flex lg:hidden">
						<Button variant="ghost" size="icon" aria-label="Toggle mobile menu" onClick={toggleMobileSidebar}>
							{mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
						</Button>
					</div>

					<div className="flex items-center space-x-6">
						{/* Pagination */}
						<div className="flex items-center space-x-3 mr-0 md:mr-5">
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
						<div className="hidden md:flex  items-center space-x-3">
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
				</div>
			</div>
		</header>
	);
}
