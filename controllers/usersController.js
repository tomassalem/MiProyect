let controller = {
    profile: function (req, res){
        return res.render('profile', {title: 'Tec'})
    },
    register: function (req, res){
        return res.render('register', {title: 'Tec'})
    },
    login: function (req, res){
        return res.render('login', {title: 'Tec'})
    },
    profileEdit: function (req, res){
        return res.render('profileEdit', {title: 'Tec'})
    }
}

module.exports = controller