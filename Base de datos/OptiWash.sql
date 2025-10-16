    DROP DATABASE IF EXISTS OptiWash;
    CREATE DATABASE optiwash;

    use OptiWash;

-- Módulo Vehículos/Servicios/Cliente
    CREATE TABLE Cliente(
        ID INT auto_increment PRIMARY KEY,
        Nombre VARCHAR(30),
        Telefono INT
    );
    CREATE TABLE Vehiculo (
        ID int auto_increment PRIMARY KEY,
        ID_Cliente INT,
        Patente VARCHAR(10),
        Marca VARCHAR(50),
        foreign key (ID_Cliente) REFERENCES Cliente(ID)
    );

    CREATE TABLE Servicio (
        ID int auto_increment PRIMARY KEY,
        Tipo_Servicio VARCHAR(50),
        Precio DECIMAL(10,2)
    );

    CREATE TABLE Registro_Lavado (
        ID int auto_increment PRIMARY KEY,
        ID_Vehiculo INT ,
        ID_Servicio INT ,
        ID_Cliente INT,
        Fecha_Hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        nota text,
        foreign key(ID_Servicio) REFERENCES servicio(ID),
        foreign key (ID_Vehiculo)REFERENCES Vehiculo(ID),
        foreign key (ID_Cliente) references Cliente(ID)
    );

    -- Módulo Asistencias
    CREATE TABLE Empleado (
        ID int auto_increment PRIMARY KEY,
        Nombre VARCHAR(100),
        Cargo VARCHAR(50)
    );

    CREATE TABLE Asistencia (
        ID_ int auto_increment PRIMARY KEY,
        ID_Empleado INT,
        Fecha_hora datetime not null,
        estado enum('Presente','Ausente','Tarde'),
        foreign key (ID_Empleado) references Empleado(ID)
        
    );
    -- Módulo Inventario
    CREATE TABLE Producto (
        ID int auto_increment PRIMARY KEY,
        Nombre VARCHAR(50),
        Bidon int unsigned not null,
        Img VARCHAR(500),
        precio_unitario DECIMAL(15,2)
    );

    CREATE TABLE Movimiento_Inventario (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        ID_Producto INT ,
        Fecha DATE DEFAULT (CURRENT_DATE()),
        Tipo ENUM('Entrada', 'Salida'),
        Bidon int unsigned not null,
        foreign key (ID_Producto) references Producto(ID)
    );


INSERT INTO Cliente (Nombre, Telefono) VALUES
('Juan Pérez', 1145678901),
('María López', 1150123456),
('Carlos García', 1167890123),
('Ana Torres', 1123456789);

INSERT INTO Vehiculo (ID_Cliente, Patente, Marca) VALUES
(1, 'AB123CD', 'Chevrolet'),
(2, 'FG456HJ', 'Ford'),
(1, 'KL789MN', 'Volkswagen'),
(3, 'OP012QR', 'Fiat'),
(4, 'ST345UV', 'Renault');

INSERT INTO Servicio (Tipo_Servicio, Precio) VALUES
('Lavado Básico Exterior', 2500.00),
('Lavado Completo (Exterior + Interior)', 4500.00),
('Lavado Premium + Cera', 6000.00),
('Limpieza de Tapizado', 9000.00),
('Lavado de Motor', 3500.00);

INSERT INTO Registro_Lavado (ID_Vehiculo, ID_Servicio, ID_Cliente, Fecha_Hora, nota) VALUES
(1, 2, 1, '2025-10-15 10:00:00', 'El cliente solicitó especial atención al polvo en el tablero.'),
(2, 1, 2, '2025-10-15 11:30:00', NULL),
(3, 3, 1, '2025-10-16 14:45:00', 'Se aplicó cera de alto brillo. Vehículo tenía barro.'),
(4, 4, 3, '2025-10-16 16:00:00', 'Limpieza profunda de tapizado de tela. Remoción de mancha de café.'),
(5, 1, 4, '2025-10-16 17:15:00', 'Revisar presión de neumáticos la próxima vez.');


INSERT INTO Empleado (Nombre, Cargo) VALUES
('Roberto Gómez', 'Lavador Experto'),
('Elena Ruiz', 'Cajero/Administrativo'),
('Miguel Díaz', 'Lavador Junior'),
('Laura Castro', 'Supervisora');

INSERT INTO Asistencia (ID_Empleado, Fecha_hora, estado) VALUES
(1, '2025-10-16 08:00:00', 'Presente'), 
(2, '2025-10-16 08:05:00', 'Tarde'),
(3, '2025-10-16 08:00:00', 'Presente'),
(4, '2025-10-16 09:00:00', 'Ausente'), 
(1, '2025-10-16 17:00:00', 'Presente');



INSERT INTO Producto (Nombre, Bidon, Img, precio_unitario) VALUES 
('Shampoo para autos',15, "https://www.fullcarweb.com.ar/wp-content/uploads/2019/01/Shampoo-Lava-Autos-x-480-cc-ok-3.jpg", 1000),
('Limpia tapizados', 5, "https://www.fullcarweb.com.ar/wp-content/uploads/2019/01/Limpia-Tapizados-x-480-cc-ok.jpg", 1200),
('Silicona de goma', 15, "https://www.fullcarweb.com.ar/wp-content/uploads/2019/01/Reviv-Gomas-y-Alfombras-Verde-x-20-lts-ok.jpg", 1500),
('Silicona de plástico', 15, "https://www.fullcarweb.com.ar/wp-content/uploads/2019/01/Protectant-Aromatizado-x-5-Lt-b.jpg", 2000),
('Saca bichos', 20, "https://www.fullcarweb.com.ar/wp-content/uploads/2019/01/Removedor-de-Insectos-x-480-cc-ok.jpg", 1000),
('Desengrasante', 5, "https://www.fullcarweb.com.ar/wp-content/uploads/2019/06/Limpia-Cristales-Listo-para-usar-5-lts-ok.jpg", 1700),
('Perfume', 5, "https://www.fullcarweb.com.ar/wp-content/uploads/2020/06/Fragancia-Ambiental-x-480-cc.jpg", 500),
('Cera para brillo', 5, "https://www.fullcarweb.com.ar/wp-content/uploads/2019/01/Componente-2.jpg", 1030);


DELIMITER //

CREATE TRIGGER Movimiento_Productos
AFTER UPDATE ON Producto
FOR EACH ROW
BEGIN
    DECLARE diferencia DECIMAL(10,2);
    SET diferencia = NEW.Bidon - OLD.Bidon;

    IF diferencia > 0 THEN
        -- Entrada: se agregaron litros
        INSERT INTO Movimiento_Inventario (ID_Producto, Fecha, Tipo, Bidon)
        VALUES (NEW.ID, NOW(), 'Entrada', diferencia);
    ELSEIF diferencia < 0 THEN
        -- Salida: se usaron litros
        INSERT INTO Movimiento_Inventario (ID_Producto, Fecha, Tipo, Bidon)
        VALUES (NEW.ID, NOW(), 'Salida', ABS(diferencia));
    END IF;
END//

DELIMITER ;
