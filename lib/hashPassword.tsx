const bcrypt = require("bcrypt");

export const hashPassword = async (password: string) => {
	const hashedPassword = await bcrypt.hash(password, 12);
	return hashedPassword;
};

export default hashPassword;
