import { User, BookOpen, X, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ sidebarOpen, setSidebarOpen, user, sidebarItems = [] }) {
	return (
		<div className={`fixed inset-y-0 left-0 z-50 w-72 bg-background shadow-xl transform border-r-2 border-border ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:translate-x-0`}>
			<div className="flex items-center justify-between lg:justify-center h-16.5 px-6 ls:px-0 border-b-2 border-r-0 border-border">
				<div className="flex items-center justify-center text-center space-x-2">
					<div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
						<BookOpen className="w-5 h-5 text-background" />
					</div>
					<h2 className="text-xl font-bold text-foreground">LibraryHub</h2>
				</div>
				<button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600">
					<X className="w-5 h-5" />
				</button>
			</div>

			<div className="p-6">
				<div className="flex items-center space-x-3 mb-8 p-4 bg-secondary/60 rounded-2xl">
					<div className="w-12 h-10 bg-foreground rounded-xl flex items-center justify-center">
						<User className="w-6 h-5 text-background" />
					</div>
					<div>
						<h3 className="font-bold text-foreground">{user?.name}</h3>
						<p className="text-sm text-muted-foreground">{user?.email}</p>
					</div>
				</div>

				<nav className="space-y-2">
					{sidebarItems.map((item) => (
						<NavLink
							key={item.id}
							to={item.path}
							end={item.path === "/dashboard" || item.path === "/admin/dashboard"}
							className={({ isActive }) => `w-full flex items-center space-x-3 px-4 py-3 text-left rounded-xl transition-colors ${isActive ? "bg-foreground text-background" : "text-secondary-foreground hover:bg-secondary"}`}
						>
							<item.icon className="w-5 h-5" />
							<span className="font-medium">{item.label}</span>
						</NavLink>
					))}

					<button onClick={() => localStorage.clear()} className="w-full flex items-center space-x-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-xl transition-colors mt-8">
						<LogOut className="w-5 h-5" />
						<span className="font-medium">Logout</span>
					</button>
				</nav>
			</div>
		</div>
	);
}
