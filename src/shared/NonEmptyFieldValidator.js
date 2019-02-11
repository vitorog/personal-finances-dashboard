const NonEmptyFieldValidator = value => {
  let error;
  if (!value) {
    error = "Field cannot be empty.";
  }
  return error;
};

export default NonEmptyFieldValidator;
