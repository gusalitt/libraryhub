import UserNavbar from "@/pages/user/UserNavbar";
import UserFooter from "@/pages/user/UserFooter";
import { Outlet } from "react-router-dom";

export default function LandingLayout() {
	return (
		<>
            <UserNavbar />
            <main className="min-h-screen">
                <Outlet />
            </main>
            <UserFooter />
		</>
	);
}
