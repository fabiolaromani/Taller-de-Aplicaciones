-- Crear la base de datos si no existe
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'nebula_db')
BEGIN
    CREATE DATABASE nebula_db;
END
GO

USE nebula_db;
GO

-- Crear la tabla de usuarios
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'usuario')
BEGIN
    CREATE TABLE usuario (
        id INT IDENTITY(1,1) PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        rol VARCHAR(20) NOT NULL DEFAULT 'CLIENTE' -- 'ADMIN' o 'CLIENTE'
    );
END
GO

-- Insertar al usuario Administrador por defecto
IF NOT EXISTS (SELECT * FROM usuario WHERE email = 'admi@gmail.com')
BEGIN
    INSERT INTO usuario (nombre, email, password, rol) VALUES
    ('Fabiola Romani', 'admi@gmail.com', '1234', 'ADMIN');
END
GO

-- Crear la tabla de productos
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'producto')
BEGIN
    CREATE TABLE producto (
        codigo VARCHAR(20) PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        categoria VARCHAR(50) NOT NULL,
        precio DECIMAL(10,2) NOT NULL,
        stock INT NOT NULL,
        estado VARCHAR(20) NOT NULL,
        imagen VARCHAR(255) DEFAULT 'default.png'
    );
END
GO

-- Insertar productos iniciales de prueba
INSERT INTO producto (codigo, nombre, categoria, precio, stock, estado, imagen) VALUES
('P001', 'Laptop Lenovo ', 'Laptops', 899.00, 10, 'Disponible', 'default.png'),
('P002', 'Orbit Keys 75', 'Teclados', 129.00, 5, 'Disponible', 'default.png');
GO