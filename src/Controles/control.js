const pool = require('../database');

const getDatos = async (req, res) => {
    try {
        const [ rows ] = await pool.query('SELECT * FROM datos_ingreso')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo ha ido mal'
        })
    }
    
}

module.exports = getDatos;