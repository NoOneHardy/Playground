const nextButton = $('#next')
const finishButton = $('#finish')
const signupForm = $('#signup-form')
const firstInputs = $('#first-inputs')
const nextInputs = $('#next-inputs')
const emailInput = $('#email')
const pwInput = $('#password')
const pw2Input = $('#password2')
const usernameInput = $('#username')
const emailVerification = $('#email-verification')
const emailCodeInput = $('#verify-email')
const verifyButton = $('#verify-button')

nextButton.click(function () {
    checkIfUserExists()
})

firstInputs.children().keypress(function (e) {
    if (e.key === 'Enter') {
        checkIfUserExists()
    }
})

emailCodeInput.keydown(function () {
    emailCodeInput.removeClass('errorInput')
    emailCodeInput.css('color', '#242424')
})

verifyButton.click(function (e) {
    verifyEmail()
})

function verifyEmail() {
    let code = emailCodeInput.val()
    let email = emailInput.val()
    $.ajax({
        url: "http://localhost:55383/api/verifyEmail",
        method: "POST",
        data: {
            code: code,
            email: email
        },
        success: function () {
            switchInputs()
        },
        error: function () {
            codeIsNotValid()
        }
    })
}

function codeIsNotValid() {
    emailCodeInput.addClass('errorInput')
    emailCodeInput.css('color', 'red')
    emailCodeInput.animate({ marginLeft: '+=10px', marginRight: '-=10px' }, 50)
    emailCodeInput.animate({ marginLeft: '-=20px', marginRight: '+=20px' }, 50)
    emailCodeInput.animate({ marginLeft: '+=20px', marginRight: '-=20px' }, 50)
    emailCodeInput.animate({ marginLeft: '-=20px', marginRight: '+=20px' }, 50)
    emailCodeInput.animate({ marginLeft: '+=10px', marginRight: '-=10px' }, 50)
}

function switchInputs() {
    emailVerification.hide()
    nextInputs.show()
    pwInput.focus()
    verifyButton.hide()
    finishButton.show()
}

function displayEmailVerification() {
    firstInputs.hide()
    emailVerification.show()
    nextButton.hide()
    verifyButton.show()
}

finishButton.click(function () {
    createUser()
})

pw2Input.keypress(function (e) {
    if (e.key === 'Enter') {
        createUser()
    }
})

function createUser() {
    return false
}

function checkIfUserExists() {
    let username = usernameInput.val()
    let email = emailInput.val()
    if (email !== '' && username !== '') {
        let url = 'http://localhost:55383/api/checkUser?username=' + username + '&email=' + email
        return $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data.isNewUser === 'true') {
                    displayEmailVerification()
                } else {
                    userAlreadyExists(data)
                }
            },
            error: function (data) {
                alert('ERROR: ' + data)
            }
        })
    } else {
        fieldsCannotBeEmpty()
    }
}

function userAlreadyExists(data) {
    if (data.usernameTaken === 'true') {
        firstInputs.append('<h3>Username already exists</h3>')
        usernameInput.addClass('errorInput')
        usernameInput.css('color', 'red')
        usernameInput.animate({ marginLeft: '+=10px', marginRight: '-=10px' }, 50)
        usernameInput.animate({ marginLeft: '-=20px', marginRight: '+=20px' }, 50)
        usernameInput.animate({ marginLeft: '+=20px', marginRight: '-=20px' }, 50)
        usernameInput.animate({ marginLeft: '-=20px', marginRight: '+=20px' }, 50)
        usernameInput.animate({ marginLeft: '+=10px', marginRight: '-=10px' }, 50)
    }
}