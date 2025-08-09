import { useState, useEffect, useMemo } from 'react';
import { fetchBooks } from '@/services/landingService';
import useDebounce from "@/hooks/useDebounce";
import { CloudCog } from 'lucide-react';

function useFilteredBooks(initialFilters) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState(initialFilters);
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState();
    const debounceSearch = useDebounce(filters.search, 500);
    const booksPerPage = 10;

    useEffect(() => {
        const getPaginatedBooks = async () => {
            try {
                const response = await fetchBooks({ page: currentPage, limit: booksPerPage });
                if (response)  {
                    setBooks(response.data.data.data);
                    setCategories(response.data.data.categories);
                }
            } catch (error) {
                console.error('Error fetching books:', error);
            } finally {
                setLoading(false);
            }
        };

        getPaginatedBooks();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    const filteredBooks = useMemo(() => {
        return books.filter(book => {
            const matchSearch = 
                debounceSearch === '' ||
                book.title.toLowerCase().includes(debounceSearch.toLowerCase()) ||
                book.author.toLowerCase().includes(debounceSearch.toLowerCase());

            const matchCategory = 
                filters.category === 'all' ||
                book.book_categories?.name.toLowerCase() === filters.category.toLowerCase();

            const matchRating = 
                filters.rating === 'all' ||
                book.rating_avg >= Number.parseFloat(filters.rating);

            const matchPrice = 
                filters.price === 'all' ||
                (filters.price === 'free' && book.price === 0) ||
                (filters.price === 'paid' && book.price > 0);

            return matchSearch && matchCategory && matchRating && matchPrice;
        });
    }, [books, filters.category, filters.price, filters.rating, debounceSearch]);

    const paginatedBooks = useMemo(() => {
        const start = (currentPage - 1) * booksPerPage;
        return filteredBooks.slice(start, start + booksPerPage);
    }, [filteredBooks, currentPage]);

    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    return {
        isLoading: loading,
        currentPage,
        setCurrentPage,
        totalPages,
        filters,
        setFilters,
        paginatedBooks,
        categories,
        bookFoundCount: filteredBooks.length, 
    };
}

export default useFilteredBooks;