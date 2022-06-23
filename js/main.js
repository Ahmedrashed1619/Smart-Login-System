
var userNameInput = document.getElementById('name');
var userEmailInput = document.getElementById('email');
var userPasswordInput = document.getElementById('pass');
var alertName = document.getElementById('alertName');
var alertEmail = document.getElementById('alertEmail');
var alertPass = document.getElementById('alertPass');
var signupBtn = document.getElementById('signupBtn');
var inputsSignUp = Array.from(document.getElementsByClassName('sign-up'));
var alertSignup = document.getElementById('alertSignup');


var searchEmail = document.getElementById('searchEmail');
var searchPass = document.getElementById('searchPass');
var inputsLogin = Array.from(document.getElementsByClassName('sign-in'));
var loginBtn = document.getElementById('loginBtn');
var alertSignin = document.getElementById('alertSignin');


var welcomeSignal = document.getElementById('welcomeSignal');
var logoutBtn = document.getElementById('logOut');

var username = localStorage.getItem('loginList');



// Check data in local storage
var users ;
if (JSON.parse(localStorage.getItem('usersList')) != null)
{
    users = JSON.parse(localStorage.getItem('usersList'));
}
else
{
    users = [];
}



// when enter data in inputsSignUp
if(userNameInput != null){
    userNameInput.addEventListener('input' , validUserName);
}

if(userEmailInput != null){
    userEmailInput.addEventListener('input' , validUserEmail);
}

if(userPasswordInput != null){
    userPasswordInput.addEventListener('input' , validUserPass);
}



// when click on Sign Up Button
if(signupBtn){
    signupBtn.addEventListener('click', signUp);
}

function signUp(){
    if(isEmailExist() != true && isInputEmpty() != true && validUserName() == true && validUserEmail() == true && validUserPass() == true)
    {
        alertSignup.innerHTML = ('Successfully Registered');
        alertSignup.classList.replace('d-none','d-block');
        alertSignup.classList.add('text-success');
        alertSignup.classList.remove('text-danger');
        addUser();
        resetFormSignUp();
    }
    else if (isEmailExist())
    {
        alertSignup.innerHTML = ('This email already exist.. Try another Entry');
        alertSignup.classList.replace('d-none','d-block');
        alertSignup.classList.add('text-danger');
        alertSignup.classList.remove('text-success');
        resetFormSignUp();
    }
    else if (isInputEmpty())
    {
        alertSignup.innerHTML = ('all fields are important.. You should fill them correctly');
        alertSignup.classList.replace('d-none','d-block');
        alertSignup.classList.add('text-danger');
        alertSignup.classList.remove('text-success');
        resetFormSignUp();
    }
    else if(validUserName() == false || validUserEmail() == false || validUserPass() == false)
    {
        alertSignup.innerHTML = ('There are Invalid fields.. You should fill them correctly');
        alertSignup.classList.replace('d-none','d-block');
        alertSignup.classList.add('text-danger');
        alertSignup.classList.remove('text-success');
        resetFormSignUp();
    }
}



//... add a new user in local Storage...
function addUser(){
    var user = {
        name : userNameInput.value,
        email : userEmailInput.value,
        password : userPasswordInput.value,
    }
    users.push(user);
    localStorage.setItem('usersList' , JSON.stringify(users));
}



//... reset Sign Up form...
function resetFormSignUp(){
    for(var i = 0; i < inputsSignUp.length; i++){
        inputsSignUp[i].value = '';
        inputsSignUp[i].classList.remove('is-valid');
        inputsSignUp[i].classList.remove('is-invalid');
    }
}



//...test Is the email Exist ?...
function isEmailExist(){
    for(var i = 0; i < users.length; i++){
        if(users[i].email == userEmailInput.value)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}



//...test IS any input Empty ?...
function isInputEmpty(){
    for(var i = 0; i < inputsSignUp.length; i++){
        if(inputsSignUp[i].value == '')
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}



//...Validation...
function validUserName(){
    var regexName = /^[A-Z][a-z- ]{2,15}$/;
    if(regexName.test(userNameInput.value))
    {
        userNameInput.classList.add('is-valid');
        userNameInput.classList.remove('is-invalid');
        alertName.classList.add('d-none');
        return true;
    }
    else
    {
        userNameInput.classList.add('is-invalid');
        userNameInput.classList.remove('is-valid');
        alertName.classList.remove('d-none');
        return false;
    }
}

function validUserEmail(){
    let regexEmail = /^[a-zA-Z0-9_]{3,10}(@[a-zA-Z0-9]{3,15}\.com)$/;
    if(regexEmail.test(userEmailInput.value))
    {
        userEmailInput.classList.add('is-valid');
        userEmailInput.classList.remove('is-invalid');
        alertEmail.classList.add('d-none');
        return true;
    }
    else
    {
        userEmailInput.classList.add('is-invalid');
        userEmailInput.classList.remove('is-valid');
        alertEmail.classList.remove('d-none');
        return false;
    }
}

function validUserPass(){
    var regexPass = /^[a-zA-Z0-9_]{4,15}$/;
    if(regexPass.test(userPasswordInput.value))
    {
        userPasswordInput.classList.add('is-valid');
        userPasswordInput.classList.remove('is-invalid');
        alertPass.classList.add('d-none');
        return true;
    }
    else
    {
        userPasswordInput.classList.add('is-invalid');
        userPasswordInput.classList.remove('is-valid');
        alertPass.classList.remove('d-none');
        return false;
    }
}



// ...reset Login Form...
function resetFormLogin(){
    for(var i = 0; i < inputsLogin.length; i++){
        inputsLogin[i].value = '';
    }
}



// ...when click on Login Button and check Connection to user page...
if(loginBtn){
    loginBtn.addEventListener('click', logIn);
}

function logIn () {

    var email = searchEmail.value;
    var password = searchPass.value;
    if( email == "" || password == "") {
        alertSignin.innerHTML = 'All Fields are important..';
        alertSignin.classList.replace('d-none','d-block');
        alertSignin.classList.add('text-danger');
        resetFormLogin();
    }
    else
    {
        for(var i = 0; i < users.length; i++){
            if(email == users[i].email && password == users[i].password ){
                localStorage.setItem('loginList' , JSON.stringify(users[i].name));
                window.location.href = ('welcome.html');
            }
            else
            {
                alertSignin.innerHTML = 'There is an error in Email, Password or Both..';
                alertSignin.classList.replace('d-none','d-block');
                alertSignin.classList.add('text-danger');
                resetFormLogin();
            }
        }
    }
}



// ...when click on LogOut Button...
if(logoutBtn){
    logoutBtn.addEventListener('click', logOut);
}

function logOut () {
    localStorage.removeItem('loginList');
    window.location.href = 'index.html';
}



// ....Welcome User.....
if(welcomeSignal){
    welcomeSignal.innerHTML = `Welcome ${username}`;
}

