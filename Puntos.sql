-- phpMyAdmin SQL Dump
-- version 2.11.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 05, 2013 at 02:45 AM
-- Server version: 5.1.57
-- PHP Version: 5.2.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `a1641475_Tuto`
--

-- --------------------------------------------------------

--
-- Table structure for table `Puntos`
--

CREATE TABLE `Puntos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Latitud` varchar(200) COLLATE latin1_general_ci NOT NULL,
  `Longitud` varchar(200) COLLATE latin1_general_ci NOT NULL,
  `Nombre` varchar(200) COLLATE latin1_general_ci NOT NULL,
  `Categoria` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci AUTO_INCREMENT=115 ;

--
-- Dumping data for table `Puntos`
--

INSERT INTO `Puntos` VALUES(1, '28.121764', '-16.768367', 'Barakuda Diving Center', 1);
INSERT INTO `Puntos` VALUES(2, '28.08', '-16.732', 'Blue Bottom Diving', 1);
INSERT INTO `Puntos` VALUES(3, '28.405882', '-16.571294', 'Centro de Buceo Atlantik', 1);
INSERT INTO `Puntos` VALUES(4, '28.078597', '-16.735854', 'Diversity-Escuela de Buceo', 1);
INSERT INTO `Puntos` VALUES(5, '28.415673', '-16.548576', 'Centro de Buceo Ecosub Tenerife', 1);
INSERT INTO `Puntos` VALUES(6, '28.413484', '-16.555696', 'Centro de Buceo el Cardumen', 1);
INSERT INTO `Puntos` VALUES(7, '28.493747', '-16.209805', 'Marina de Santa Cruz', 2);
INSERT INTO `Puntos` VALUES(8, '28.019916', '-16.612005', 'Marina de San Miguel', 2);
INSERT INTO `Puntos` VALUES(9, '28.556772', '-16.343878', 'Bajamar', 3);
INSERT INTO `Puntos` VALUES(10, '28.396235', '-16.651847', 'Charco de la Laja', 3);
INSERT INTO `Puntos` VALUES(11, '28.420041', '-16.542985', 'Complejo Costa Martiánez', 3);
INSERT INTO `Puntos` VALUES(12, '28.372821', '-16.766418', 'El Caletón', 3);
INSERT INTO `Puntos` VALUES(13, '28.454370', '-16.254425', 'Parque Marítimo César Manrique', 3);
INSERT INTO `Puntos` VALUES(14, '28.570956', '-16.333493', 'Punta del Hidalgo', 3);
INSERT INTO `Puntos` VALUES(15, '28.006884', '-16.651315', 'Ten-Bel', 3);
INSERT INTO `Puntos` VALUES(16, '28.417816', '-16.520261', 'El Bollullo', 4);
INSERT INTO `Puntos` VALUES(17, '28.051682', '-16.728461', 'El Camisón', 4);
INSERT INTO `Puntos` VALUES(18, '28.090306', '-16.742990', 'El Duque', 4);
INSERT INTO `Puntos` VALUES(19, '28.043596', '-16.538233', 'El Médano', 4);
INSERT INTO `Puntos` VALUES(20, '28.395552', '-16.600394', 'El Socorro', 4);
INSERT INTO `Puntos` VALUES(21, '28.229483', '-16.840699', 'La Arena', 4);
INSERT INTO `Puntos` VALUES(22, '28.079563', '-16.735342', 'La Pinta', 4);
INSERT INTO `Puntos` VALUES(23, '28.031507', '-16.555105', 'La Tejita', 4);
INSERT INTO `Puntos` VALUES(24, '28.508114', '-16.185412', 'Las Teresitas', 4);
INSERT INTO `Puntos` VALUES(25, '28.051414', '-16.723402', 'Las Vistas', 4);
INSERT INTO `Puntos` VALUES(26, '28.049740', '-16.718781', 'Los Cristianos', 4);
INSERT INTO `Puntos` VALUES(27, '28.416993', '-16.538341', 'Martiánez', 4);
INSERT INTO `Puntos` VALUES(28, '28.499817', '-16.424900', 'Playa de Mesa del Mar', 4);
INSERT INTO `Puntos` VALUES(29, '28.412002', '-16.561150', 'Playa Jardín', 4);
INSERT INTO `Puntos` VALUES(30, '28.377981', '-16.723537', 'San Marcos', 4);
INSERT INTO `Puntos` VALUES(31, '28.085415', '-16.737369', 'Torviscas y Fañabé ', 4);
INSERT INTO `Puntos` VALUES(32, '28.070146', '-16.732972', 'Troya ', 4);
INSERT INTO `Puntos` VALUES(33, '28.252971', '-16.840560', 'Acantilados de los Gigantes', 5);
INSERT INTO `Puntos` VALUES(34, '28.456099', '-16.251373', 'Auditorio de Tenerife', 5);
INSERT INTO `Puntos` VALUES(35, '28.351308', '-16.369848', 'Basílica Nuestra Señora de la Candelaria', 5);
INSERT INTO `Puntos` VALUES(36, '28.372972', '-16.764409', 'Centro Histórico de Garachico', 5);
INSERT INTO `Puntos` VALUES(37, '28.485668', '-16.316696', 'Centro Histórico de La Laguna', 5);
INSERT INTO `Puntos` VALUES(38, '28.389811', '-16.524353', 'Centro Histórico de La Orotava', 5);
INSERT INTO `Puntos` VALUES(39, '28.305116', '-16.840352', 'Caserío de Masca', 5);
INSERT INTO `Puntos` VALUES(40, '28.473491', '-16.425501', 'Casa del Vino', 5);
INSERT INTO `Puntos` VALUES(41, '28.366502', '-16.721139', 'Parque del Drago', 5);
INSERT INTO `Puntos` VALUES(42, '28.263508', '-16.635773', 'Parque Nacional del Teide', 5);
INSERT INTO `Puntos` VALUES(43, '28.518569', '-16.264008', 'Parque Rural de Anaga', 5);
INSERT INTO `Puntos` VALUES(44, '28.252971', '-16.840560', 'Acantilados de los Gigantes', 6);
INSERT INTO `Puntos` VALUES(45, '28.136270', '-16.703243', 'Barranco del Infierno', 6);
INSERT INTO `Puntos` VALUES(46, '28.292984', '-16.756131', 'Chinyero', 6);
INSERT INTO `Puntos` VALUES(47, '28.308116', '-16.372965', 'Malpaís de Güímar', 6);
INSERT INTO `Puntos` VALUES(48, '28.026957', '-16.547144', 'Montaña Roja y Montaña Pelada', 6);
INSERT INTO `Puntos` VALUES(49, '28.191302', '-16.604228', 'Paisaje Lunar de Granadilla', 6);
INSERT INTO `Puntos` VALUES(50, '28.263508', '-16.635773', 'Parque Nacional del Teide', 6);
INSERT INTO `Puntos` VALUES(51, '28.303139', '-16.666872', 'Parque Natural de la Corona Forestal', 6);
INSERT INTO `Puntos` VALUES(52, '28.518569', '-16.264008', 'Parque Rural de Anaga', 6);
INSERT INTO `Puntos` VALUES(53, '28.321492', '-16.835764', 'Parque Rural de Teno', 6);
INSERT INTO `Puntos` VALUES(54, '28.396879', '-16.593693', 'Rambla de Castro', 6);
INSERT INTO `Puntos` VALUES(55, '28.079179', '-16.727940', 'Aqualand Costa Adeje', 7);
INSERT INTO `Puntos` VALUES(56, '28.408289', '-16.564637', 'Loro Parque', 7);
INSERT INTO `Puntos` VALUES(57, '28.366502', '-16.721139', 'Parque del Drago', 7);
INSERT INTO `Puntos` VALUES(58, '28.078997', '-16.695681', 'Parque Las Águilas-Jungle Park', 7);
INSERT INTO `Puntos` VALUES(59, '28.453896', '-16.254143', 'Parque Marítimo César Manrique', 7);
INSERT INTO `Puntos` VALUES(60, '28.292436', '-16.520840', 'Parque Etnográfico Pirámides de Güímar', 7);
INSERT INTO `Puntos` VALUES(61, '28.395686', '-16.537439', 'PuebloChico', 7);
INSERT INTO `Puntos` VALUES(62, '28.072140', '-16.725886', 'Siam Park', 7);
INSERT INTO `Puntos` VALUES(63, '28.170975', '-16.796783', 'Abama', 8);
INSERT INTO `Puntos` VALUES(64, '28.025161', '-16.613911', 'Amarilla Golf ', 8);
INSERT INTO `Puntos` VALUES(65, '28.372252', '-16.863517', 'Buenavista Golf', 8);
INSERT INTO `Puntos` VALUES(66, '28.037541', '-16.681334', 'Centro de Golf Los Palos', 8);
INSERT INTO `Puntos` VALUES(67, '28.114123', '-16.751785', 'Golf Costa Adeje', 8);
INSERT INTO `Puntos` VALUES(68, '28.033414', '-16.609073', 'Golf del Sur', 8);
INSERT INTO `Puntos` VALUES(69, '28.061861', '-16.721847', 'Golf Las Américas', 8);
INSERT INTO `Puntos` VALUES(70, '28.488031', '-16.379501', 'Real Club de Golf de Tenerife', 8);
INSERT INTO `Puntos` VALUES(71, '28.033578', '-17.188486', 'Tecina Golf', 8);
INSERT INTO `Puntos` VALUES(72, '28.047728', '-16.579211', 'Oficina de información turística Cabildo Aeropuerto Tenerife Sur', 9);
INSERT INTO `Puntos` VALUES(73, '28.086105', '-16.736957', 'Oficina de información turística de Fañabé', 9);
INSERT INTO `Puntos` VALUES(74, '28.366895', '-16.720719', 'Oficina de información turística de Icod de Los Vinos', 9);
INSERT INTO `Puntos` VALUES(75, '28.048001', '-16.538662', 'Oficina de información turística del Médano', 9);
INSERT INTO `Puntos` VALUES(76, '28.064665', '-16.731607', 'Oficina de información turística de Arona - Playa de las Américas', 9);
INSERT INTO `Puntos` VALUES(77, '28.048425', '-16.712558', 'Oficina de información turística de Arona - Playa de las Vistas', 9);
INSERT INTO `Puntos` VALUES(78, '28.090573', '-16.739384', 'Oficina de información turística de Plaza del Duque', 9);
INSERT INTO `Puntos` VALUES(79, '28.415934', '-16.552175', 'Oficina de información turística Cabildo de Puerto de la Cruz', 9);
INSERT INTO `Puntos` VALUES(80, '28.487556', '-16.346112', 'Oficina de información turística Cabildo Aeropuerto de Los Rodeos', 9);
INSERT INTO `Puntos` VALUES(81, '28.487777', '-16.315377', 'Oficina de información turística de San Cristóbal de La Laguna', 9);
INSERT INTO `Puntos` VALUES(82, '28.466161', '-16.246954', 'Oficina de información turística Cabildo Santa Cruz de Tenerife', 9);
INSERT INTO `Puntos` VALUES(83, '28.071482', '-16.730814', 'Oficina de información turística de Costa Adeje - Troya', 9);
INSERT INTO `Puntos` VALUES(84, '28.121759', '-16.724598', 'Centro Histórico de Adeje', 10);
INSERT INTO `Puntos` VALUES(85, '28.099975', '-16.680681', 'Centro Histórico de Arona', 10);
INSERT INTO `Puntos` VALUES(86, '28.123091', '-16.576595', 'Centro Histórico de Granadilla de Abona', 10);
INSERT INTO `Puntos` VALUES(87, '28.415765', '-16.552493', 'Centro Histórico de Puerto de la Cruz', 10);
INSERT INTO `Puntos` VALUES(88, '28.470048', '-16.249465', 'Centro Histórico de Santa Cruz de Tenerife', 10);
INSERT INTO `Puntos` VALUES(89, '28.372972', '-16.764409', 'Centro Histórico de Garachico', 10);
INSERT INTO `Puntos` VALUES(90, '28.485668', '-16.316696', 'Centro Histórico de La Laguna', 10);
INSERT INTO `Puntos` VALUES(91, '28.389811', '-16.524353', 'Centro Histórico de La Orotava', 10);
INSERT INTO `Puntos` VALUES(92, '28.170738', '-16.800145', 'Abama Spa', 11);
INSERT INTO `Puntos` VALUES(93, '28.088490', '-16.736584', 'Aequor spa', 11);
INSERT INTO `Puntos` VALUES(94, '28.087400', '-16.724649', 'Aqua Club Termal', 11);
INSERT INTO `Puntos` VALUES(95, '28.566758', '-16.330938', 'Centro de medicina Natural Océano', 11);
INSERT INTO `Puntos` VALUES(96, '28.095752', '-16.745612', 'Caroli Health Club', 11);
INSERT INTO `Puntos` VALUES(97, '28.091939', '-16.742771', 'Bahía del Duque Spa', 11);
INSERT INTO `Puntos` VALUES(98, '28.075562', '-16.734150', 'Centro Wellness del Hotel Jardín Tropical', 11);
INSERT INTO `Puntos` VALUES(99, '28.414895', '-16.535697', 'Spa Blue Sea Puerto Resort', 11);
INSERT INTO `Puntos` VALUES(100, '28.053573', '-16.730060', 'Mare Nostrum Spa', 11);
INSERT INTO `Puntos` VALUES(101, '28.058319', '-16.732762', 'Natural Wellness Spa', 11);
INSERT INTO `Puntos` VALUES(102, '28.094817', '-16.746792', 'Riu Palace Body Love', 11);
INSERT INTO `Puntos` VALUES(103, '28.027185', '-16.611017', 'Spa Atlantis', 11);
INSERT INTO `Puntos` VALUES(104, '28.416239', '-16.541943', 'Bp San Felipe', 11);
INSERT INTO `Puntos` VALUES(105, '28.428976', '-16.495165', 'Club Spa La Quinta Park', 11);
INSERT INTO `Puntos` VALUES(106, '28.029516', '-16.600203', 'Spa Magek', 11);
INSERT INTO `Puntos` VALUES(107, '28.114254', '-16.748224', 'Spa Royal Garden Villas', 11);
INSERT INTO `Puntos` VALUES(108, '28.056395', '-16.735600', 'Spa Hotel Europe Villa Cortés', 11);
INSERT INTO `Puntos` VALUES(109, '28.160218', '-16.642488', 'Spa Villalba', 11);
INSERT INTO `Puntos` VALUES(110, '28.089400', '-16.738279', 'Thai Zen Space', 11);
INSERT INTO `Puntos` VALUES(111, '28.057240', '-16.735341', 'Thalasso H10 Conquistador', 11);
INSERT INTO `Puntos` VALUES(112, '28.096025', '-16.742730', 'Spa Nammu', 11);
INSERT INTO `Puntos` VALUES(113, '28.411513', '-16.537754', 'The Oriental Spa Garden', 11);
INSERT INTO `Puntos` VALUES(114, '28.091320', '-16.741051', 'Vitanova Spa Wellness', 11);
