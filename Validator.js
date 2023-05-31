function initializeDOMValidations(validationSchema, formElement) {
  const validatorElements = Object.values(formElement);
  validatorElements.forEach((element) => {
    const elementName = element.getAttribute('id');
    if (validationSchema[elementName]?.required) {
      element.setAttribute('required', 'required');
    }
    if (validationSchema[elementName]?.minlength) {
      element.setAttribute(
        'minlength',
        validationSchema[elementName].minlength.minimum
      );
    }
  });
}

function Validator(validationSchema, formId) {
  const formElement = document.getElementById(formId);
  initializeDOMValidations(validationSchema, formElement);

  let invalidFields = [];
  let isFormValid = false;

  function validate() {
    formElement.addEventListener('input', (e) => {
      const element = e.target;
      const schemaAttribute = validationSchema[element.getAttribute('id')];

      if (element.validity.valueMissing) {
        element.setCustomValidity(schemaAttribute.required.message);
      } else if (element.validity.tooShort) {
        element.setCustomValidity(schemaAttribute.minlength.message);
      } else {
        element.setCustomValidity('');
      }

      invalidFields = Array.from(formElement.querySelectorAll(':invalid')).map(
        (field) => field.name
      );

      isFormValid = formElement.checkValidity();
    });
  }

  function getInvalidFields() {
    return invalidFields;
  }

  function getIsFormValid() {
    return isFormValid;
  }

  return { validate, getInvalidFields, getIsFormValid };
}
