const Viaje = require('../models/Viajes')

exports.infoViajes = async (req, res) => {
    const viajes = await Viaje.findAll()
    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes 
    })
}

exports.verViaje = async (req, res) => {
    const viaje = await Viaje.findByPk(req.params.id)
    res.render('viaje', {
        viaje
    })
}