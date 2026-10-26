USE db_sistema;
GO

SELECT id, nombre, email, rol
FROM dbo.usuario
ORDER BY id DESC;


SELECT TOP 10
    codigo, nombre, precio, stock, estado
FROM dbo.producto
ORDER BY codigo;

SELECT TOP 5
    id_venta, fecha, usuario, tipo_venta, total, estado
FROM dbo.venta
ORDER BY id_venta DESC;

SELECT TOP 5
    id_detalle, id_venta, codigo_producto,
    cantidad, precio_unitario
FROM dbo.detalle_venta
ORDER BY id_detalle DESC;

SELECT DISTINCT rol
FROM dbo.usuario;

SELECT id, nombre, email, rol
FROM dbo.usuario
ORDER BY id DESC;