import bcrypt from "bcrypt"

export const hashPassword = async (password) => {
    try {
        const saltRound  = 10;
        const hashedPassword = await bcrypt.hash(password, saltRound)
        return hashedPassword
        
    } catch (error) {
        console.error(error);
    }
};

export const comparedPassword = async (password, hashedPassword) => {
return bcrypt.compare(password, hashedPassword)
}















