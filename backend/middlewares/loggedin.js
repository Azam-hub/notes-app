import jwt from "jsonwebtoken";


const loggedin = (req, res, next) => {    
    const { token } = req.cookies

    if (!token) {
        return res.status(401).json({success: false, message: "Token missing!"});
    }

    try {
        const { id } = jwt.verify(token, process.env.SECRET);
                
        req.userId = id
        next()
    } catch (error) {
        return res.status(401).json({success: false, message: "Invalid token!"});
    }

}

export default loggedin;