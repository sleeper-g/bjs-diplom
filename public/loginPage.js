"use strict";

const userForm = new UserForm()

userForm.loginFormCallback = data => ( ApiConnector.login( {login:data.login, password:data.password}, response => {
    console.log(response)
    if (response.success){
        location.reload();
    }
    else {
        userForm.loginErrorMessageBox.style = ""
        userForm.loginErrorMessageBox.textContent = response.error
        throw new Error(response.error)
    }
}
) );

userForm.registerFormCallback = data => ( ApiConnector.register( {login:data.login,  password:data.password}, response => {
    console.log(response)
    if (response.success){
        location.reload();
    }
    else {
        userForm.registerErrorMessageBox.style = ""
        userForm.registerErrorMessageBox.textContent = response.error
        throw new Error(response.error)
    }
} ) );
