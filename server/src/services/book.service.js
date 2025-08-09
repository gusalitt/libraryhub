const supabase = require("../config/supabase.js");

const fetchBookDetail = async (slug, userId) => {
	// Get book details
	const book = await supabase.from("books").select("*, book_categories(name)").eq("slug", slug).maybeSingle();

	if (book.status !== 200 || !book.data) {
		return {
			book: null,
			bookRelated: [],
			error: book.error || new Error("Book not found or slug not unique."),
		};
	}

	let bookRelated = null;
	let bookRelatedError = null;
	let comments = null;
	let commentsError = null;

	if (book.data.category_id) {
		// Get related books
		const { data, error } = await supabase
			.from("books")
			.select("slug, title, author, price, cover_url, rating_avg, category_id, book_categories(name)")
			.eq("category_id", book.data.category_id)
			.order("upload_date", { ascending: false })
			.limit(10);

		bookRelated = data || [];
		bookRelatedError = error || null;
	}

	if (book.data.id) {
		// Get comments
		const { data, error } = await supabase
			.from("book_comments")
			.select("users(name), rating, comment, created_at")
			.eq("book_id", book.data.id)
			.order("created_at", { ascending: false });

		comments = data || [];
		commentsError = error || null;

		// Get summary likes and favorites for book
		const { data: summary, error: summaryError } = await supabase
			.from("book_interaction_summary")
			.select("*")
			.eq("book_id", book.data.id)
			.maybeSingle();

		book.data.likes = summary?.likes || 0;
		book.data.favorites = summary?.favorites || 0;
	}

	if (userId) {
		book.data.isLiked = await checkIsLiked(userId, book.data.id);
		book.data.isBookmarked = await checkisBookmarked(userId, book.data.id);
	}

	return {
		book,
		bookRelated,
		comments,
		error: book.error || bookRelatedError || commentsError,
	};
};

const checkIsLiked = async (userId, bookId) => {
	const { data, error } = await supabase
		.from("book_likes")
		.eq("user_id", userId)
		.eq("book_id", bookId)
		.single();
	
	return !!data;
}

const checkisBookmarked = async (userId, bookId) => {
	const { data, error } = await supabase
		.from("book_bookmarks")
		.eq("user_id", userId)
		.eq("book_id", bookId)
		.single();
	
	return !!data;
}

const fetchIncrementBookDownload = async (slug) => {
	const { data, error } = await supabase
		.from("books")
		.select("downloads")
		.eq("slug", slug)
		.single();

	if (error || !data) {
		throw new Error(error.message);
	}

	const newCount = (data?.downloads || 0) + 1;

	const { data: updateData, error: updateError } = await supabase
		.from("books")
		.update({ downloads: newCount })
		.eq("slug", slug);

	if (updateError) {
		throw new Error(updateError.message);
	}

	return {
		data: updateData,
		error: updateError,
	};
}

const fetchSignedBookFile  = async (path) => {
	if (!path) {
		throw new Error("Missing path");
	}

	const { data, error } = await supabase.storage
		.from("public-books")
		.createSignedUrl(path, 60);

	if (error || !data?.signedUrl) {
		throw new Error(error?.message || "Failed to get signed url");
	}

	const response = await fetch(data?.signedUrl);
	if (!response.ok) {
		throw new Error("Failed to fetch file content");
	}

	const buffer = await response.arrayBuffer();

	return {
		buffer: Buffer.from(buffer),
		contentType: response.headers.get("content-type") || "application/pdf",
	}
}

const fetchBookReadingPage = async (slug) => {
	// Get book details
	const book = await supabase
		.from("books")
		.select("title, author, rating_avg, file_url, cover_url, category_id, views, book_categories(name)")
		.eq("slug", slug)
		.maybeSingle();

	if (book.status !== 200 || !book.data) {
		return {
			book: null,
			error: book.error || new Error("Book not found or slug not unique."),
		};
	}

	let bookRelated = [];
	let bookRelatedError = null;

	if (book.data.category_id) {
		// Get related books
		const { data, error } = await supabase
			.from("books")
			.select("slug, title, author, rating_avg, cover_url, book_categories(name)")
			.eq("category_id", book.data.category_id)
			.order("upload_date", { ascending: false })
			.limit(10);

		bookRelated = data || [];
		bookRelatedError = error || null;
	}

	// Get popular books
	const { data } = await supabase
		.from("books")
		.select("slug, title, author, rating_avg, cover_url, book_categories(name)")
		.order("rating_avg", { ascending: false })
		.limit(10);

	// Add +1 views to books
	const { data: updateData, error: updateError } = await supabase
		.from("books")
		.update({ views: book.data.views + 1 })
		.eq("slug", slug);

	return {
		book,
		bookRelated,
		popularBooks: data,
		updateData,
		error: book.error || bookRelatedError || updateError,
	};
}

const addBookComment = async (slug, userId, comment, rating) => {
	try {
		// Check if book exists with the given slug
		const { data: book, error: bookError } = await supabase
			.from("books")
			.select("id")
			.eq("slug", slug)
			.maybeSingle();

		if (bookError || !book) {
			throw new Error(bookError?.message || "Book not found");
		}

		// Insert comment & rating for book
		const { data, error } = await supabase
			.from("book_comments")
			.insert({
				user_id: userId,
				book_id: book.id,
				comment,
				rating,
			})
			.select("users(name), rating, comment, created_at")
			.single();

		if (error) {
			throw new Error(error.message);
		}

		// Select all ratings for the book to calculate average rating
		const { data: bookData, error: bookUpdateError } = await supabase
			.from("book_comments")
			.select("rating", { count: "exact" })
			.eq("book_id", book.id);

		if (bookData) {
			const ratings = bookData.map(comment => comment.rating);
			const avgRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;

			// Update book's average rating
			const { data: updatedBook, error: updateError } = await supabase
				.from("books")
				.update({ rating_avg: parseFloat(avgRating.toFixed(2)) })
				.eq("id", book.id);
				
			if (bookUpdateError || updateError) {
				throw new Error(bookUpdateError?.message || updateError?.message || "Failed to update book rating");
			}
		}

		return data;
	} catch (error) {
		throw error;
	}
}

module.exports = { fetchBookDetail, fetchIncrementBookDownload, fetchSignedBookFile, fetchBookReadingPage, addBookComment };

// const fetchSignedBookFile  = async (path) => {
// 	if (!path) {
// 		throw new Error("Missing path");
// 	}

// 	const { data, error } = await supabase.storage
// 		.from("public-books")
// 		.createSignedUrl(path, 60);

// 	if (error || !data?.signedUrl) {
// 		throw new Error(error?.message || "Failed to get signed url");
// 	}

// 	return {
// 		signedUrl: data.signedUrl,
// 		error
// 	}
// }
