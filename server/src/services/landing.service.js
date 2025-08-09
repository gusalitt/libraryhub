const supabase = require("../config/supabase");

const fetchCoreStats = async () => {
	const [bookCount, totalViews, avgRating, totalDownloads] = await Promise.all([
		supabase.from("books").select("*", { count: "exact", head: true }),
		// supabase.from("users").select("*", { count: "exact", head: true }),
		supabase.from("total_book_views").select("total_views"),
		supabase.from("books").select("rating_avg"),
		supabase.from("books").select("downloads"),
	]);

	const totalBooks = bookCount.count || 0;
	const bookReads = totalViews.data[0].total_views || 0;

	const ratings = avgRating.data?.map((b) => b.rating_avg || 0) || [];
	const ratingAvg = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : 1;

	const downloads = totalDownloads.data?.map((b) => b.downloads || 0) || [];
	const totalDownloadCount = downloads.reduce((a, b) => a + b, 0);

	return {
		totalBooks,
		bookReads,
		ratingAvg: parseFloat(ratingAvg),
		totalDownloads: totalDownloadCount,
	};
};

// Data for home page
const fetchLandingStats = async () => {
	const coreStats = await fetchCoreStats();
	const [totalCategories, popularBooks, latestBooks] = await Promise.all([
		supabase.from("book_category_count").select(`id, name, book_count`),
		supabase.from("books").select(`slug, title, author, price, cover_url, rating_avg, book_categories(name)`).order("downloads", { ascending: false }).limit(10),
		supabase.from("books").select(`slug, title, author, price, cover_url, rating_avg, book_categories(name)`).order("upload_date", { ascending: false }).limit(10),
	]);

	return {
		...coreStats,
		totalCategories: totalCategories.data || [],
		popularBooks: popularBooks.data || [],
		latestBooks: latestBooks.data || [],
	};
};

// Data for books page
const fetchPaginatedBooks = async () => {
	const { data, error: bookError } = await supabase.from("books")
		.select(`slug, title, author, price, cover_url, rating_avg, book_categories(name)`)
		.order('upload_date', { ascending: false });

	const { data: categories, error: categoryError } = await supabase.from("book_categories").select(`name`);

	return {
		data,
		categories,
		error: bookError || categoryError,
	};
};

// Data for categories page
const fetchAllCategories = async () => {
	// Query from view book_category_count
	const { data, error } = await supabase.from("book_category_count").select(`name, book_count`);

	return {
		data,
		error,
	};
};




module.exports = {
	fetchLandingStats,
	fetchPaginatedBooks,
	fetchAllCategories,
	fetchCoreStats,
};


// const getFilteredBooks = async (filters) => {
// 	const { search = "", category = "all", rating = "all", price = "all", sortBy = "popular", page = 1, limit = 10 } = filters;

//     console.log(search, category, rating, price, sortBy, page, limit);

// 	const offset = (page - 1) * limit;

// 	let query = supabase.from("books").select(`slug, title, author, price, cover_url, rating_avg, book_categories(name)`, { count: "exact" });

// 	if (search) query = query.or(`title.ilike.%${search}%,author.ilike.%${search}%`);
// 	if (category !== "all" && category) query = query.ilike("category_id", category);
// 	if (rating !== null && rating) query = query.gte("rating_avg", Number.parseFloat(rating));

// 	if (price === "free") {
// 		query = query.eq("price", 0);
// 	} else if (price === "paid") {
// 		query = query.gt("price", 0);
// 	}

// 	switch (sortBy) {
// 		case "title":
// 		case "author":
// 		case "rating_avg":
// 		case "price":
// 		case "upload_date":
// 			query = query.order(sortBy, { ascending: sortBy === "price" || sortBy === "title" });
// 			break;

// 		case "newest":
// 			query = query.order("upload_date", { ascending: false });
// 			break;

// 		default:
// 			query = query.order("downloads", { ascending: false });
// 			break;
// 	}

// 	query = query.range(offset, offset + limit - 1);

// 	const { data, count, error } = await query;

// 	if (error) throw new Error(error.message);

// 	return {
// 		data,
// 		count,
// 		page: Number(page),
// 		limit: Number(limit),
// 	};
// };
