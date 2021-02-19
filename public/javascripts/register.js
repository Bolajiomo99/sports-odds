const [form] = document.forms;
const [
  emailFeedback,
  usernameFeedback,
  passwordFeedback,
  confirmPasswordFeedback
] = document.querySelectorAll('.feedback');

// const isNameValid = name => {
//   return name.length > 3 && name.length <= 20 && /^[A-Za-z0-9_ ]*$/g.test(name);
// }

const isEmailValid = email => {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(email);
}

const isPasswordValid = password => {
  return /^((?=.*[\d])(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[a-z])(?=.*[^\w\d\s])).{7,30}$/gm.test(password);
}

const isPasswordMatch = (password, confirmPassword) => {
  return !!confirmPassword && password === confirmPassword;
}

const validation = (email, password, confirmPassword) => {
  return (
    isEmailValid(email) &&
    isPasswordValid(password) &&
    isPasswordMatch(password, confirmPassword)
  );
}

const toggleShowPassword = (toggler, elements) => {
  toggler.addEventListener('change', e => {
    elements.forEach(element => {
      element.setAttribute('type', e.target.checked ? 'text' : 'password');
    });
  });
};

const getElement = (name, e) => {
  return {
    email(e) {
      e.target.classList.toggle('border-danger', !isEmailValid(e.target.value));
      emailFeedback.textContent = isEmailValid(e.target.value) ? null : 'Provide a valid email address';
    },
    password(e) {
      e.target.classList.toggle('border-danger', !isPasswordValid(e.target.value));
      passwordFeedback.textContent = isPasswordValid(e.target.value) ? null : 'Password must be at least 7 characters long and contain 1 capital letter and 1 symbol or number';

      form.confirmPassword.classList.toggle('border-danger', !isPasswordMatch(e.target.value, form.confirmPassword.value));
      confirmPasswordFeedback.textContent = isPasswordMatch(e.target.value, form.confirmPassword.value) ? null : 'Password do not match';
    },
    confirmPassword(e) {
      e.target.classList.toggle('border-danger', !isPasswordMatch(form.password.value, e.target.value));
      confirmPasswordFeedback.textContent = isPasswordMatch(form.password.value, e.target.value) ? null : 'Password do not match';
    }
  }[name](e);
}

const handleInput = e => {
  const { name:  email, password, confirmPassword } = form;
  const { name } = e.target;
  getElement(name, e);
  
  // btn.disabled = !validation(email.value, password.value, confirmPassword.value);
}

document.addEventListener('DOMContentLoaded', () => {
  toggleShowPassword(form.showPassword, [form.password, form.confirmPassword]);
  
//   form.name.addEventListener('input', handleInput);
  
  form.email.addEventListener('input', handleInput);
  form.password.addEventListener('input', handleInput);
  form.confirmPassword.addEventListener('input', handleInput);

  // form.addEventListener('submit', e => {
  //   e.preventDefault();
  //   const { email, password, confirmPassword } = e.target;
  //   const submittedValue = {
  //   //   name: name.value,
  //     email: email.value,
  //     password: password.value,
  //     confirmPassword: confirmPassword.value
  //   };
    
    // Check console to see the result
    // console.log(submittedValue);

  // });
});