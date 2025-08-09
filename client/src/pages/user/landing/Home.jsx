import HeroSection from "@/pages/user/sections/HeroSection";
import CategorySection from "@/pages/user/sections/CategorySection";
import PopularBookSection from "@/pages/user/sections/PopularBookSection";
import LatestArrivalSection from "@/pages/user/sections/LatestArrivalSection";
import CTASection from "@/pages/user/sections/CTASection";
import { fetchLanding } from "@/services/landingService";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "@/components/ErrorPage";

export default function Home() {
	const { isLoading, error, data } = useQuery({
		queryKey: ["landing"],
		queryFn: fetchLanding,
	});

	const { totalBooks = 0, totalUsers = 0, bookReads = 0, ratingAvg = 1, totalDownloads = 0, totalCategories = 0, popularBooks = [], latestBooks = [] } = data?.data?.data || {};

	return (
		<>
			{error ? (
				<ErrorPage message={error.message} errorCode={error.code || 500} />
			) : (
				<>
					<HeroSection isLoading={isLoading} {...{ totalBooks, totalUsers, bookReads, ratingAvg, totalDownloads, totalCategories }} />
					<CategorySection isLoading={isLoading} totalCategories={totalCategories} />
					<PopularBookSection isLoading={isLoading} popularBooks={popularBooks} />
					<LatestArrivalSection isLoading={isLoading} latestBooks={latestBooks} />
					<CTASection />
				</>
			)}
		</>
	);
}
