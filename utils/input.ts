export const validateURL = (value: string): boolean | string => {
  if (!value) return true;
  try {
    new URL(value);
    return true;
  } catch (error) {
    return "Invalid URL.";
  }
};

export const validateNumber = (value: "" | number): boolean | string => {
  if (value === "") {
    return true;
  }
  if (Number.isFinite(value)) {
    return true;
  }
  return "Invalid number.";
};

export const handleNumberInput = (
  onChange: (value: number | "") => void,
): ((valueAsString: string, valueAsNumber: number) => void) => (
  valueAsString,
  valueAsNumber,
) => {
  console.log({ valueAsNumber, valueAsString });
  if (valueAsString === "") {
    onChange("");
  } else {
    onChange(valueAsNumber);
  }
};
