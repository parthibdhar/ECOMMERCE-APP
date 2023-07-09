
export const createProductController = async(req, res) => {
    try {
        const {name, description, price, category, quantity, } = req.body
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            msg: 'error while creating this product',
            error
        })
    }
}   