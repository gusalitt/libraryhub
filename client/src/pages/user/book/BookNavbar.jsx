

export default function BookNavbar({ children }) {

	return (
		<header className="bg-background border-b border-border shadow-lg shadow-accent/40 fixed top-0 z-40 w-full">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<Link to="/user" state={{ user: [] }}>
						<Button variant="ghost" className="flex items-center transition-colors">
							<ArrowLeft className="w-5 h-5 mr-2" />
							Back
						</Button>
					</Link>

                    { children }

					<Button variant="ghost" size="icon" aria-label="Toggle Theme" className="ml-2" onClick={toggleTheme}>
						{theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
					</Button>
				</div>
			</div>
		</header>
	);
}
