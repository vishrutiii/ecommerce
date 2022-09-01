const isLoggedIn = (req,res,next)=>{

    
    if(!req.isAuthenticated()){
        req.flash('error','User has no previous Account, PLease Sign In');
        return res.redirect('/login');
    }
    next();
}
module.exports = {
    isLoggedIn
}