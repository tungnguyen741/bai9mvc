module.exports.postAddUser = (req, res, next) => {
    var errors = [];
    let name = req.body.name;
    let age = req.body.age;
    let gioiTinh = req.body.GioiTinh;
    if (name.length > 30) {
        errors.push("Tên phải ít hơn 30 kí tự");
        res.render("user_add", { errors: errors });
        return;
    }
    res.locals.name = name;
    res.locals.age = age;
    res.locals.gioiTinh = gioiTinh;
 
    next();
}