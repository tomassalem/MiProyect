DROP SCHEMA IF EXISTS proyectoprogramacion2;
CREATE SCHEMA proyectoprogramacion2;
USE proyectoprogramacion2;

CREATE TABLE usuarios(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
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
createdAt DATETIME,


FOREIGN KEY (usuariosId) REFERENCES usuarios(id)
);

CREATE TABLE comentarios(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
tablaproductosId INT UNSIGNED ,
usuariosId INT UNSIGNED NOT NULL,
texto TEXT,
createdAt DATETIME,


FOREIGN KEY (usuariosId) REFERENCES usuarios(id),
FOREIGN KEY (tablaproductosId) REFERENCES tablaproductos(id)

);

-- cargar datos de usuarios
INSERT INTO usuarios
   VALUES (DEFAULT ,"Sergio", "Rodriguez", "serodriguez", "1998-03-15", "1130308888", "sergiorodriguez@gmail.com", "sergio123"),
          (DEFAULT ,"Delfina", "Sanchez", "delfisanchez", "1789-05-30", "1130257658", "delfisanchez@gmail.com", "vskwano"),
          (DEFAULT ,"Micaela", "Areas", "micaareas", "2002-08-27", "1123425675", "micaareas19@gmail.com", "micacontraseña"),
          (DEFAULT ,"Sofia", "Puertos", "sofipuertos1", "2001-04-09", "1178963458", "sofipuertos1@gmail.com", "sofiia"),
		  (DEFAULT ,"Alma", "Juarez", "almajuarezz", "1999-05-10", "1130356723", "almajuarez@hotmail.com", "almajuarez124"),
          (DEFAULT ,"Nicolas", "Drones", "nicodrones", "2000-03-04", "1567892310", "nicodrones@hotmail.com", "nicoo2021");
   
-- cargar datos de tablaproductos
INSERT INTO tablaproductos
   VALUES (DEFAULT, "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2020/03/mujer-escribiendo-teclado-apple-1880865.jpg?itok=mcWPPpu5", "Teclado inalambrico para iMac", 1, "Interactúa por medio de la tecnología Bluetooth a diferencia del teclado con cable, este no cuenta con entrada USB.","2021-04-22"),
          (DEFAULT, "https://www.morph.com.ar/pub/media/catalog/product/cache/c249fbb42cf583b1a8cf6f6bd1b7b4b4/3/6/368688_a_luminariaaroledmesactripode25cm10w.jpg", "Aro de luz led", 2, "nos va a ofrecer una iluminación muy suave y uniforme que resultará interesante para retratos en planos cortos", "2019-06-03"),
          (DEFAULT, "https://www.garbarino.com/producto/pendrive-kingston-32-gb-3.0-dt100g332gb-negro/fad17bf472", "Pendrive 32 GB Kingston", 3, "El Pendrive Kingston 3.0 DT100 G3 es generación 3.0 lo que le permite transferir con facilidad y a una velocidad superior a las tecnologías USB", "2021-02-02"),
		  (DEFAULT, "https://cafiniuruguay.com.uy/wp-content/uploads/2020/10/851571061an_2BTPFGLL_53504921-d97d-48d6-a75f-f2e637f27b99_1000x1000_d59a6fc25be74d09a5be8db65f7f01d9.jpg","Microfono karaoke rose gold", 4,"Si desea el Karaoke Microphone como un altavoz Bluetooth, apague el eco y el volumen", "2020-03-04"),
          (DEFAULT, "https://graffica.info/wp-content/uploads/2019/04/09-Funda-Mac-mapa-mundo-1024x696.jpg", "Funda MacBook Air mapamundi", 5, "Con un estilo sobrio pero elegante encontramos esta funda para Mac con el mapamundi sobre fondo gris. El diseño es completamente funcional y fácil de usar.", "2020-02-10"),
          (DEFAULT, "https://http2.mlstatic.com/D_NQ_NP_852305-MLA43773254716_102020-O.jpg", "Comecable personajes Disney-Pixar", 1, "Protege tu cargador para que no se te rompa la ficha del cable, y sirve para el adaptador cuadrado del iphone", "2019-08-07"),
          (DEFAULT, "https://http2.mlstatic.com/D_NQ_NP_813487-MLA40539814334_012020-O.webp", "Proyector Wifi Gadnic Mirror Notebook Full Hd Wifi Miracast", 2, "Perfecto para el entretenimiento en el hogar, el proyector Gadnic ULTRA Led cuenta con 2000 lúmenes, resolución nativa de 800x480, un diseño intuitivo, fácil de usar y un elegante chasis Negro.", "2021-03-01"),
          (DEFAULT, "https://http2.mlstatic.com/D_NQ_NP_931770-MLA44879425306_022021-O.webp", "Trípode Celular Camara Plegable Aluminio Telescopico 3110", 3, "Tripode para Camaras Fotograficas, Filmadoras, Smartphone y Camaras Deportivas (Go Pro, Go Cam) practico y portátil, patas de 4 secciones, con cierres de seguridad para un soporte firme y seguro", "2018-04-04"),
          (DEFAULT, "https://http2.mlstatic.com/D_NQ_NP_702687-MLA41596531834_042020-O.webp", "Rollo Fujifilm Pack 20 Fotos Instax Mini 9 Mini 8 Oficial", 4, "La película Instax Mini es para todas las cámaras Instax Mini y viene en 2 cartuchos útiles. Ofrece imágenes instantáneas espectaculares que puede llevar en la cartera, el monedero o en un marco para fotografías en miniatura", "2020-10-10"),
          (DEFAULT, "https://www.kennen.com.ar/img/productos/7106/juego-544-mejorada.jpg", "Botellas de tinta para impresora Epson L3110", 5, "Combo de 4 Botellas de Tinta EPSON 544 Color Negro, Magenta, Amarillo y Cian. Cada botella de tinta contiene 70 ml de tinta Epson original", "2021-04-08")
   ;
-- cargar datos de comentarios   
INSERT INTO comentarios
   VALUES (DEFAULT, 1, 1, "Muy buen producto", "2021-04-22"),
          (DEFAULT, 2,2 , "Buena calidad", "2019-06-03"),
          (DEFAULT, 3,3, "Muy mala calidad", "2018-07-02"),
		  (DEFAULT, 4, 4, "Muy buena atencion al cliente y buen precio", "2019-05-05");
   
   
   