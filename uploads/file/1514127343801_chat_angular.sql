-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 19, 2017 at 03:47 AM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chat_angular`
--

-- --------------------------------------------------------

--
-- Table structure for table `conversations`
--

CREATE TABLE `conversations` (
  `id` int(11) NOT NULL,
  `title` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `avatar` text COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `conversations`
--

INSERT INTO `conversations` (`id`, `title`, `avatar`, `createdAt`, `updatedAt`) VALUES
(1, '', '', '2017-12-14 11:45:04', '2017-12-14 11:45:04'),
(2, '', '', '2017-12-14 11:45:04', '2017-12-14 11:45:04'),
(3, 'BTL', 'https://linkedinmessengerchatapp.files.wordpress.com/2015/02/blink_new_icon.png', '2017-12-14 11:46:48', '2017-12-14 11:46:48');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `message` text COLLATE utf8_unicode_ci,
  `message_type` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `conversation_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `message`, `message_type`, `createdAt`, `updatedAt`, `conversation_id`, `sender_id`) VALUES
(10, 'Hi', 'text', '2017-12-14 16:52:04', '2017-12-14 16:52:04', 3, 2),
(11, 'Hello', 'text', '2017-12-14 16:52:04', '2017-12-14 16:52:04', 3, 1),
(12, '?', 'text', '2017-12-14 16:52:04', '2017-12-14 16:52:04', 3, 3),
(13, '?', 'text', '2017-12-14 16:52:04', '2017-12-14 16:52:04', 3, 3),
(14, '?', '', '2017-12-14 16:52:04', '2017-12-14 16:52:04', 3, 4),
(15, 'hi', 'text', '2017-12-14 16:52:04', '2017-12-14 16:52:04', 1, 1),
(16, 'he', 'text', '2017-12-14 16:52:04', '2017-12-14 16:52:04', 1, 2),
(17, 'hey', 'text', '2017-12-14 16:52:04', '2017-12-14 16:52:04', 2, 3),
(18, 'w?', 'text', '2017-12-14 16:52:04', '2017-12-14 16:52:04', 2, 1),
(19, '?', 'text', '2017-12-16 23:22:14', '2017-12-16 23:22:14', 3, 4),
(20, '?', 'text', '2017-12-16 23:22:14', '2017-12-16 23:22:14', 3, 4),
(156, 'thuy', 'text', '2017-12-18 19:02:06', '2017-12-18 19:02:06', 1, 2),
(157, 'nhan', 'text', '2017-12-18 19:02:13', '2017-12-18 19:02:13', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `fullname` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `avatar` text COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `fullname`, `avatar`, `createdAt`, `updatedAt`) VALUES
(1, 'Nhàn Nhót', 'bb4e31f2d20f8e7f88e2b8459263657f', 'nhan@gmail.com', 'Nguyễn Nhàn', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXAEtFHxjA_AywnSEiSkXetkwVM9Ard-9cC344EJK4z3ONi-6Z', '2017-12-14 05:18:09', '2017-12-14 05:18:09'),
(2, 'Thúy Thúy', '3cf2b6b121d1726bc2cdc88c39e0b119', 'thuy@gmail.com', 'Vũ Thúy Thúy', 'http://file.vforum.vn/hinh/2016/08/nhung-anh-dep-nhat-ve-con-ga-3.jpg', '2017-12-14 05:22:27', '2017-12-14 05:22:27'),
(3, 'Linh Nhật Phong', '892da3d819056410c05bca7747d22735', 'linh@gmail.com', 'Hà Văn Linh', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz2MyKjl-MnJ-AH5b8IGshiAODKQU3kvXpWvFIVxTNXArdeaLn', '2017-12-14 05:23:18', '2017-12-14 05:23:18'),
(4, 'Công Sơn', '498d3c6bfa033f6dc1be4fcc3c370aa7', 'son@gmail.com', 'Nguyễn Đình Công Sơn', 'http://www.elle.vn/wp-content/uploads/2017/07/25/hinh-anh-dep-17.jpg', '2017-12-14 05:23:50', '2017-12-14 05:23:50');

-- --------------------------------------------------------

--
-- Table structure for table `user_conversation`
--

CREATE TABLE `user_conversation` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `conversation_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user_conversation`
--

INSERT INTO `user_conversation` (`createdAt`, `updatedAt`, `conversation_id`, `user_id`) VALUES
('2017-12-14 12:27:05', '2017-12-14 12:27:05', 1, 1),
('2017-12-14 12:27:05', '2017-12-14 12:27:05', 1, 2),
('2017-12-14 12:27:05', '2017-12-14 12:27:05', 2, 1),
('2017-12-14 12:27:05', '2017-12-14 12:27:05', 2, 3),
('2017-12-14 12:27:05', '2017-12-14 12:27:05', 3, 1),
('2017-12-14 12:27:05', '2017-12-14 12:27:05', 3, 2),
('2017-12-14 12:27:05', '2017-12-14 12:27:05', 3, 3),
('2017-12-14 12:27:05', '2017-12-14 12:27:05', 3, 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `conversations`
--
ALTER TABLE `conversations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `conversation_id` (`conversation_id`),
  ADD KEY `sender_id` (`sender_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `Users_email_unique` (`email`);

--
-- Indexes for table `user_conversation`
--
ALTER TABLE `user_conversation`
  ADD PRIMARY KEY (`conversation_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `conversations`
--
ALTER TABLE `conversations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=158;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_conversation`
--
ALTER TABLE `user_conversation`
  ADD CONSTRAINT `user_conversation_ibfk_1` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_conversation_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
