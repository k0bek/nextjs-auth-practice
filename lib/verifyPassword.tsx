const bcrypt = require("bcrypt");

export const verifyPassword = async (
	password: string,
	hashedPassword: string
) => {
	const isPasswordValid = await bcrypt.compare(password, hashedPassword);
	return isPasswordValid;
};

export default verifyPassword;
