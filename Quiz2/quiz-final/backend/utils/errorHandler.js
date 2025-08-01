const errorHandler = (res, error) => {
  console.error(error);
  res
    .status(500)
    .json({ success: false, message: "Internal Server Error", error });
};
export default errorHandler;
