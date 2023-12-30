module.exports.signup_get = (req, res) => {
    console.log("signup get");
    res.render('signup');
};

module.exports.login_get = (req, res) => {
    console.log("login get");
    res.render('login');
};

module.exports.signup_post = (req, res) => {
    console.log("signup post");
    res.send('new signup');
};

module.exports.login_post = (req, res) => {
    console.log("login post");
    console.log(req.body);
    res.send('user login');
};

