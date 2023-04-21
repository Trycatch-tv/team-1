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



