-- Table: public.users
CREATE TYPE user_role AS ENUM ('user', 'admin', 'super_admin');
create table public.users (
    id serial not null,
    slug text not null,
    name text not null,
    email text not null,
    password text not null,
    role public.user_role not null default 'user'::user_role,
    bio text null,
    
    created_at timestamp with time zone null default now(),
    updated_at timestamp with time zone null default now(),
    constraint users_pkey primary key (id),
    constraint users_email_key unique (email),
    constraint users_slug_key unique (slug)
) TABLESPACE pg_default;


-- Table: public.books
create table public.books (
    id serial not null,
    slug text not null,
    title text not null,
    author text not null,
    description text null,
    price numeric(10, 2) null default 0.00,
    pages integer null,
    file_url text not null,
    cover_url text null,
    downloads integer null default 0,
    rating_avg numeric(2, 1) null default 0.0,
    upload_date date null default now(),
    uploaded_by integer null,
    created_at timestamp with time zone null default now(),
    updated_at timestamp with time zone null default now(),
    category_id integer null,
    constraint books_pkey primary key (id),
    constraint books_slug_key unique (slug),
    constraint books_category_id_fkey foreign KEY (category_id) references book_categories (id) on delete set null,
    constraint books_uploaded_by_fkey foreign KEY (uploaded_by) references users (id) on delete set null
) TABLESPACE pg_default;


-- Table: public.purchases
CREATE TYPE payment_status AS ENUM ('success', 'pending', 'failed', 'cancelled');
create table public.purchases (
    id serial not null,
    user_id integer not null,
    book_id integer not null,
    purchased_at timestamp with time zone null default CURRENT_TIMESTAMP,
    price_at_purchase numeric(10, 2) not null,
    payment_status public.payment_status not null default 'pending'::payment_status,
    constraint purchases_pkey primary key (id),
    constraint purchases_user_id_book_id_key unique (user_id, book_id),
    constraint purchases_book_id_fkey foreign KEY (book_id) references books (id) on delete CASCADE,
    constraint purchases_user_id_fkey foreign KEY (user_id) references users (id) on delete CASCADE
) TABLESPACE pg_default;


-- Table: public.book_likes
create table public.book_likes (
    id bigint generated always as identity not null,
    user_id bigint not null,
    book_id bigint not null,
    liked_at timestamp with time zone null default now(),
    constraint book_likes_pkey primary key (id),
    constraint book_likes_user_id_book_id_key unique (user_id, book_id),
    constraint book_likes_book_id_fkey foreign KEY (book_id) references books (id) on delete CASCADE,
    constraint book_likes_user_id_fkey foreign KEY (user_id) references users (id) on delete CASCADE
) TABLESPACE pg_default;


-- Table: public.book_bookmarks
create table public.book_bookmarks (
    id bigint generated always as identity not null,
    user_id bigint not null,
    book_id bigint not null,
    bookmarked_at timestamp with time zone null default now(),
    constraint book_bookmarks_pkey primary key (id),
    constraint book_bookmarks_user_id_book_id_key unique (user_id, book_id),
    constraint book_bookmarks_book_id_fkey foreign KEY (book_id) references books (id) on delete CASCADE,
    constraint book_bookmarks_user_id_fkey foreign KEY (user_id) references users (id) on delete CASCADE
) TABLESPACE pg_default;


-- Table: public.reading_progress
create table public.reading_progress (
    id bigint generated always as identity not null,
    user_id bigint not null,
    book_id bigint not null,
    progress_percent integer not null,
    time_spent integer not null default 0,
    updated_at timestamp with time zone null default now(),
    constraint reading_progress_pkey primary key (id),
    constraint reading_progress_user_id_book_id_key unique (user_id, book_id),
    constraint reading_progress_book_id_fkey foreign KEY (book_id) references books (id) on delete CASCADE,
    constraint reading_progress_user_id_fkey foreign KEY (user_id) references users (id) on delete CASCADE,
    constraint reading_progress_progress_percent_check check (
        (
        (progress_percent >= 0)
        and (progress_percent <= 100)
        )
    )
) TABLESPACE pg_default;


-- Table: public.admin_logs
create table public.admin_logs (
    id integer generated always as identity not null,
    admin_id integer not null,
    action text not null,
    target text not null,
    created_at timestamp with time zone null default now(),
    constraint admin_logs_pkey primary key (id),
    constraint admin_logs_admin_id_fkey foreign KEY (admin_id) references users (id) on delete CASCADE
) TABLESPACE pg_default;


-- Table: public.login_sessions_pkey
create table public.login_sessions (
    id integer generated always as identity not null,
    user_id integer not null,
    ip_address text not null,
    location text null,
    device text null,
    browser text null,
    created_at timestamp with time zone null default now(),
    constraint login_sessions_pkey primary key (id),
    constraint login_sessions_user_id_fkey foreign KEY (user_id) references users (id) on delete CASCADE
) TABLESPACE pg_default;



-- Table: public.book_comments
create table public.book_comments (
    id integer generated always as identity not null,
    user_id integer not null,
    book_id integer not null,
    comment text not null,
    created_at timestamp with time zone null default now(),
    rating integer null,
    constraint book_comments_pkey primary key (id),
    constraint book_comments_book_id_fkey foreign KEY (book_id) references books (id) on delete CASCADE,
    constraint book_comments_user_id_fkey foreign KEY (user_id) references users (id) on delete CASCADE,
    constraint book_comments_rating_check check (
        (
        (rating >= 1)
        and (rating <= 5)
        )
    )
) TABLESPACE pg_default;



-- Table: public.categories
create table public.book_categories (
    id serial not null,
    name text not null,
    slug text not null,
    description text null,
    created_at timestamp with time zone null default CURRENT_TIMESTAMP,
    constraint categories_pkey primary key (id),
    constraint categories_name_key unique (name),
    constraint categories_slug_key unique (slug)
) TABLESPACE pg_default;