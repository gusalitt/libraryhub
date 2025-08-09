import BookCard from "@/components/BookCard";
import Button from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function RelatedBooks({ book, title }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/books", {
            state: { category: book[0].book_categories.name },
        });
    }

    return (
        <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl md:text-3xl font-bold text-foreground">{ title }</h2>
                <Button variant="outline" onClick={handleClick} className="text-blue-600 hover:text-blue-700 font-medium">
                    View All
                </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {book?.map((relatedBook, index) => (
                    <BookCard key={index} book={relatedBook} />
                ))}
            </div>
        </div>
    );
}
