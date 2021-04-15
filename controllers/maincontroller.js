let controller = {
    index: function (req, res){
        return res.render('index', {title: 'Tec'})
    }
}

module.exports = controller