import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingLayout from "@/layouts/LandingLayout";
import Home from "@/pages/user/landing/Home";
import Books from "@/pages/user/landing/Books";
import Categories from "@/pages/user/landing/Categories";
import About from "@/pages/user/landing/About";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import BookDetailPage from "@/pages/user/book/BookDetailPage";
import BookReaderPage from "@/pages/user/book/BookReaderPage";

import ErrorPage from "@/components/ErrorPage";
import ScrollTop from "@/components/ScrollTop";
import RedirectIfAuthenticated from "@/components/guard/RedirectIfAuthenticated";

export default function AppRoutes() {
	return (
		<BrowserRouter>
			<ScrollTop />
			<Routes>
				{/* Auth */}
				<Route
					path="/login"
					element={
						<RedirectIfAuthenticated>
							<LoginPage />
						</RedirectIfAuthenticated>
					}
				/>
				<Route
					path="/register"
					element={
						<RedirectIfAuthenticated>
							<RegisterPage />
						</RedirectIfAuthenticated>
					}
				/>

				{/* Landing */}
				<Route path="/" element={<LandingLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="books" element={<Books />} />
					<Route path="categories" element={<Categories />} />
					<Route path="about" element={<About />} />
				</Route>

				{/* Book */}
				<Route path="/book/:slug" element={<BookDetailPage />} />
				<Route path="/book/:slug/view" element={<BookReaderPage />} />

				<Route path="/maintenance" element={<ErrorPage message="Service Unavailable" errorCode={503} />} />
				<Route path="*" element={<ErrorPage message="Page Not Found" errorCode={404} />} />
			</Routes>
		</BrowserRouter>
	);
}
