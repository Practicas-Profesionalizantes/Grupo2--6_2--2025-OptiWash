DROP DATABASE IF EXISTS OptiWash;
CREATE DATABASE OptiWash;

use OptiWash;


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


CREATE TABLE Empleado (
	ID int auto_increment PRIMARY KEY,
	Nombre VARCHAR(100),
	Cargo VARCHAR(50),
    celular varchar(50)
);

CREATE TABLE Pagado (
	ID int auto_increment PRIMARY KEY,
	ID_Empleado INT,
	Fecha_hora datetime not null,
	Pagado boolean,
	foreign key (ID_Empleado) references Empleado(ID)
);

CREATE TABLE vale (
	ID int auto_increment PRIMARY KEY,
	ID_Empleado INT,
	Fecha_hora datetime not null,
	vale INT unsigned not null,
	foreign key (ID_Empleado) references Empleado(ID)
);

CREATE TABLE Asistencia (
	ID int auto_increment PRIMARY KEY,
	ID_Empleado INT,
	Fecha_hora datetime not null,
	estado enum('Presente','Ausente','Tarde'),
	foreign key (ID_Empleado) references Empleado(ID)
);

CREATE TABLE Producto (
    ID int auto_increment PRIMARY KEY,
    Nombre VARCHAR(50),
    Bidon INT NOT NULL,
    Img VARCHAR(500),
    precio_unitario DECIMAL(15,2)
);

CREATE TABLE Movimiento_Inventario (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    ID_Producto INT,
    Fecha DATE DEFAULT (CURRENT_DATE()),
    Tipo ENUM('Entrada', 'Salida'),
    Bidon int unsigned not null,
    precio_momento DECIMAL(15,2) DEFAULT 0.00,
    foreign key (ID_Producto) references Producto(ID)
);



INSERT INTO Cliente (Nombre, Telefono) VALUES
('Carlos Gómez', 1123456789),
('María López', 1198765432),
('Juan Pérez', 1145678901),
('Lucía Fernández', 1176543210);


INSERT INTO Vehiculo (ID_Cliente, Patente, Marca) VALUES
(1, 'AB123CD', 'Toyota Corolla'),
(2, 'AC987BC', 'Honda Civic'),
(3, 'AE456FG', 'Ford Focus'),
(4, 'AF321GH', 'Chevrolet Onix');


INSERT INTO Servicio (Tipo_Servicio, Precio) VALUES
('Lavado exterior básico', 2500),
('Lavado completo con cera', 4000),
('Limpieza de tapizados', 3500),
('Lavado premium + perfume', 5000);


INSERT INTO Registro_Lavado (ID_Vehiculo, ID_Servicio, ID_Cliente, nota) VALUES
(1, 1, 1, 'Cliente pidió que se enfoque en las llantas'),
(2, 2, 2, 'Incluye encerado extra'),
(3, 3, 3, 'Limpieza profunda de tapizado'),
(4, 4, 4, 'Se aplicó perfume "Nuevo Auto"');


INSERT INTO Empleado (Nombre, Cargo,celular) VALUES
('José Ramírez', 'Lavador','23132131'),
('Ana Torres', 'Lavador','131231313'),
('Luis Martínez', 'Lavador','1231231321'),
('Sofía Díaz', 'Lavador','12312321313');






INSERT INTO Asistencia (ID_Empleado, Fecha_hora, estado) VALUES
(1, DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), 'Presente'),                           
(1, DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 1 DAY), 'Tarde'),   
(1, DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 2 DAY), 'Presente'),
(1, DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 3 DAY), 'Ausente'), 
(1, DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 4 DAY), 'Presente'),
(1, DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 5 DAY), 'Tarde');   


INSERT INTO Pagado (ID_Empleado, Fecha_hora, Pagado) VALUES
(1, DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 1 DAY), TRUE),  
(1, DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 4 DAY), TRUE),  
(1, DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 5 DAY), FALSE); 


INSERT INTO Vale (ID_Empleado, Fecha_hora, vale) VALUES
(1, DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 2 DAY), 350), 
(1, DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 4 DAY), 500); 






INSERT INTO Asistencia (ID_Empleado, Fecha_hora, estado) VALUES
(1, DATE_SUB(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 7 DAY), 'Tarde'),    
(1, DATE_SUB(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 6 DAY), 'Presente'), 
(1, DATE_SUB(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 5 DAY), 'Ausente'),  
(1, DATE_SUB(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 4 DAY), 'Presente'), 
(1, DATE_SUB(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 2 DAY), 'Tarde');    


INSERT INTO Pagado (ID_Empleado, Fecha_hora, Pagado) VALUES
(1, DATE_SUB(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 6 DAY), TRUE),  
(1, DATE_SUB(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 5 DAY), FALSE), 
(1, DATE_SUB(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 4 DAY), TRUE);  


INSERT INTO Vale (ID_Empleado, Fecha_hora, vale) VALUES
(1, DATE_SUB(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 7 DAY), 200), 
(1, DATE_SUB(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 4 DAY), 450), 
(1, DATE_SUB(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 3 DAY), 150); 






INSERT INTO Asistencia (ID_Empleado, Fecha_hora, estado) VALUES
(1, DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 7 DAY), 'Presente'), 
(1, DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 8 DAY), 'Ausente');  


INSERT INTO Pagado (ID_Empleado, Fecha_hora, Pagado) VALUES
(1, DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 8 DAY), FALSE); 

INSERT INTO Producto (Nombre, Bidon, Img, precio_unitario) VALUES 
('Shampoo para autos',15, "https://i.ibb.co/SXhMmVbW/Shampoo.png", 1000),
('Limpia tapizados', 5, "https://i.ibb.co/NgxrRpP1/Limpia-Tapizados.png", 1200),
('Silicona de goma', 15, "https://i.ibb.co/G3Ckgkgb/Silicona-De-Goma.png", 1500),
('Silicona de plástico', 15, "https://i.ibb.co/1GTPV7Jr/Silicona-De-Plastico.png", 2000),
('Saca bichos', 20, "https://i.ibb.co/0Rtk5YfP/Saca-Bicho.png", 1000),
('Desengrasante', 5, "https://i.ibb.co/mVpS5zfq/Desengrasante.png", 1700),
('Perfume', 5, "https://i.ibb.co/nNV3K1gX/Perfume.png", 500),
('Cera para brillo', 5, "https://i.ibb.co/R4v0kHgB/Cera-Brillo.png", 1030);

DELIMITER //

CREATE TRIGGER Movimiento_Productos
AFTER UPDATE ON Producto
FOR EACH ROW
BEGIN
    DECLARE diferencia INT;
    SET diferencia = NEW.Bidon - OLD.Bidon;

    IF diferencia > 0 THEN
        
        INSERT INTO Movimiento_Inventario (ID_Producto, Fecha, Tipo, Bidon, precio_momento)
        VALUES (NEW.ID, NOW(), 'Entrada', diferencia, NEW.precio_unitario);
    ELSEIF diferencia < 0 THEN
        
        INSERT INTO Movimiento_Inventario (ID_Producto, Fecha, Tipo, Bidon, precio_momento)
        VALUES (NEW.ID, NOW(), 'Salida', ABS(diferencia), NEW.precio_unitario);
    END IF;
END//

DELIMITER ;

UPDATE Producto SET Bidon = 10 WHERE ID = 1; 
UPDATE Producto SET Bidon = 3 WHERE ID = 2;  
UPDATE Producto SET Bidon = 12 WHERE ID = 3; 
UPDATE Producto SET Bidon = 18 WHERE ID = 5; 