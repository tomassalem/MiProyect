let usersController = {
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
    },
    signIn: function (req, res){
        console.log(req.body.user)
        return res.render('profileEdit', {title: 'Tec'})
    }
}

module.exports = usersController