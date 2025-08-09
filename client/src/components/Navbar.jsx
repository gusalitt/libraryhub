import { useState } from "react";
import { Search, Menu, Sun, Moon } from "lucide-react";
import Button from "@/components/ui/Button";
import SearchInput from "@/components/ui/SearchInput";
import { useTheme } from "@/contexts/ThemeContext";

export default function Navbar({ setSidebarOpen }) {
	const { theme, toggleTheme } = useTheme();
	const [searchQuery, setSearchQuery] = useState("");
	return (
		<header className="fixed top-0 z-40 w-full bg-background shadow-sm border-b-2 border-border">
			<div className="px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center space-x-4">
						<button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600">
							<Menu className="w-5 h-5" />
						</button>
					</div>

					<div className="flex items-center space-x-4">
						<SearchInput />
						<Button variant="ghost" size="icon" aria-label="Toggle Theme" className="ml-2" onClick={toggleTheme}>
							{theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
}
