
export const rules = {
  fullName: {
    pattern: /^[\p{L}\p{M} .'-]{2,50}$/u,
    message: "Enter a valid name (2-50 letters)."
  },

  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    message: "Enter a valid email address."
  },

  phone: {
    pattern: /^0\d{9}$/,
    message: "Enter a 10-digit Sri Lankan phone number."
  },

  postcode: {
    pattern: /^\d{5}$/,
    message: "Enter a 5-digit postcode."
  }
};

export function validateField(name, value) {
  const v = value.trim();

  if (!v) {
    return "This field is required.";
  }

  const rule = rules[name];

  return rule && !rule.pattern.test(v)
    ? rule.message
    : "";
}
