export function validateNumber(input) {
  var re = /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/;

  return re.test(input);
}
