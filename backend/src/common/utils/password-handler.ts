import bcript from "bcryptjs";

export const hashPassword = async (password: string) => {
  const salt = await bcript.genSalt(12);
  const hash = await bcript.hash(password, salt);
  return hash;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  const isMatch = await bcript.compare(password, hashedPassword);
  return isMatch;
};
