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
    if (validationSchema[elementName]?.maxlength) {
      element.setAttribute(
        'maxlength',
        validationSchema[elementName].maxlength.maximum
      );
    }
    if (validationSchema[elementName]?.min) {
      element.setAttribute('min', validationSchema[elementName].min.minimum);
    }
    if (validationSchema[elementName]?.max) {
      element.setAttribute('max', validationSchema[elementName].max.maximum);
    }
    if (validationSchema[elementName]?.pattern) {
      element.setAttribute(
        'pattern',
        validationSchema[elementName].pattern.regex
      );
    }
    if (validationSchema[elementName]?.type) {
      element.setAttribute('type', validationSchema[elementName].type.dataType);
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
      } else if (element.validity.tooLong) {
        element.setCustomValidity(schemaAttribute.maxlength.message);
      } else if (element.validity.rangeOverflow) {
        element.setCustomValidity(schemaAttribute.max.message);
      } else if (element.validity.rangeUnderflow) {
        element.setCustomValidity(schemaAttribute.min.message);
      } else if (element.validity.stepMismatch) {
        element.setCustomValidity(schemaAttribute.step.message);
      } else if (element.validity.typeMismatch) {
        element.setCustomValidity(schemaAttribute.type.message);
      } else if (element.validity.badInput) {
        element.setCustomValidity(schemaAttribute.type.message);
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
