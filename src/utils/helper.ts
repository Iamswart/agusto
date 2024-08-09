const generateOtp = () => {
  return `${Math.floor(Math.random() * 10)}${Math.floor(
    Math.random() * 10
  )}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;
};


const formatNumber = (countryCode: string, input: string) => {
  return `+${countryCode}${Number(input)}`;
};

export default { generateOtp, formatNumber }