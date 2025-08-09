import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function UserFooter() {
	return (
		<footer className="border-t bg-background">
			<div className="container pt-15">
				<div className="grid grid-cols-1 md:grid-cols-12 gap-8">
					<div className="flex flex-col items-start md:col-span-6">
						<Link to={"/"} className="font-bold text-2xl mb-3">
							<div className="flex justify-center items-center space-x-3">
								<div className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center">
									<BookOpen className="w-5.5 h-5.5 text-background" />
								</div>
								<h1 className="text-2xl font-bold">LibraryHub</h1>
							</div>
						</Link>
						<p className="text-muted-foreground">Your digital gateway to endless knowledge and entertainment.</p>
					</div>

					<div className="md:col-span-2">
						<h5 className="font-semibold mb-4">Library</h5>
						<ul className="space-y-2 text-muted-foreground">
							<li>
								<a href="#" className="hover:text-foreground transition-colors">
									Browse Books
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-foreground transition-colors">
									New Releases
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-foreground transition-colors">
									Best Sellers
								</a>
							</li>
						</ul>
					</div>

					<div className="md:col-span-2">
						<h5 className="font-semibold mb-4">Support</h5>
						<ul className="space-y-2 text-muted-foreground">
							<li>
								<a href="#" className="hover:text-foreground transition-colors">
									Help Center
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-foreground transition-colors">
									Contact Us
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-foreground transition-colors">
									FAQ
								</a>
							</li>
						</ul>
					</div>
					
					<div className="md:col-span-2">
						<h5 className="font-semibold mb-4">Company</h5>
						<ul className="space-y-2 text-muted-foreground">
							<li>
								<a href="#" className="hover:text-foreground transition-colors">
									About
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-foreground transition-colors">
									Careers
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-foreground transition-colors">
									Privacy
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="border-t border-border mt-12 py-6 text-center text-gray-400">
					<p>&copy; 2025 LibraryHub. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}
