-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 12, 2025 at 09:54 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_sellwatches`
--

-- --------------------------------------------------------

--
-- Table structure for table `chi_nhanh_shop`
--

CREATE TABLE `chi_nhanh_shop` (
  `id` varchar(255) NOT NULL,
  `chi_nhanh` text DEFAULT NULL,
  `dia_chi_chi_nhanh` text DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `so_dien_thoai` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chi_tiet_don_hang`
--

CREATE TABLE `chi_tiet_don_hang` (
  `id` varchar(255) NOT NULL,
  `don_hang_id` varchar(255) DEFAULT NULL,
  `san_pham_id` varchar(255) DEFAULT NULL,
  `so_luong` int(11) DEFAULT NULL,
  `gia` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dang_gia`
--

CREATE TABLE `dang_gia` (
  `id` varchar(255) NOT NULL,
  `san_pham_id` varchar(255) DEFAULT NULL,
  `khach_hang_id` varchar(255) DEFAULT NULL,
  `noi_dung` text DEFAULT NULL,
  `xep_hang` int(11) DEFAULT NULL,
  `ngay_danh_gia` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `don_hang`
--

CREATE TABLE `don_hang` (
  `id` varchar(255) NOT NULL,
  `ngay_dat` date DEFAULT NULL,
  `tong_gia` decimal(10,2) DEFAULT NULL,
  `khach_hang_id` varchar(255) DEFAULT NULL,
  `thanh_toan_id` varchar(255) DEFAULT NULL,
  `van_chuyen_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hinh_anh`
--

CREATE TABLE `hinh_anh` (
  `id` varchar(255) NOT NULL,
  `san_pham_id` varchar(255) DEFAULT NULL,
  `loai_anh` varchar(50) DEFAULT NULL,
  `duong_dan` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `khach_hang`
--

CREATE TABLE `khach_hang` (
  `id` varchar(255) NOT NULL,
  `ten_khach_hang` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `so_dien_thoai` varchar(20) DEFAULT NULL,
  `mat_khau` varchar(255) DEFAULT NULL,
  `dia_chi` text DEFAULT NULL,
  `gioi_tinh` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `khieu_nai`
--

CREATE TABLE `khieu_nai` (
  `id` varchar(255) NOT NULL,
  `don_hang_id` varchar(255) DEFAULT NULL,
  `khach_hang_id` varchar(255) DEFAULT NULL,
  `noi_dung` text DEFAULT NULL,
  `loai` varchar(50) DEFAULT NULL,
  `trang_thai` varchar(50) DEFAULT NULL,
  `ngay_khieu_nai` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kho_hang`
--

CREATE TABLE `kho_hang` (
  `id` varchar(255) NOT NULL,
  `san_pham_id` varchar(255) DEFAULT NULL,
  `so_luong` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `khuyen_mai`
--

CREATE TABLE `khuyen_mai` (
  `id` varchar(255) NOT NULL,
  `ten_khuyen_mai` varchar(255) DEFAULT NULL,
  `mo_ta` text DEFAULT NULL,
  `ngay_bat_dau` date DEFAULT NULL,
  `ngay_ket_thuc` date DEFAULT NULL,
  `trang_thai` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `loai`
--

CREATE TABLE `loai` (
  `id` varchar(255) NOT NULL,
  `ten_loai` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `loai_khuyen_mai`
--

CREATE TABLE `loai_khuyen_mai` (
  `id` varchar(255) NOT NULL,
  `khuyen_mai_id` varchar(255) DEFAULT NULL,
  `gia_tri` decimal(10,2) DEFAULT NULL,
  `loai_khuyen_mai` varchar(50) DEFAULT NULL,
  `loai_id` varchar(255) DEFAULT NULL,
  `so_luong_san_pham` int(11) DEFAULT NULL,
  `san_pham_id` varchar(255) DEFAULT NULL,
  `gia_tien` decimal(10,2) DEFAULT NULL,
  `so_luong_tang_kem` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `loai_san_pham`
--

CREATE TABLE `loai_san_pham` (
  `san_pham_id` varchar(255) NOT NULL,
  `loai_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `san_pham`
--

CREATE TABLE `san_pham` (
  `id` varchar(255) NOT NULL,
  `mo_ta` text DEFAULT NULL,
  `loai_may` varchar(50) DEFAULT NULL,
  `mat_kinh` varchar(50) DEFAULT NULL,
  `chat_lieu_vo` varchar(50) DEFAULT NULL,
  `chat_lieu_day` varchar(50) DEFAULT NULL,
  `mau_mat` varchar(50) DEFAULT NULL,
  `xuat_xu` varchar(50) DEFAULT NULL,
  `kieu_dang` varchar(50) DEFAULT NULL,
  `phong_cach` varchar(50) DEFAULT NULL,
  `duong_kinh` float DEFAULT NULL,
  `do_day` float DEFAULT NULL,
  `khang_nuoc` varchar(50) DEFAULT NULL,
  `bao_hanh_hang` varchar(50) DEFAULT NULL,
  `bao_hanh_shop` varchar(50) DEFAULT NULL,
  `khac` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `thanh_toan`
--

CREATE TABLE `thanh_toan` (
  `id` varchar(255) NOT NULL,
  `ngay_thanh_toan` date DEFAULT NULL,
  `loai` varchar(50) DEFAULT NULL,
  `so_tien` decimal(10,2) DEFAULT NULL,
  `don_hang_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `thong_tin_web`
--

CREATE TABLE `thong_tin_web` (
  `id` varchar(255) NOT NULL,
  `loai` varchar(255) DEFAULT NULL,
  `duong_dan` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `van_chuyen`
--

CREATE TABLE `van_chuyen` (
  `id` varchar(255) NOT NULL,
  `ngay_van_chuyen` date DEFAULT NULL,
  `dia_chi` text DEFAULT NULL,
  `trang_thai` varchar(50) DEFAULT NULL,
  `don_hang_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chi_nhanh_shop`
--
ALTER TABLE `chi_nhanh_shop`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chi_tiet_don_hang`
--
ALTER TABLE `chi_tiet_don_hang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `don_hang_id` (`don_hang_id`),
  ADD KEY `san_pham_id` (`san_pham_id`);

--
-- Indexes for table `dang_gia`
--
ALTER TABLE `dang_gia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `san_pham_id` (`san_pham_id`),
  ADD KEY `khach_hang_id` (`khach_hang_id`);

--
-- Indexes for table `don_hang`
--
ALTER TABLE `don_hang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `khach_hang_id` (`khach_hang_id`);

--
-- Indexes for table `hinh_anh`
--
ALTER TABLE `hinh_anh`
  ADD PRIMARY KEY (`id`),
  ADD KEY `san_pham_id` (`san_pham_id`);

--
-- Indexes for table `khach_hang`
--
ALTER TABLE `khach_hang`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `khieu_nai`
--
ALTER TABLE `khieu_nai`
  ADD PRIMARY KEY (`id`),
  ADD KEY `don_hang_id` (`don_hang_id`),
  ADD KEY `khach_hang_id` (`khach_hang_id`);

--
-- Indexes for table `kho_hang`
--
ALTER TABLE `kho_hang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `san_pham_id` (`san_pham_id`);

--
-- Indexes for table `khuyen_mai`
--
ALTER TABLE `khuyen_mai`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `loai`
--
ALTER TABLE `loai`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `loai_khuyen_mai`
--
ALTER TABLE `loai_khuyen_mai`
  ADD PRIMARY KEY (`id`),
  ADD KEY `khuyen_mai_id` (`khuyen_mai_id`),
  ADD KEY `loai_id` (`loai_id`),
  ADD KEY `san_pham_id` (`san_pham_id`);

--
-- Indexes for table `loai_san_pham`
--
ALTER TABLE `loai_san_pham`
  ADD PRIMARY KEY (`san_pham_id`,`loai_id`),
  ADD KEY `loai_id` (`loai_id`);

--
-- Indexes for table `san_pham`
--
ALTER TABLE `san_pham`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `thanh_toan`
--
ALTER TABLE `thanh_toan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `don_hang_id` (`don_hang_id`);

--
-- Indexes for table `thong_tin_web`
--
ALTER TABLE `thong_tin_web`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `van_chuyen`
--
ALTER TABLE `van_chuyen`
  ADD PRIMARY KEY (`id`),
  ADD KEY `don_hang_id` (`don_hang_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chi_tiet_don_hang`
--
ALTER TABLE `chi_tiet_don_hang`
  ADD CONSTRAINT `chi_tiet_don_hang_ibfk_1` FOREIGN KEY (`don_hang_id`) REFERENCES `don_hang` (`id`),
  ADD CONSTRAINT `chi_tiet_don_hang_ibfk_2` FOREIGN KEY (`san_pham_id`) REFERENCES `san_pham` (`id`);

--
-- Constraints for table `dang_gia`
--
ALTER TABLE `dang_gia`
  ADD CONSTRAINT `dang_gia_ibfk_1` FOREIGN KEY (`san_pham_id`) REFERENCES `san_pham` (`id`),
  ADD CONSTRAINT `dang_gia_ibfk_2` FOREIGN KEY (`khach_hang_id`) REFERENCES `khach_hang` (`id`);

--
-- Constraints for table `don_hang`
--
ALTER TABLE `don_hang`
  ADD CONSTRAINT `don_hang_ibfk_1` FOREIGN KEY (`khach_hang_id`) REFERENCES `khach_hang` (`id`);

--
-- Constraints for table `hinh_anh`
--
ALTER TABLE `hinh_anh`
  ADD CONSTRAINT `hinh_anh_ibfk_1` FOREIGN KEY (`san_pham_id`) REFERENCES `san_pham` (`id`);

--
-- Constraints for table `khieu_nai`
--
ALTER TABLE `khieu_nai`
  ADD CONSTRAINT `khieu_nai_ibfk_1` FOREIGN KEY (`don_hang_id`) REFERENCES `don_hang` (`id`),
  ADD CONSTRAINT `khieu_nai_ibfk_2` FOREIGN KEY (`khach_hang_id`) REFERENCES `khach_hang` (`id`);

--
-- Constraints for table `kho_hang`
--
ALTER TABLE `kho_hang`
  ADD CONSTRAINT `kho_hang_ibfk_1` FOREIGN KEY (`san_pham_id`) REFERENCES `san_pham` (`id`);

--
-- Constraints for table `loai_khuyen_mai`
--
ALTER TABLE `loai_khuyen_mai`
  ADD CONSTRAINT `loai_khuyen_mai_ibfk_1` FOREIGN KEY (`khuyen_mai_id`) REFERENCES `khuyen_mai` (`id`),
  ADD CONSTRAINT `loai_khuyen_mai_ibfk_2` FOREIGN KEY (`loai_id`) REFERENCES `loai` (`id`),
  ADD CONSTRAINT `loai_khuyen_mai_ibfk_3` FOREIGN KEY (`san_pham_id`) REFERENCES `san_pham` (`id`);

--
-- Constraints for table `loai_san_pham`
--
ALTER TABLE `loai_san_pham`
  ADD CONSTRAINT `loai_san_pham_ibfk_1` FOREIGN KEY (`san_pham_id`) REFERENCES `san_pham` (`id`),
  ADD CONSTRAINT `loai_san_pham_ibfk_2` FOREIGN KEY (`loai_id`) REFERENCES `loai` (`id`);

--
-- Constraints for table `thanh_toan`
--
ALTER TABLE `thanh_toan`
  ADD CONSTRAINT `thanh_toan_ibfk_1` FOREIGN KEY (`don_hang_id`) REFERENCES `don_hang` (`id`);

--
-- Constraints for table `van_chuyen`
--
ALTER TABLE `van_chuyen`
  ADD CONSTRAINT `van_chuyen_ibfk_1` FOREIGN KEY (`don_hang_id`) REFERENCES `don_hang` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
