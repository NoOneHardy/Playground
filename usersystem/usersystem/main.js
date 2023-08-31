const signUp = $('#signup')
const logIn = $('#login')
const userActions = $('.user-actions')
const username = $('#username')

signUp.mouseenter(function () {
    signUp.css("transition-delay", "0s")
})

logIn.mouseenter(function () {
    logIn.css("transition-delay", "0s")
})

userActions.mouseenter(function () {
    signUp.css("transition-delay", "0.4s")
    logIn.css("transition-delay", "0.4s")
})

userActions.mouseleave(function () {
    signUp.css("transition-delay", "0s")
    logIn.css("transition-delay", "0s")
})