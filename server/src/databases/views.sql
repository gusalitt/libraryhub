-- Create a view for counting the number of books in each category
create view public.book_category_count as
select
    bc.id,
    bc.name,
    count(b.id) as book_count
from
    book_categories bc
    left join books b on b.category_id = bc.id
group by
    bc.id,
    bc.name
order by
    (count(b.id)) desc;


-- Create a view for counting the number of likes and favorites for each book
create view public.book_interaction_summary as
select
    COALESCE(l.book_id, f.book_id) as book_id,
    COALESCE(l.count, 0::bigint) as likes,
    COALESCE(f.count, 0::bigint) as favorites
from
    (
    select
    book_likes.book_id,
    count(*) as count
    from
    book_likes
    group by
    book_likes.book_id
) l
full join (
    select
    book_bookmarks.book_id,
    count(*) as count
    from
    book_bookmarks
    group by
    book_bookmarks.book_id
) f on l.book_id = f.book_id;