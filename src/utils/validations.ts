// Function to validate that the date entered is not greater than the current date.
export const validateDate = async (date: string) => {
  const convertDate = new Date(date);

  // Get current date
  const currentDate = new Date();

  // we compare that the given date is not greater than the current date
  if (convertDate > currentDate) {
    throw new Error("The date cannot be greater than the current date");
  }
};
