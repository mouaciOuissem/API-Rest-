const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "EUR",
    style: "currency",
  });
  const FormatCurrency = (number) => {
    return CURRENCY_FORMATTER.format(number);
  };
  
  export default FormatCurrency;