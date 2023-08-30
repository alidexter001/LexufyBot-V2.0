module.exports = {
    name: "/",
    run: async(req, res) => {
        return res.redirect('/home')
    }
}