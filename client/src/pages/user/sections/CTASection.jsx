import Button from "@/components/ui/Button";
import { Link } from "react-router-dom";

export default function CTASection() {
	return (
		<section className="section-padding">
			<div className="container text-center pb-8">
				<h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Start Your Reading Journey Today</h3>
				<p className="text-md md:text-xl text-muted-foreground mb-8">Join thousands of readers and discover your next favorite book. Access our entire library for free.</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Link to={"/books"}>
						<Button className="py-7 px-8 rounded-xl transition-colors font-bold md:text-lg!">
							Browse Books
						</Button>
					</Link>

					<Link to={"/categories"}>
						<Button variant="outline" className="py-7 px-8 rounded-xl transition-colors font-bold md:text-lg!">
							Explore Categories
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
}
