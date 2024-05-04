export const verifyingSignin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.send("Fill the details")
    }
    else {
        next();
    }
}

export const verifyingSignup = (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.send("Fill the details")
    }
    else {
        next();
    }
}