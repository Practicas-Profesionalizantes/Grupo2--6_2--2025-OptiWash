drop database if exists OptiWash;

CREATE DATABASE OptiWash;

use OptiWash;

-- Módulo Vehículos/Servicios/Cliente
CREATE TABLE Cliente(
    ID INT auto_increment PRIMARY KEY,
    Nombre VARCHAR(30),
    Telefono INT
);
CREATE TABLE Vehiculo (
    ID int auto_increment PRIMARY KEY,
    ID_Cliente INT REFERENCES Cliente(ID),
    Patente VARCHAR(10),
    Marca VARCHAR(50)
);

CREATE TABLE Servicio (
    ID int auto_increment PRIMARY KEY,
    Tipo_Servicio VARCHAR(50),
    Precio DECIMAL(10,2)
);

CREATE TABLE Registro_Lavado (
    ID int auto_increment PRIMARY KEY,
    ID_Vehiculo INT REFERENCES Vehiculo(ID),
    ID_Servicio INT REFERENCES Servicio(ID),
    ID_Cliente INT REFERENCES Cliente(ID),
    Fecha_Hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Módulo Asistencias
CREATE TABLE Empleado (
    ID int auto_increment PRIMARY KEY,
    Nombre VARCHAR(100),
    Cargo VARCHAR(50)
);

CREATE TABLE Asistencia (
    ID_ int auto_increment PRIMARY KEY,
    ID_Empleado INT REFERENCES Empleado(ID),
    Fecha DATE DEFAULT (CURRENT_DATE()),
    Hora_Entrada TIME DEFAULT (CURRENT_TIME())
);
-- Módulo Inventario
CREATE TABLE Producto (
    ID int auto_increment PRIMARY KEY,
    Nombre VARCHAR(50),
    Litros float,
    Img VARCHAR(500)
);

CREATE TABLE Movimiento_Inventario (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    ID_Producto INT REFERENCES Producto(ID),
    Fecha DATE DEFAULT (CURRENT_DATE()),
    Tipo ENUM('Entrada', 'Salida'),
    Litros FLOAT
);


-- Insertar datos en la tabla Cliente
INSERT INTO Cliente (Nombre, Telefono) VALUES 
('Juan Pérez', 912345678),
('María López', 987654321),
('Carlos Rodríguez', 923456789),
('Ana Martínez', 934567890),
('Roberto Gómez', 945678901),
('Laura Torres', 956789012),
('Sergio Hernández', 967890123),
('Patricia Sánchez', 978901234),
('Miguel Fernández', 989012345),
('Carmen Díaz', 990123456);

-- Insertar datos en la tabla Vehiculo
INSERT INTO Vehiculo (ID_Cliente, Patente, Marca) VALUES 
(1, 'ABC123', 'Toyota'),
(1, 'DEF456', 'Nissan'),
(2, 'GHI789', 'Honda'),
(3, 'JKL012', 'Chevrolet'),
(4, 'MNO345', 'Ford'),
(5, 'PQR678', 'Hyundai'),
(6, 'STU901', 'Mazda'),
(7, 'VWX234', 'Kia'),
(8, 'YZA567', 'Suzuki'),
(9, 'BCD890', 'Volkswagen'),
(10, 'EFG123', 'Peugeot');

-- Insertar datos en la tabla Servicio
INSERT INTO Servicio (Tipo_Servicio, Precio) VALUES 
('Lavado Básico', 10.00),
('Lavado Premium', 20.00),
('Lavado y Encerado', 30.00),
('Limpieza Interior', 15.00),
('Lavado Completo', 35.00),
('Desinfección', 25.00),
('Pulido', 40.00),
('Lavado Motor', 45.00),
('Cambio de Aceite', 50.00),
('Tratamiento Cuero', 60.00);

-- Insertar datos en la tabla Registro_Lavado
INSERT INTO Registro_Lavado (ID_Vehiculo, ID_Servicio, ID_Cliente, Fecha_Hora) VALUES 
(1, 1, 1, '2025-05-01 10:00:00'),
(2, 2, 1, '2025-05-02 11:30:00'),
(3, 3, 2, '2025-05-02 14:00:00'),
(4, 4, 3, '2025-05-03 09:15:00'),
(5, 5, 4, '2025-05-03 16:45:00'),
(6, 1, 5, '2025-05-04 10:30:00'),
(7, 2, 6, '2025-05-04 13:00:00'),
(8, 3, 7, '2025-05-05 11:45:00'),
(9, 4, 8, '2025-05-05 15:30:00'),
(10, 5, 9, '2025-05-06 09:00:00'),
(11, 6, 10, '2025-05-06 12:15:00'),
(1, 7, 1, '2025-05-07 10:45:00'),
(3, 8, 2, '2025-05-07 14:30:00'),
(5, 9, 4, '2025-05-08 08:15:00');

-- Insertar datos en la tabla Empleado
INSERT INTO Empleado (Nombre, Cargo) VALUES 
('Pedro Alvarez', 'Lavador'),
('Sofía Ramírez', 'Cajero'),
('Diego Morales', 'Supervisor'),
('Valentina Castro', 'Lavador'),
('Javier Ortiz', 'Detallador'),
('Isabel Flores', 'Recepcionista'),
('Andrés Vargas', 'Lavador'),
('Carolina Reyes', 'Administrativo'),
('Eduardo Jiménez', 'Gerente'),
('Gabriela Medina', 'Lavador');

-- Insertar datos en la tabla Asistencia
INSERT INTO Asistencia (ID_Empleado, Fecha, Hora_Entrada) VALUES 
(1, '2025-05-01', '08:00:00'),
(2, '2025-05-01', '08:15:00'),
(3, '2025-05-01', '08:30:00'),
(4, '2025-05-01', '08:45:00'),
(5, '2025-05-01', '09:00:00'),
(1, '2025-05-02', '08:05:00'),
(2, '2025-05-02', '08:10:00'),
(3, '2025-05-02', '08:30:00'),
(4, '2025-05-02', '08:40:00'),
(5, '2025-05-02', '09:15:00'),
(6, '2025-05-03', '08:00:00'),
(7, '2025-05-03', '08:20:00'),
(8, '2025-05-03', '08:30:00'),
(9, '2025-05-03', '09:00:00'),
(10, '2025-05-03', '09:10:00'),
(1, '2025-05-04', '08:00:00'),
(3, '2025-05-04', '08:30:00'),
(5, '2025-05-04', '09:00:00'),
(7, '2025-05-04', '09:15:00'),
(9, '2025-05-04', '09:30:00');

-- Insertar datos en la tabla Producto
INSERT INTO Producto (Nombre, Litros, Img) VALUES 
('Shampoo para autos',15, "https://www.fullcarweb.com.ar/wp-content/uploads/2019/01/Shampoo-Lava-Autos-x-480-cc-ok-3.jpg"),
('limpia tapizados', 5, "https://www.fullcarweb.com.ar/wp-content/uploads/2019/01/Limpia-Tapizados-x-480-cc-ok.jpg"),
('silicona de goma', 15, "https://www.fullcarweb.com.ar/wp-content/uploads/2019/01/Reviv-Gomas-y-Alfombras-Verde-x-20-lts-ok.jpg"),
('silicona de plástico', 15, "https://www.fullcarweb.com.ar/wp-content/uploads/2019/01/Protectant-Aromatizado-x-5-Lt-b.jpg"),
('saca bichos', 20, "https://www.fullcarweb.com.ar/wp-content/uploads/2019/01/Removedor-de-Insectos-x-480-cc-ok.jpg"),
('Desengrasante', 5, "https://www.fullcarweb.com.ar/wp-content/uploads/2019/06/Limpia-Cristales-Listo-para-usar-5-lts-ok.jpg"),
('perfume', 5, "https://www.fullcarweb.com.ar/wp-content/uploads/2020/06/Fragancia-Ambiental-x-480-cc.jpg"),
('cera para brillo', 5, "https://www.fullcarweb.com.ar/wp-content/uploads/2019/01/Componente-2.jpg");

-- Insertar datos en la tabla Movimiento_Inventario
INSERT INTO Movimiento_Inventario (ID_Producto, Fecha, Tipo, Litros) VALUES 
(1, '2025-04-15', 'Entrada', 60),
(2, '2025-04-15', 'Entrada', 40),
(3, '2025-04-16', 'Entrada', 50),
(4, '2025-04-16', 'Entrada', 30),
(5, '2025-04-17', 'Entrada', 45),
(1, '2025-04-20', 'Salida', 10),
(2, '2025-04-21', 'Salida', 10),
(3, '2025-04-22', 'Salida', 5),
(4, '2025-04-23', 'Salida', 5),
(5, '2025-04-24', 'Salida', 5),
(6, '2025-04-25', 'Entrada', 40),
(7, '2025-04-26', 'Entrada', 70),
(8, '2025-04-27', 'Entrada', 120),
(2, '2025-04-28', 'Entrada', 100),
(1, '2025-04-29', 'Entrada', 50),
(6, '2025-05-01', 'Salida', 5),
(7, '2025-05-02', 'Salida', 10),
(8, '2025-05-03', 'Salida', 20),
(6, '2025-05-04', 'Salida', 20),
(8, '2025-05-05', 'Salida', 15);
