import fs from "fs";

const setupIsEnabled = () => {
  return !fs.existsSync("password-hash.txt");
};

export default setupIsEnabled;
