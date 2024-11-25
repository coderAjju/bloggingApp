import jwt from 'jsonwebtoken'
export const generateTokenAndSetCookie = async (id,res,tokenName="token") =>{
    try {
        let token = await jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.cookie(tokenName, token, {
            httpOnly: true, // Prevents JavaScript access to the cookie, enhancing security.
            sameSite: "strict", // Prevents the cookie from being sent with cross-site requests.
            secure: process.env.NODE_ENV === "development" ? false : true, // Ensures cookies are sent over HTTPS in production.
            maxAge: 1000 * 60 * 60 * 24 // Sets cookie expiration time to 24 hours.
        });
    } catch (error) {
        console.log("error occured while generating token ",error.message);
        return res.status(500).json("Internal server error");
    }
}