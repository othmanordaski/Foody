const xss = require("xss")
exports.Sanitize = (req, res, next) => {
    const fields = ['username','email','age','country','sex','phoneNumber','bio']
    for(i in fields) {
        if(req.body[fields[i]]) {
            req.body[fields[i]] = xss(req.body[fields[i]])
        }
    }
    next()
}