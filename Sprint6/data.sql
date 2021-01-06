-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:8889
-- Tiempo de generación: 11-11-2020 a las 22:42:53
-- Versión del servidor: 5.7.26
-- Versión de PHP: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `eCommerce-3DZ`
--

--
-- Volcado de datos para la tabla `materials`
--

INSERT INTO `materials` (`id`, `tipomaterial`) VALUES
(1, 'PLA'),
(2, 'ABS'),
(3, 'Flex'),
(4, 'Nylon12');

--
-- Volcado de datos para la tabla `medidas`
--

INSERT INTO `medidas` (`id`, `tamanios`) VALUES
(1, 'Mediano'),
(2, 'Reducido'),
(3, 'Grande');

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `precio`, `descripcion`, `imagen`, `pintado`, `medida_id`, `material_id`) VALUES
(8, 850, 'MATE SITH LORD: DARTH VADER', '\\uploads\\image-1604874805228.png', 'si', 2, 1),
(9, 1100, 'Walker Juego PC \"War Thunder\"', '\\uploads\\image-1604875376010.png', 'si', 2, 1),
(10, 900, 'MASCARA', '\\uploads\\image-1604875418954.png', 'si', 1, 1),
(11, 1320, 'X-WING STAR WARS BATTLE', '\\uploads\\image-1604875465321.png', 'si', 1, 1),
(12, 690, 'CASA MINIATURA', '\\uploads\\image-1604875506095.png', 'si', 2, 1),
(13, 1400, 'CHIMUELO', '\\uploads\\image-1604875532004.png', 'si', 1, 1),
(14, 50, 'Producto para pruebas', '\\uploads\\image-1604875857409.jpg', 'no', 3, 4);

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombreApellido`, `email`, `password`, `telefono`, `domicilio`, `localidad`) VALUES
(1, 'Alejandro Neustadt ', 'dialneus@gmail.com', '$2b$10$hPHMCXPrTQ/MCOpVyW34YeryaFIlmw.OZ4zG4b/SycR5cUq2mpUm6', 1111111111, ' monroe 940', 'caba'),
(2, 'Mariano Jerez ', 'mariano@jerez.com', '$2b$10$yshrV1wQwHVjrHKstRN3KOgVTHxw1IKuBEA52Yq.jZQdls2o1NoY.', 222222222, ' monroe 9400', 'bsas'),
(3, 'Kevin Schild ', 'kevin@schild.com.ar', '$2b$10$pyFlNaSKzRLVy//83bM9BuYFs.2hLOBBQpYKbdUwMR4gGq3WP3z1u', 33333333, ' monroe 1940', 'misiones');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
