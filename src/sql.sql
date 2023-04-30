CREATE TABLE empleado (
  idEmpleado VARCHAR(255) NOT NULL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  apellido VARCHAR(255) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  direccion VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(255) NOT NULL,
  cargo VARCHAR(255) NOT NULL,
  fecha_ingreso DATE NOT NULL,
  sueldo DECIMAL(10,2) NOT NULL
);

CREATE TABLE departamento (
  idDepartamento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL
);

CREATE TABLE empleado_en_departamento (
  idEmpleado VARCHAR(255) NOT NULL,
  idDepartamento INT NOT NULL,
  PRIMARY KEY (idEmpleado, idDepartamento),
  FOREIGN KEY (idEmpleado) REFERENCES empleado (idEmpleado),
  FOREIGN KEY (idDepartamento) REFERENCES departamento (idDepartamento)
);

CREATE TABLE proyecto (
  idProyecto INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL
);

CREATE TABLE empleado_proyecto (
  idEmpleado VARCHAR(255) NOT NULL,
  idProyecto INT NOT NULL,
  PRIMARY KEY (idEmpleado, idProyecto),
  FOREIGN KEY (idEmpleado) REFERENCES empleado (idEmpleado),
  FOREIGN KEY (idProyecto) REFERENCES proyecto (idProyecto)
);
