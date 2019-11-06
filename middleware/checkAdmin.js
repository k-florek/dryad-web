
function isAdmin(req, res, next) {
    if (req.user.admin) {
        next();
    } else {
        res.redirect('/');
    }
}

module.exports = isAdmin;
