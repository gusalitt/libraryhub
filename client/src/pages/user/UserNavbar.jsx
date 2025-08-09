import { Link, NavLink } from "react-router-dom";
import { Moon, Sun, X, Menu, BookOpen } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import { useTheme } from "@/contexts/ThemeContext";
import { cn, getInitials } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { logoutUser } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";

export default function UserNavbar() {
	const { theme, toggleTheme } = useTheme();
	const { user, setShouldFetchUser } = useAuth();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [profileMenuOpen, setProfileMenuOpen] = useState(false);
	const menuRef = useRef(null);
	const { mutate: logout } = useMutation({
		mutationFn: () => logoutUser(),
		onSuccess: () => {
			setShouldFetchUser(false);
			setProfileMenuOpen(false);
			setMobileMenuOpen(false);
			window.location.href = "/";
		},
		onError: (error) => {
			console.error("Logout failed:", error);
		},
	});

	const toggleMobileMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen);
	};

	const navItems = [
		{ name: "Home", href: "/" },
		{ name: "Books", href: "/books" },
		{ name: "Categories", href: "/categories" },
		{ name: "About", href: "/about" },
	];

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setMobileMenuOpen(false);
				setProfileMenuOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [profileMenuOpen, mobileMenuOpen]);

	const backdropClass = !mobileMenuOpen ? "backdrop-blur supports-[backdrop-filter]:bg-background/50 supports-[backdrop-filter]:backdrop-blur-lg" : "";

	return (
		<header className={"fixed top-0 z-40 w-full border-b border-border bg-background " + backdropClass} style={{ backdropFilter: !mobileMenuOpen ? "blur(8px)" : "none" }}>
			<div className="container flex h-16 items-center justify-between">
				<div className="flex items-center gap-2">
					<Link to={"/"} className="font-bold flex text-2xl">
						<div className="flex justify-center space-x-4 items-center">
							<div className="size-9 md:size-10 bg-foreground rounded-xl flex items-center justify-center">
								<BookOpen className="size-5 md:size-5.5 text-background" />
							</div>
							<h1 className="text-xl md:text-2xl font-bold">LibraryHub</h1>
						</div>
					</Link>
				</div>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center gap-2">
					{navItems.map((item, index) => (
						<NavLink key={index} to={item.href} end className={({ isActive }) => cn("text-sm font-medium transition-colors py-2 px-4 rounded-lg hover:bg-accent text-accent-foreground", isActive ? "bg-accent" : "bg-transparent")}>
							{item.name}
						</NavLink>
					))}

					<div className="flex gap-3 pl-1.5">
						{user ? (
							<div className="relative">
								<button onClick={() => setProfileMenuOpen(!profileMenuOpen)} className="flex items-center justify-center w-10 h-10 bg-foreground rounded-full">
									<span className="text-background font-bold text-sm">{getInitials(user.name)}</span>
								</button>
								{profileMenuOpen && (
									<div ref={menuRef} className="absolute top-full right-0 border-2 border-border mt-4 w-48 bg-card rounded-lg shadow-lg py-2">
										<p className="px-4 pt-2 text-sm font-semibold">{user.name}</p>
										<p className="px-4 pb-3 text-sm font-semibold text-muted-foreground">{user.email}</p>
										<button onClick={() => {
											confirm("Are you sure you want to logout?") && logout();
										}} className="block w-full px-4 py-2 text-left text-sm font-semibold text-red-600 hover:bg-muted">
											Logout
										</button>
									</div>
								)}
							</div>
						) : (
							<>
								<Button>
									<Link to="/login">Login</Link>
								</Button>
								<Button variant="outline" className="py-4">
									<Link to="/register">Register</Link>
								</Button>
							</>
						)}
					</div>
					<Button variant="ghost" size="icon" aria-label="Toggle Theme" className="ml-2" onClick={toggleTheme}>
						{theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
					</Button>
				</nav>

				{/* Mobile Menu Button */}
				<div className="flex md:hidden items-center gap-2">
					<Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggleTheme}>
						{theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
					</Button>
					<Button variant="ghost" size="icon" aria-label="Toggle mobile menu" onClick={toggleMobileMenu}>
						{mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
					</Button>
				</div>

				{/* Mobile Navigation */}
				{mobileMenuOpen && (
					<div
						ref={menuRef}
						className="md:hidden absolute top-16 left-0 right-0 border-b bg-background z-50 animate-fade-in backdrop-blur supports-[backdrop-filter]:bg-background/50 supports-[backdrop-filter]:backdrop-blur-lg"
						style={{ backdropFilter: "blur(8px)" }}
					>
						<nav className="flex flex-col p-4 pl-5 gap-3">
							{navItems.map((item, index) => (
								<NavLink key={index} to={item.href} end className={({ isActive }) => cn("text-sm font-medium transition-colors py-2 px-4 rounded-lg hover:bg-accent text-accent-foreground", isActive ? "bg-accent" : "bg-transparent")}>
									{item.name}
								</NavLink>
							))}
							<div className="flex gap-3 mt-2">
								{user ? (
									<div className="flex flex-col items-start pl-3 gap-5">
										<div className="flex">
											<div className="flex items-center justify-center w-10 h-10 bg-foreground rounded-full">
												<span className="text-background font-bold text-sm">{getInitials(user.name)}</span>
											</div>
											<div className="block">
												<p className="px-4 text-sm font-semibold">{user.name}</p>
												<p className="px-4 text-sm font-semibold text-muted-foreground">{user.email}</p>
											</div>
										</div>
										<Button variant="outline" onClick={() => {
											confirm("Are you sure you want to logout?") && logout();
										}} className="text-red-500">
											Logout
										</Button>
									</div>
								) : (
									<>
										<Button>
											<Link to="/login">Login</Link>
										</Button>
										<Button variant="outline" className="py-4">
											<Link to="/register">Register</Link>
										</Button>
									</>
								)}
							</div>
						</nav>
					</div>
				)}
			</div>
		</header>
	);
}
