
-- Insert data into the users table
INSERT INTO users (name, email, password, role, slug, bio)
VALUES 
  ('John Doe', 'john@example.com', 'hashedpassword1', 'user', 'john-doe', 'Loves to read tech books and write reviews.'),
  ('Jane Smith', 'jane@example.com', 'hashedpassword2', 'user', 'jane-smith', 'Book enthusiast and aspiring novelist.'),
  ('Alex Johnson', 'alex@example.com', 'hashedpassword3', 'user', 'alex-johnson', 'Enjoys science fiction and philosophy.'),
  ('Emily Davis', 'emily@example.com', 'hashedpassword4', 'user', 'emily-davis', 'Passionate about education and learning.'),
  ('Michael Brown', 'michael@example.com', 'hashedpassword5', 'user', 'michael-brown', 'Tech geek and history lover.'),
  ('Olivia Wilson', 'olivia@example.com', 'hashedpassword6', 'user', 'olivia-wilson', 'Coffee, books, and rainy days.'),
  ('Daniel Anderson', 'daniel@example.com', 'hashedpassword7', 'user', 'daniel-anderson', 'Learning one page at a time.'),
  ('Sophia Martinez', 'sophia@example.com', 'hashedpassword8', 'user', 'sophia-martinez', 'Reading is a lifestyle.'),
  ('William Taylor', 'william@example.com', 'hashedpassword9', 'user', 'william-taylor', 'Just one more chapter.'),
  ('Ava Thomas', 'ava@example.com', 'hashedpassword10', 'user', 'ava-thomas', 'Reader. Dreamer. Thinker.'),
  ('James Jackson', 'james@example.com', 'hashedpassword11', 'admin', 'james-jackson', 'Managing content and uploading books.'),
  ('Mia White', 'mia@example.com', 'hashedpassword12', 'admin', 'mia-white', 'Admin and content reviewer.'),
  ('Benjamin Harris', 'benjamin@example.com', 'hashedpassword13', 'user', 'benjamin-harris', 'Science is my favorite genre.'),
  ('Isabella Martin', 'isabella@example.com', 'hashedpassword14', 'user', 'isabella-martin', 'Books and baking are my thing.'),
  ('Lucas Thompson', 'lucas@example.com', 'hashedpassword15', 'user', 'lucas-thompson', 'Engineer by day, reader by night.'),
  ('Charlotte Garcia', 'charlotte@example.com', 'hashedpassword16', 'user', 'charlotte-garcia', 'Exploring the world through books.'),
  ('Henry Clark', 'henry@example.com', 'hashedpassword17', 'super_admin', 'henry-clark', 'Oversees all admin activities.'),
  ('Amelia Rodriguez', 'amelia@example.com', 'hashedpassword18', 'user', 'amelia-rodriguez', 'Quiet moments with books are the best.'),
  ('Elijah Lewis', 'elijah@example.com', 'hashedpassword19', 'user', 'elijah-lewis', 'Always curious, always reading.'),
  ('Harper Lee', 'harper@example.com', 'hashedpassword20', 'user', 'harper-lee', 'Not the author, but still loves writing.');


-- Insert data into the books table
INSERT INTO public.books (
  slug, title, author, description, category_id,
  price, pages, file_url, cover_url, downloads,
  rating_avg, upload_date, uploaded_by, created_at, updated_at
)
VALUES
-- 1
('the-art-of-clean-code', 'The Art of Clean Code', 'Robert C. Martin', 'A practical guide to writing clean and maintainable code.', 1,
 29.99, 324, 'https://example.com/books/clean-code.pdf', 'https://picsum.photos/300/200?random=1', 1247,
 4.8, NOW(), 11, NOW(), NOW()),

-- 2
('digital-marketing-revolution', 'Digital Marketing Revolution', 'Mark Thompson', 'Strategies to grow your brand in the digital age.', 3,
 24.99, 256, 'https://example.com/books/marketing.pdf', 'https://picsum.photos/300/200?random=2', 892,
 4.6, NOW(), 12, NOW(), NOW()),

-- 3
('the-quantum-universe', 'The Quantum Universe', 'Dr. Emily Chen', 'Explore the mind-bending world of quantum physics.', 2,
 34.99, 412, 'https://example.com/books/quantum.pdf', 'https://picsum.photos/300/200?random=3', 0,
 0.0, NOW(), 17, NOW(), NOW()),

-- 4
('mindful-leadership', 'Mindful Leadership', 'Jennifer Williams', 'Cultivating mindfulness and empathy in leadership.', 4,
 19.99, 198, 'https://example.com/books/leadership.pdf', 'https://picsum.photos/300/200?random=4', 567,
 4.4, NOW(), 11, NOW(), NOW()),

-- 5
('advanced-react-patterns', 'Advanced React Patterns', 'Alex Johnson', 'Deep dive into advanced concepts in React development.', 1,
 39.99, 378, 'https://example.com/books/react-patterns.pdf', 'https://picsum.photos/300/200?random=5', 234,
 4.7, NOW(), 12, NOW(), NOW()),

-- 6
('financial-freedom-guide', 'Financial Freedom Guide', 'Michael Brown', 'How to achieve financial independence.', 5,
 27.99, 289, 'https://example.com/books/finance.pdf', 'https://picsum.photos/300/200?random=6', 1089,
 4.5, NOW(), 17, NOW(), NOW()),

-- 7
('space-and-time', 'Space and Time', 'Neil Tyson', 'Unraveling the mysteries of the universe.', 6,
 31.99, 366, 'https://example.com/books/space.pdf', 'https://picsum.photos/300/200?random=7', 643,
 4.2, NOW(), 11, NOW(), NOW()),

-- 8
('emotional-intelligence', 'Emotional Intelligence', 'Daniel Goleman', 'Master your emotions and relationships.', 6,
 22.50, 301, 'https://example.com/books/eq.pdf', 'https://picsum.photos/300/200?random=8', 212,
 4.0, NOW(), 12, NOW(), NOW()),

-- 9
('startup-playbook', 'Startup Playbook', 'Reid Hoffman', 'Lessons from top founders and VCs.', 6,
 44.99, 288, 'https://example.com/books/startup.pdf', 'https://picsum.photos/300/200?random=9', 730,
 4.9, NOW(), 17, NOW(), NOW()),

-- 10
('ai-for-everyone', 'AI for Everyone', 'Andrew Ng', 'Demystifying artificial intelligence for the masses.', 6,
 18.75, 220, 'https://example.com/books/ai.pdf', 'https://picsum.photos/300/200?random=10', 921,
 4.6, NOW(), 11, NOW(), NOW());



-- Insert data into the purchases table
INSERT INTO purchases (
  user_id, book_id, price_at_purchase, payment_status, purchased_at
)
VALUES
-- User 1 beli book 1
(1, 1, 29.99, 'success', NOW()),
-- User 2 beli book 2
(2, 2, 24.99, 'success', NOW()),
-- User 3 beli book 3 (belum bayar)
(3, 3, 34.99, 'pending', NOW()),
-- User 4 beli book 1
(4, 1, 29.99, 'success', NOW()),
-- User 5 beli book 5
(5, 5, 39.99, 'failed', NOW()),
-- User 6 beli book 4
(6, 4, 19.99, 'success', NOW()),
-- User 7 beli book 6
(7, 6, 27.99, 'cancelled', NOW()),
-- User 8 beli book 7
(8, 7, 31.99, 'success', NOW()),
-- User 9 beli book 8
(9, 8, 22.50, 'success', NOW()),
-- User 10 beli book 10
(10, 10, 18.75, 'success', NOW()),
-- User 2 beli book 4
(2, 4, 19.99, 'success', NOW()),
-- User 3 beli book 2
(3, 2, 24.99, 'pending', NOW()),
-- User 5 beli book 3
(5, 3, 34.99, 'success', NOW());



-- Insert data into the book_likes table
INSERT INTO book_likes (user_id, book_id, liked_at)
VALUES
(1, 1, NOW()),
(2, 1, NOW()),
(3, 2, NOW()),
(4, 3, NOW()),
(5, 1, NOW()),
(6, 4, NOW()),
(7, 5, NOW()),
(8, 6, NOW()),
(9, 7, NOW()),
(10, 8, NOW()),
(2, 3, NOW()),
(3, 4, NOW()),
(4, 5, NOW()),
(5, 6, NOW()),
(6, 7, NOW()),
(7, 8, NOW()),
(8, 9, NOW()),
(9, 10, NOW()),
(10, 2, NOW());



-- Insert data into the book_bookmarks table
INSERT INTO book_bookmarks (user_id, book_id, bookmarked_at)
VALUES
(1, 2, NOW()),
(2, 3, NOW()),
(3, 1, NOW()),
(4, 5, NOW()),
(5, 4, NOW()),
(6, 6, NOW()),
(7, 7, NOW()),
(8, 8, NOW()),
(9, 9, NOW()),
(10, 10, NOW()),
(1, 3, NOW()),
(2, 4, NOW()),
(3, 5, NOW()),
(4, 6, NOW()),
(5, 7, NOW()),
(6, 8, NOW()),
(7, 9, NOW()),
(8, 10, NOW());



-- Insert data into the reading_progress table
INSERT INTO reading_progress (user_id, book_id, progress_percent, time_spent, updated_at)
VALUES
(1, 1, 25, 360, NOW()),
(2, 2, 40, 520, NOW()),
(3, 3, 10, 150, NOW()),
(4, 4, 75, 900, NOW()),
(5, 5, 100, 1200, NOW()),
(6, 6, 80, 860, NOW()),
(7, 7, 55, 670, NOW()),
(8, 8, 90, 1000, NOW()),
(9, 9, 35, 450, NOW()),
(10, 10, 5, 60, NOW()),
(11, 1, 60, 800, NOW()),
(12, 2, 20, 240, NOW()),
(13, 3, 15, 210, NOW()),
(14, 4, 70, 840, NOW()),
(15, 5, 50, 600, NOW()),
(16, 6, 45, 550, NOW()),
(17, 7, 65, 750, NOW()),
(18, 8, 90, 1100, NOW()),
(19, 9, 30, 420, NOW()),
(20, 10, 100, 1300, NOW());



-- Insert data into the admin_logs table
INSERT INTO admin_logs (admin_id, action, target, created_at)
VALUES
(11, 'upload book', 'The Art of Clean Code', NOW()),
(11, 'edit book', 'Advanced React Patterns', NOW()),
(12, 'upload book', 'Mindful Leadership', NOW()),
(12, 'delete book', 'The Quantum Universe', NOW()),
(17, 'delete user', 'alex-johnson', NOW()),
(17, 'edit user', 'jane-smith', NOW());



-- Insert data into the login_sessions table
INSERT INTO login_sessions (user_id, ip_address, location, device, browser, created_at)
VALUES
  (1, '192.168.1.10', 'Jakarta, Indonesia', 'Desktop', 'Chrome', NOW() - INTERVAL '2 days'),
  (2, '192.168.1.11', 'Bandung, Indonesia', 'Mobile', 'Safari', NOW() - INTERVAL '1 day'),
  (3, '192.168.1.12', 'Surabaya, Indonesia', 'Desktop', 'Firefox', NOW() - INTERVAL '3 days'),
  (4, '192.168.1.13', 'Depok, Indonesia', 'Mobile', 'Edge', NOW() - INTERVAL '4 hours'),
  (5, '192.168.1.14', 'Yogyakarta, Indonesia', 'Desktop', 'Chrome', NOW() - INTERVAL '10 hours'),
  (6, '192.168.1.15', 'Semarang, Indonesia', 'Mobile', 'Chrome', NOW() - INTERVAL '30 minutes'),
  (7, '192.168.1.16', 'Bali, Indonesia', 'Desktop', 'Firefox', NOW() - INTERVAL '5 days'),
  (8, '192.168.1.17', 'Medan, Indonesia', 'Mobile', 'Safari', NOW() - INTERVAL '6 hours'),
  (9, '192.168.1.18', 'Bekasi, Indonesia', 'Desktop', 'Edge', NOW() - INTERVAL '2 hours'),
  (10, '192.168.1.19', 'Tangerang, Indonesia', 'Mobile', 'Chrome', NOW() - INTERVAL '8 hours'),
  (11, '10.0.0.1', 'Jakarta, Indonesia', 'Desktop', 'Chrome', NOW() - INTERVAL '1 day'), -- admin
  (12, '10.0.0.2', 'Jakarta, Indonesia', 'Desktop', 'Firefox', NOW() - INTERVAL '2 days'), -- admin
  (13, '192.168.1.20', 'Bogor, Indonesia', 'Mobile', 'Safari', NOW() - INTERVAL '7 days'),
  (14, '192.168.1.21', 'Malang, Indonesia', 'Desktop', 'Edge', NOW() - INTERVAL '3 days'),
  (15, '192.168.1.22', 'Solo, Indonesia', 'Mobile', 'Chrome', NOW() - INTERVAL '1 hour'),
  (16, '192.168.1.23', 'Cirebon, Indonesia', 'Desktop', 'Firefox', NOW() - INTERVAL '2 hours'),
  (17, '10.0.0.3', 'Jakarta, Indonesia', 'Desktop', 'Chrome', NOW() - INTERVAL '5 hours'), -- super_admin
  (18, '192.168.1.24', 'Padang, Indonesia', 'Mobile', 'Edge', NOW() - INTERVAL '6 hours'),
  (19, '192.168.1.25', 'Pontianak, Indonesia', 'Desktop', 'Chrome', NOW() - INTERVAL '4 days'),
  (20, '192.168.1.26', 'Batam, Indonesia', 'Mobile', 'Firefox', NOW() - INTERVAL '2 days');



-- Insert data into the book_comments table
INSERT INTO book_comments (user_id, book_id, comment, created_at, rating)
VALUES
  (1, 2, 'Buku ini sangat membantu dalam memahami dasar-dasar marketing digital.', NOW() - INTERVAL '2 days', 5),
  (2, 1, 'Clean code memang wajib dibaca semua programmer. Recommended!', NOW() - INTERVAL '1 day', 4),
  (3, 3, 'Saya suka pendekatan ilmiah di buku ini, sangat informatif.', NOW() - INTERVAL '3 days', 3),
  (4, 4, 'Panduan leadership yang ringan tapi berdampak. Terima kasih!', NOW() - INTERVAL '12 hours', 2),
  (5, 5, 'Saya baru tahu pattern seperti ini di React. Nice!', NOW() - INTERVAL '5 hours', 1),
  (6, 1, 'Gaya penulisan cukup teknis tapi mudah dipahami.', NOW() - INTERVAL '2 days', 4),
  (7, 6, 'Buku ini membuka wawasan baru soal kebebasan finansial.', NOW() - INTERVAL '4 hours', 5),
  (8, 2, 'Cocok banget buat yang baru belajar digital marketing.', NOW() - INTERVAL '3 hours', 3),
  (9, 5, 'Pattern-nya sudah agak lama, tapi tetap relevan.', NOW() - INTERVAL '2 days', 2),
  (10, 4, 'Saya suka bagian tentang mindfulness. Bermanfaat.', NOW() - INTERVAL '8 hours', 4),
  (11, 1, 'Sebagai admin, saya rekomendasikan buku ini ke semua user.', NOW() - INTERVAL '6 hours', 5),
  (12, 3, 'Topik kuantum disampaikan dengan sangat menarik.', NOW() - INTERVAL '1 day', 3),
  (13, 6, 'Akhirnya nemu buku finansial yang nggak ngebosenin!', NOW() - INTERVAL '9 hours', 4),
  (14, 1, 'Referensinya mantap, jadi lebih disiplin nulis kode.', NOW() - INTERVAL '7 days', 4),
  (15, 2, 'Visual dan penjelasan sangat clear untuk pemula.', NOW() - INTERVAL '1 day', 3),
  (16, 4, 'Bagus buat pemimpin muda atau yang baru mulai karir.', NOW() - INTERVAL '2 days', 2),
  (17, 5, 'Sudah lama saya cari buku sejenis ini.', NOW() - INTERVAL '5 days', 4),
  (18, 6, 'Langsung saya praktikkan ilmunya. Worth it.', NOW() - INTERVAL '10 hours', 5),
  (19, 3, 'Butuh waktu buat mencerna, tapi bagus banget.', NOW() - INTERVAL '6 days', 3),
  (20, 2, 'Terstruktur rapi, mudah dipahami untuk pemula.', NOW() - INTERVAL '2 hours', 4);




-- Insert data into the book_categories table
INSERT INTO book_categories (name, slug, description) VALUES
  ('Technology', 'technology', 'Books related to software, hardware, and IT.'),
  ('Science', 'science', 'Books covering scientific topics and discoveries.'),
  ('Business', 'business', 'Books about entrepreneurship, economics, and marketing.'),
  ('Self-Help', 'self-help', 'Books focused on personal development and mental well-being.'),
  ('Finance', 'finance', 'Books about managing money, investing, and financial planning.'),
  ('Fiction', 'fiction', 'Creative storytelling and narrative-based books.');
