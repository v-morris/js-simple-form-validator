function Validator(validationSchema, formId) {
  let invalidFields = [];
  let isFormValid = false;
  let formElement = document.getElementById(formId);

  Object.defineProperties(this, {
    isFormValid: {
      get: function () {
        return isFormValid;
      },
    },
    invalidFields: {
      get: function () {
        return invalidFields;
      },
    },
  });

  this.validate = function () {
    formElement.addEventListener("input", (e) => {
      let validityState = {};
      const element = e.target;
      const schemaAttribute = validationSchema[element.getAttribute("id")];
      const schemaMessages = {
        valueMissing: schemaAttribute.required?.message,
        tooShort: schemaAttribute.minlength?.message,
        tooLong: schemaAttribute.maxlength?.message,
        rangeOverflow: schemaAttribute.max?.message,
        rangeUnderflow: schemaAttribute.min?.message,
        stepMismatch: schemaAttribute.step?.message,
        typeMismatch: schemaAttribute.type?.message,
        badInput: schemaAttribute.type?.message,
        default: "",
      };

      for (const key in element.validity) {
        validityState[key] = element.validity[key];
      }
      const failedValidation = Object.keys(validityState).find(
        (i) => validityState[i] === true
      );
      element.setCustomValidity(
        schemaMessages[failedValidation] || schemaMessages["default"]
      );

      invalidFields = Array.from(formElement.querySelectorAll(":invalid")).map(
        (field) => field.name
      );

      isFormValid = formElement.checkValidity();
    });
  };

  // initialize DOM validation attributes
  Object.values(formElement).forEach((element) => {
    const elementName = element.getAttribute("id");
    if (validationSchema[elementName]?.required) {
      element.setAttribute("required", "required");
    }
    if (validationSchema[elementName]?.minlength) {
      element.setAttribute(
        "minlength",
        validationSchema[elementName].minlength.minimum
      );
    }
    if (validationSchema[elementName]?.maxlength) {
      element.setAttribute(
        "maxlength",
        validationSchema[elementName].maxlength.maximum
      );
    }
    if (validationSchema[elementName]?.min) {
      element.setAttribute("min", validationSchema[elementName].min.minimum);
    }
    if (validationSchema[elementName]?.max) {
      element.setAttribute("max", validationSchema[elementName].max.maximum);
    }
    if (validationSchema[elementName]?.pattern) {
      element.setAttribute(
        "pattern",
        validationSchema[elementName].pattern.regex
      );
    }
    if (validationSchema[elementName]?.type) {
      element.setAttribute("type", validationSchema[elementName].type.dataType);
    }
  });
}
