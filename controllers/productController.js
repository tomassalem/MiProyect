let productController = {
    product: function (req, res){
        return res.render('product', {title: 'Tec'})
    },
    productAdd: function (req, res){
        return res.render('productAdd', {title: 'Tec'})
    },
    searchResults: function (req, res){
        return res.render('searchResults', {title: 'Tec'})
    }
    
}

module.exports = productController