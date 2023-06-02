const formSchema = {
  username: {
    type: {
      dataType: 'text',
      message: 'Invalid input',
    },
    required: {
      message: 'Username is required',
    },
    minlength: (function () {
      this.minimum = 3;
      this.message = `Username must be ${this.minimum} characters in length`;

      return {
        minimum: this.minimum,
        message: this.message,
      };
    })(),
  },
  password: {
    type: {
      dataType: 'password',
      message: 'Invalid input',
    },
    required: {
      message: 'Password is required',
    },
    minlength: (function () {
      this.minimum = 6;
      this.message = `Password must be ${this.minimum} characters in length`;

      return {
        minimum: this.minimum,
        message: this.message,
      };
    })(),
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const schema = Validator(formSchema, 'userDetails');
  schema.validate();

  document.getElementById('userDetails').addEventListener('input', (e) => {
    console.log('getInvalidFields', schema.getInvalidFields());
    console.log('getIsFormValid', schema.getIsFormValid());
    console.log('validation message', e.target.validationMessage);
  });
});
