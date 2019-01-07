import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Helper = {
  // HASH PASSWORD
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  // COMPARE PASSWORD
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  // VALIDATE EMAIL
  validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  },

  // ISSUE TOKEN
  issueToken(id) {
    const token = jwt.sign(
      {
        userId: id
      },
      process.env.SECRET,
      { expiresIn: "3d" }
    );
    return token;
  }
};

export default Helper;
