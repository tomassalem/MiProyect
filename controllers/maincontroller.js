let mainController = {
    index: function (req, res){
        return res.render('index', {title: 'Tec'})
    }
}

module.exports = mainController