import { ArrowLeft, BookOpen, Users, Star, Download, Target, Heart, Award, Mail, Phone, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";
import { useQuery } from "@tanstack/react-query";
import { fetchCoreStats } from "@/services/landingService";
import { HeroStatsSkeleton } from "@/components/skeletons/Skeleton";

export default function About() {
	const { isLoading, error, data } = useQuery({
		queryKey: ["stats"],
		queryFn: fetchCoreStats,
	});

	const team = [
		{
			name: "Gus Alit",
			role: "Developer",
			bio: "Built LibraryHub as a fullstack project and learning effort.",
			avatar: "GA",
		},
		{
			name: "Andika Jaya",
			role: "Book Researcher & Compiler",
			bio: "Collects and compiles books to support the library content.",
			avatar: "AJ",
		},
		{
			name: "Sudipa Yasa",
			role: "Book Researcher & Compiler",
			bio: "Helps gather and organize reading material for users.",
			avatar: "SY",
		},
		{
			name: "Malvin",
			role: "Lead Book Researcher & Server Coordinator",
			bio: "Led book research; prepared project server for future use.",
			avatar: "MA",
		},
	];

	const highlights = [
		{
			icon: Target,
			title: "Our Mission",
			description: "To democratize access to knowledge and literature by providing a comprehensive digital library platform.",
		},
		{
			icon: Heart,
			title: "Our Values",
			description: "We believe in the power of reading to transform lives and build stronger communities.",
		},
		{
			icon: Award,
			title: "Our Achievement",
			description: "Recognized as the leading digital library platform with over 1 million satisfied users.",
		},
	];

	// const statsElement = isLoading ? (
	// 	<HeroStatsSkeleton />
	// ) : (
	// 	<>
	// 		<div className="text-center">
	// 			<div className="flex items-center justify-center w-16 h-16 bg-background rounded-2xl mx-auto mb-4">
	// 				<BookOpen className="w-8 h-8 text-foreground" />
	// 			</div>
	// 			<div className="text-2xl md:text-3xl font-bold text-background mb-2">{isLoading ? "0" : data?.data?.data?.totalBooks + "+"}</div>
	// 			<div className="text-sm md:text-md text-muted-foreground">Books Available</div>
	// 		</div>
	// 		<div className="text-center">
	// 			<div className="flex items-center justify-center w-16 h-16 bg-background rounded-2xl mx-auto mb-4">
	// 				<Users className="w-8 h-8 text-foreground" />
	// 			</div>
	// 			<div className="text-2xl md:text-3xl font-bold text-background mb-2">{isLoading ? "0" : data?.data?.data?.ratingAvg + "+"}</div>
	// 			<div className="text-sm md:text-md text-muted-foreground">Rating Average</div>
	// 		</div>
	// 		<div className="text-center">
	// 			<div className="flex items-center justify-center w-16 h-16 bg-background rounded-2xl mx-auto mb-4">
	// 				<Download className="w-8 h-8 text-foreground" />
	// 			</div>
	// 			<div className="text-2xl md:text-3xl font-bold text-background mb-2">{isLoading ? "0" : data?.data?.data?.totalDownloads + "+"}</div>
	// 			<div className="text-sm md:text-md text-muted-foreground">Downloads</div>
	// 		</div>
	// 		<div className="text-center">
	// 			<div className="flex items-center justify-center w-16 h-16 bg-background rounded-2xl mx-auto mb-4">
	// 				<Star className="w-8 h-8 text-foreground" />
	// 			</div>
	// 			<div className="text-2xl md:text-3xl font-bold text-background mb-2">{data?.data?.data?.bookReads || 0}</div>
	// 			<div className="text-sm md:text-md text-muted-foreground">Book Reads</div>
	// 		</div>
	// 	</>
	// );

	return (
		<div className="section-padding pt-15 md:pt-30">
			{/* Hero Section */}
			<section className="section-padding">
				<div className="container text-center">
					<h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-8 leading-tight">Empowering Minds Through Digital Reading</h2>
					<p className="text-md md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
						LibraryHub is more than just a digital library. We're a community of readers, learners, and knowledge seekers committed to making literature and educational resources accessible to everyone, everywhere.
					</p>
				</div>
			</section>

			{/* Mission & Vision */}
			<section className="section-padding">
				<div className="container">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
						<div>
							<h3 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Our Story</h3>
							<div className="space-y-6 text-md md:text-lg text-muted-foreground leading-relaxed">
								<p>
									Launched in July 2025, LibraryHub is a fresh initiative born out of a passion for accessible learning and digital literacy. Built by a small but dedicated team, the platform aims to make high-quality books easily available
									to readers across all backgrounds.
								</p>
								<p>
									Although still in its early stages, LibraryHub has been designed with scalability, modern design, and user experience in mind. Our growing collection includes open-access titles as well as carefully curated works, with
									more features and partnerships on the way.
								</p>
								<p>
									As a newly developed project, we're excited to continuously improve and evolve. LibraryHub is not just a tool—it's a living space for learning, exploration, and community, driven by the belief that knowledge should be free
									and shared widely.
								</p>
							</div>
						</div>
						<div className="bg-foreground rounded-2xl p-8">
							<div className="space-y-8">
								{highlights.map((highlight, index) => (
									<div key={index} className="flex items-start space-x-4">
										<div className="w-12 h-12 bg-background rounded-xl flex items-center justify-center flex-shrink-0">
											<highlight.icon className="w-6 h-6 text-foreground" />
										</div>
										<div>
											<h4 className="text-xl font-bold text-background mb-2">{highlight.title}</h4>
											<p className="text-md text-muted-foreground leading-relaxed">{highlight.description}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			{/* <section className="section-padding !bg-foreground">
				<div className="container">
					<div className="text-center mb-16">
						<h3 className="text-4xl font-bold text-background mb-4">Our Impact in Numbers</h3>
						<p className="text-xl text-muted-foreground">See how we're making a difference in the reading community</p>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
						{statsElement}
					</div>
				</div>
			</section> */}

			{/* Team Section */}
			<section className="section-padding bg-background">
				<div className="container">
					<div className="text-center mb-16">
						<h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Meet Our Team</h3>
						<p className="text-md md:text-xl text-muted-foreground">The passionate people behind LibraryHub</p>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
						{team.map((member, index) => (
							<div key={index} className="bg-background rounded-2xl p-8 py-5 shadow-sm border-2 border-border text-center">
								<div className="w-15 h-15 bg-foreground rounded-full flex items-center justify-center mx-auto mb-6">
									<span className="text-background font-bold text-xl">{member.avatar}</span>
								</div>
								<h4 className="text-xl font-bold text-foreground mb-2">{member.name}</h4>
								<p className="text-muted-foreground font-medium mb-4">{member.role}</p>
								<p className="text-gray-500 leading-relaxed">{member.bio}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Contact/Support CTA */}
			{/* <section className="section-padding pb-15">
				<div className="container text-center">
					<h3 className="text-4xl font-bold text-foreground mb-6">Get in Touch</h3>
					<p className="text-xl text-muted-foreground mb-12">Have questions, suggestions, or need support? We'd love to hear from you.</p>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
						<div className="bg-card border-2 border-border rounded-2xl p-8">
							<div className="w-12 h-12 bg-foreground rounded-xl flex items-center justify-center mx-auto mb-4">
								<Mail className="w-6 h-6 text-background" />
							</div>
							<h4 className="font-bold text-foreground mb-2">Email Us</h4>
							<p className="text-muted-foreground">support@libraryhub.com</p>
						</div>
						<div className="bg-card border-2 border-border rounded-2xl p-8">
							<div className="w-12 h-12 bg-foreground rounded-xl flex items-center justify-center mx-auto mb-4">
								<Phone className="w-6 h-6 text-background" />
							</div>
							<h4 className="font-bold text-foreground mb-2">Call Us</h4>
							<p className="text-muted-foreground">+1 (555) 123-4567</p>
						</div>
						<div className="bg-card border-2 border-border rounded-2xl p-8">
							<div className="w-12 h-12 bg-foreground rounded-xl flex items-center justify-center mx-auto mb-4">
								<MapPin className="w-6 h-6 text-background" />
							</div>
							<h4 className="font-bold text-foreground mb-2">Visit Us</h4>
							<p className="text-muted-foreground">Bali, Indonesia</p>
						</div>
					</div>

					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button className="px-8 py-7 !text-lg">Contact Support</Button>
						<Button variant="outline" className="px-8 py-7 !text-lg">
							Start Reading
						</Button>
					</div>
				</div>
			</section> */}
		</div>
	);
}
