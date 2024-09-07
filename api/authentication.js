const bcrypt = require('bcrypt');
const UserModel = require('./models/Schemas'); // Adjust path as needed

// Example authenticateUser function
const authenticateUser = async (email, password) => {
    try {
        const user = await UserModel.findOne({ email: email });
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    } catch (error) {
        console.error('Error in authenticateUser:', error);
        throw new Error('Authentication failed');
    }
};

module.exports = { authenticateUser };
