DROP SCHEMA IF EXISTS proyectoprogramacion2;
CREATE SCHEMA proyectoprogramacion2;
USE proyectoprogramacion2;

CREATE TABLE usuarios(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	 createdAt TIMESTAMP,
     updatedAt DATETIME,
     nombre VARCHAR(80) NOT NULL,
     apellido VARCHAR(30) NOT NULL,
     nombreusuario VARCHAR(30) NOT NULL,
	 fechanacimiento DATETIME NOT NULL,
     telefono VARCHAR(30),
     email VARCHAR(255)  NOT NULL,
     password VARCHAR(255) NOT NULL	
);
     
     

     
CREATE TABLE tablaproductos(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
image VARCHAR(255) NOT NULL,
titulo VARCHAR(300),
usuariosId INT UNSIGNED NOT NULL,
description TEXT,
createdAt TIMESTAMP,
updatedAt DATETIME,

FOREIGN KEY (usuariosId) REFERENCES usuarios(id)
);

CREATE TABLE comentarios(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
tablaproductosId INT UNSIGNED ,
usuariosId INT UNSIGNED NOT NULL,
texto TEXT,
createdAt TIMESTAMP,
updatedAt DATETIME,


FOREIGN KEY (usuariosId) REFERENCES usuarios(id),
FOREIGN KEY (tablaproductosId) REFERENCES tablaproductos(id)

);

-- cargar datos de usuarios
INSERT INTO usuarios
   VALUES (DEFAULT , DEFAULT, DEFAULT, "Sergio", "Rodriguez", "serodriguez", "1998-03-15", "1130308888", "sergiorodriguez@gmail.com", "sergio123"),
          (DEFAULT ,DEFAULT, DEFAULT, "Delfina", "Sanchez", "delfisanchez", "1789-05-30", "1130257658", "delfisanchez@gmail.com", "vskwano"),
          (DEFAULT , DEFAULT, DEFAULT, "Micaela", "Areas", "micaareas", "2002-08-27", "1123425675", "micaareas19@gmail.com", "micacontraseña"),
          (DEFAULT ,DEFAULT, DEFAULT, "Sofia", "Puertos", "sofipuertos1", "2001-04-09", "1178963458", "sofipuertos1@gmail.com", "sofiia"),
		  (DEFAULT ,DEFAULT, DEFAULT, "Alma", "Juarez", "almajuarezz", "1999-05-10", "1130356723", "almajuarez@hotmail.com", "almajuarez124"),
          (DEFAULT ,DEFAULT, DEFAULT, "Nicolas", "Drones", "nicodrones", "2000-03-04", "1567892310", "nicodrones@hotmail.com", "nicoo2021");
   
-- cargar datos de tablaproductos
INSERT INTO tablaproductos
   VALUES (DEFAULT, "teclado.jpg", "Teclado inalambrico para iMac", 1, "Interactúa por medio de la tecnología Bluetooth a diferencia del teclado con cable, este no cuenta con entrada USB.",DEFAULT, DEFAULT),
          (DEFAULT, "luz.jpg", "Aro de luz led", 2, "nos va a ofrecer una iluminación muy suave y uniforme que resultará interesante para retratos en planos cortos", DEFAULT, DEFAULT),
          (DEFAULT, "pendrive.jpg", "Pendrive 32 GB Kingston", 3, "El Pendrive Kingston 3.0 DT100 G3 es generación 3.0 lo que le permite transferir con facilidad y a una velocidad superior a las tecnologías USB", DEFAULT, DEFAULT),
		  (DEFAULT, "micro.jpg","Microfono karaoke rose gold", 4,"Si desea el Karaoke Microphone como un altavoz Bluetooth, apague el eco y el volumen", DEFAULT, DEFAULT),
          (DEFAULT, "macbook.jpg", "Funda MacBook Air mapamundi", 5, "Con un estilo sobrio pero elegante encontramos esta funda para Mac con el mapamundi sobre fondo gris. El diseño es completamente funcional y fácil de usar.", DEFAULT, DEFAULT),
          (DEFAULT, "comecable.jpg", "Comecable personajes Disney-Pixar", 1, "Protege tu cargador para que no se te rompa la ficha del cable, y sirve para el adaptador cuadrado del iphone",  DEFAULT, DEFAULT),
          (DEFAULT, "proyector.jpg", "Proyector Wifi Gadnic Mirror Notebook Full Hd Wifi Miracast", 2, "Perfecto para el entretenimiento en el hogar, el proyector Gadnic ULTRA Led cuenta con 2000 lúmenes, resolución nativa de 800x480, un diseño intuitivo, fácil de usar y un elegante chasis Negro.", DEFAULT, DEFAULT),
          (DEFAULT, "tripode.jpg", "Trípode Celular Camara Plegable Aluminio Telescopico 3110", 3, "Tripode para Camaras Fotograficas, Filmadoras, Smartphone y Camaras Deportivas (Go Pro, Go Cam) practico y portátil, patas de 4 secciones, con cierres de seguridad para un soporte firme y seguro", DEFAULT, DEFAULT),
          (DEFAULT, "rollo.jpg", "Rollo Fujifilm Pack 20 Fotos Instax Mini 9 Mini 8 Oficial", 4, "La película Instax Mini es para todas las cámaras Instax Mini y viene en 2 cartuchos útiles. Ofrece imágenes instantáneas espectaculares que puede llevar en la cartera, el monedero o en un marco para fotografías en miniatura", DEFAULT, DEFAULT),
          (DEFAULT, "botellas.jpg", "Botellas de tinta para impresora Epson L3110", 5, "Combo de 4 Botellas de Tinta EPSON 544 Color Negro, Magenta, Amarillo y Cian. Cada botella de tinta contiene 70 ml de tinta Epson original", DEFAULT, DEFAULT)
   ;
-- cargar datos de comentarios   
INSERT INTO comentarios
   VALUES (DEFAULT, 1, 1, "Muy buen producto", "2021-04-22", DEFAULT),
          (DEFAULT, 2,2 , "Buena calidad", "2019-06-03", DEFAULT),
          (DEFAULT, 3,3, "Muy mala calidad", "2018-07-02", DEFAULT),
		  (DEFAULT, 4, 4, "Muy buena atencion al cliente y buen precio", "2019-05-05", DEFAULT);
   
   
   
   