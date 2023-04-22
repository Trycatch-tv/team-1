const {pool} = require('../database');

export const obtenerEmpleados = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM EmpleadosTry');
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

export const actualizarEmpleados = async (req, res) => {
    const {id} = req.params
    const {nombre, apellido, identificacion, birthday, direction, email, phone, cargo, ingreso, sueldo} = req.body
    
    try {
        const [result] = await pool.query('UPDATE EmpleadosTry SET nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido) WHERE id = ?', [nombre, apellido, identificacion, birthday, direction, email, phone, cargo, ingreso, sueldo, id])//Actualiza los datos de empleado
    
        if(result.affectedRows === 0) return res.status(404).json({ //Verifica si el empleado existe
            message: 'Empleado no encontrado'
        })
    
        const [rows] = await pool.query('SELECT * FROM EmpleadosTry WHERE id = ?', [id])
    
        console.log(result);
        res.json(rows[0]) 
    } catch (error) {
        return res.status(500).json({
            message: 'Algo ha ido mal'
        })
    }
}

export const eliminarEmpleados =  async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM EmpleadosTry WHERE id = ?', [req.params.id])
        console.log(result);
    
        if(result.affectedRows <= 0) return res.status(404).json({
            message: 'Empleado no encontrado'
        })
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Algo ha ido mal'
        })
    }
}

