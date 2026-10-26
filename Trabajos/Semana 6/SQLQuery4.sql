-- Crear la base de datos (opcional si ya la tienes creada)
CREATE DATABASE db_sistema;
GO

USE db_sistema;
GO

-- 1. Tabla usuario
CREATE TABLE usuario (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL
);
GO

-- 2. Tabla producto
CREATE TABLE producto (
    codigo VARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    categoria VARCHAR(100) NULL,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    estado VARCHAR(20) NOT NULL,
    imagen VARCHAR(255) NULL
);
GO

-- 3. Tabla venta
CREATE TABLE venta (
    id_venta INT IDENTITY(1,1) PRIMARY KEY,
    fecha DATETIME NOT NULL DEFAULT GETDATE(),
    usuario VARCHAR(100) NOT NULL,
    tipo_venta VARCHAR(50) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    estado VARCHAR(20) NOT NULL
);
GO

-- 4. Tabla detalle_venta (Relación con venta y producto)
CREATE TABLE detalle_venta (
    id_detalle INT IDENTITY(1,1) PRIMARY KEY,
    id_venta INT NOT NULL,
    codigo_producto VARCHAR(50) NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    CONSTRAINT FK_detalle_venta_venta FOREIGN KEY (id_venta) REFERENCES venta(id_venta),
    CONSTRAINT FK_detalle_venta_producto FOREIGN KEY (codigo_producto) REFERENCES producto(codigo)
);
GO

-- 5. Tabla movimiento_inventario (Relación con producto)
CREATE TABLE movimiento_inventario (
    id_movimiento INT IDENTITY(1,1) PRIMARY KEY,
    codigo_producto VARCHAR(50) NOT NULL,
    fecha DATETIME NOT NULL DEFAULT GETDATE(),
    tipo_movimiento VARCHAR(50) NOT NULL,
    cantidad INT NOT NULL,
    motivo VARCHAR(255) NULL,
    usuario VARCHAR(100) NOT NULL,
    CONSTRAINT FK_movimiento_producto FOREIGN KEY (codigo_producto) REFERENCES producto(codigo)
);
GO