-- phpMyAdmin SQL Dump
-- version 2.11.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 05, 2013 at 02:43 AM
-- Server version: 5.1.57
-- PHP Version: 5.2.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `a1641475_Tuto`
--

-- --------------------------------------------------------

--
-- Table structure for table `Categorias`
--

CREATE TABLE `Categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(200) COLLATE latin1_general_ci NOT NULL,
  `Icono` varchar(200) COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci AUTO_INCREMENT=12 ;

--
-- Dumping data for table `Categorias`
--

INSERT INTO `Categorias` VALUES(1, 'Centros de buceo', 'azul');
INSERT INTO `Categorias` VALUES(2, 'Puertos deportivos', 'azul_cielo');
INSERT INTO `Categorias` VALUES(3, 'Piscinas naturales', 'turquesa');
INSERT INTO `Categorias` VALUES(4, 'Playas', 'naranja');
INSERT INTO `Categorias` VALUES(5, 'Imprescindibles', 'rojo');
INSERT INTO `Categorias` VALUES(6, 'Espacios naturales', 'verde');
INSERT INTO `Categorias` VALUES(7, 'Parques de ocio', 'amarillo');
INSERT INTO `Categorias` VALUES(8, 'Campos de golf', 'verde_oscuro');
INSERT INTO `Categorias` VALUES(9, 'Oficinas de información turística', 'violeta');
INSERT INTO `Categorias` VALUES(10, 'Centros históricos', 'marron');
INSERT INTO `Categorias` VALUES(11, 'Spa', 'negro');
