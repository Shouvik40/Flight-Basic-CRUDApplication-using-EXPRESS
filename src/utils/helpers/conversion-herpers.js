function convertToBoolean(value) {
  if (typeof value === "string") {
    if (value === "true" || value === "1") {
      return true;
    } else if (value === "false" || value === "0") {
      return false;
    }
  } else if (typeof value === "boolean") {
    return value;
  } else {
    throw new Error("Invalid input. Expected string or boolean.");
  }
}
module.exports = {
  convertToBoolean,
};
