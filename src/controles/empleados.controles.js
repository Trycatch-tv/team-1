const {pool} = require('../database');

export const obtenerEmpleados = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM empleados');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Algo ha ido mal'
        })
    }
}

export const crearEmpleados = async (req, res) => {
    const {nombre, apellido, identificacion, birthday, direction, email, phone, cargo, ingreso, sueldo} = req.body
    try {
        const [rows] = await pool.query('INSERT INTO EmpleadosTry(nombre, apellido, identificacion, birthday, direction, email, phone, cargo, ingreso, sueldo) VALUES (?,?,?,?,?,?,?,?,?,?)', [nombre, apellido, identificacion, birthday, direction, email, phone, cargo, ingreso, sueldo])
        res.send({
            id : rows.insertId,
            nombre,
            apellido,
            identificacion,
            birthday,
            direction,
            email,
            phone,
            cargo,
            ingreso,
            sueldo
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Algo ha ido mal'
        })
    }
}



