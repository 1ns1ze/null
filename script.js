const form = document.getElementById('infoForm');
const firstName = document.getElementById('firstName');
const surname = document.getElementById('surname');
const gmail = document.getElementById('gmail');
const password = document.getElementById('password');
const showPassword = document.getElementById('showPassword');
const successMsg = document.getElementById('successMsg');

const fErr = document.getElementById('firstNameError');
const sErr = document.getElementById('surnameError');
const gErr = document.getElementById('gmailError');
const pErr = document.getElementById('passwordError');


function validateName(value){
  if(!value) return {ok:false, message: "This field is required"};
  if(!/^[A-ZА-ЯЄІЇҐ]/.test(value)) return {ok:false, message: "Name must start with a capital letter"};
  if(!/^[A-Za-zА-Яа-яЄІЇєіїґҐ'\-]+$/u.test(value)) return {ok:false, message: "Only letters, hyphen or apostrophe allowed"};
  return {ok:true, message: ""};
}

function validateEmail(value){
  if(!value) return {ok:false, message: "This field is required"};
  
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!re.test(value)) return {ok:false, message: "Invalid email address"};
  return {ok:true, message: ""};
}

function validatePassword(value){
  if(!value) return {ok:false, message: "This field is required"};
  
  const special = /[!@#\$%\^&\*\(\)\[\]{}\-_=+\\|;:'",.<>/?`~]/;
  if(value.length < 6) return {ok:false, message: "Password must be at least 6 characters"};
  if(!special.test(value)) return {ok:false, message: "Password must contain at least one special character"};
  return {ok:true, message: ""};
}


function setValid(el, errEl){
  el.classList.remove('input-invalid');
  el.classList.add('input-valid');
  errEl.textContent = "";
}
function setInvalid(el, errEl, msg){
  el.classList.remove('input-valid');
  el.classList.add('input-invalid');
  errEl.textContent = msg;
}
function clearState(el, errEl){
  el.classList.remove('input-valid','input-invalid');
  errEl.textContent = "";
}


firstName.addEventListener('input', ()=>{
  const res = validateName(firstName.value.trim());
  if(res.ok) setValid(firstName, fErr);
  else if(firstName.value.trim().length === 0) clearState(firstName, fErr);
  else setInvalid(firstName, fErr, res.message);
});

surname.addEventListener('input', ()=>{
  const res = validateName(surname.value.trim());
  if(res.ok) setValid(surname, sErr);
  else if(surname.value.trim().length === 0) clearState(surname, sErr);
  else setInvalid(surname, sErr, res.message);
});

gmail.addEventListener('input', ()=>{
  const res = validateEmail(gmail.value.trim());
  if(res.ok) setValid(gmail, gErr);
  else if(gmail.value.trim().length === 0) clearState(gmail, gErr);
  else setInvalid(gmail, gErr, res.message);
});

password.addEventListener('input', ()=>{
  const res = validatePassword(password.value);
  if(res.ok) setValid(password, pErr);
  else if(password.value.length === 0) clearState(password, pErr);
  else setInvalid(password, pErr, res.message);
});


showPassword.addEventListener('change', ()=>{
  password.type = showPassword.checked ? 'text' : 'password';
});


form.addEventListener('submit', (e)=>{
  e.preventDefault();
  successMsg.hidden = true;

  const v1 = validateName(firstName.value.trim());
  const v2 = validateName(surname.value.trim());
  const v3 = validateEmail(gmail.value.trim());
  const v4 = validatePassword(password.value);

  
  if(v1.ok) setValid(firstName, fErr); else setInvalid(firstName, fErr, v1.message);
  if(v2.ok) setValid(surname, sErr); else setInvalid(surname, sErr, v2.message);
  if(v3.ok) setValid(gmail, gErr); else setInvalid(gmail, gErr, v3.message);
  if(v4.ok) setValid(password, pErr); else setInvalid(password, pErr, v4.message);

  const allOk = v1.ok && v2.ok && v3.ok && v4.ok;
  if(allOk){m
    successMsg.hidden = false;
    form.reset();  
    [firstName, surname, gmail, password].forEach(inp=>{
      inp.classList.remove('input-valid','input-invalid');
    });
    [fErr,sErr,gErr,pErr].forEach(err=>err.textContent = "");
    password.type = 'password';
  } else {
    successMsg.hidden = true;
    const firstInvalid = [firstName,surname,gmail,password].find(inp => inp.classList.contains('input-invalid'));
    if(firstInvalid) firstInvalid.focus();
  }
});
