document.getElementById('generate-btn').addEventListener('click', generatePassword);
document.getElementById('copy-btn').addEventListener('click', copyToClipboard);
document.getElementById('history').addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        document.getElementById('password').value = e.target.textContent;
    }
});

const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
const DIGIT_CHARS = "0123456789";
const SPECIAL_CHARS = "!@#$%^&*()-_=+[]{};':\"\\|,.<>/?";
const AMBIGUOUS_CHARS = "0O1lI";

let passwordHistory = [];

function generatePassword() {
    const minLength = parseInt(document.getElementById('min-length').value);
    const maxLength = parseInt(document.getElementById('max-length').value);
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSpecial = document.getElementById('special').checked;
    const customChars = document.getElementById('custom-chars').value;
    const excludeAmbiguous = document.getElementById('exclude-ambiguous').checked;
    const excludeSequential = document.getElementById('exclude-sequential').checked;

    let charSet = customChars || '';
    if (includeUppercase) charSet += UPPERCASE_CHARS;
    if (includeLowercase) charSet += LOWERCASE_CHARS;
    if (includeNumbers) charSet += DIGIT_CHARS;
    if (includeSpecial) charSet += SPECIAL_CHARS;

    if (excludeAmbiguous) {
        charSet = removeAmbiguousChars(charSet);
    }

    let password = '';
    for (let i = 0; i < maxLength; i++) {
        password += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }

    if (excludeSequential) {
        password = shufflePassword(password);
    }

    document.getElementById('password').value = password;
    saveToHistory(password);

    const strength = getPasswordStrength(password);
    const strengthIndicator = document.getElementById('strength-indicator');
    strengthIndicator.textContent = getPasswordStrengthLabel(strength);
    strengthIndicator.className = getStrengthClass(strength);
}

function removeAmbiguousChars(charSet) {
    return charSet.replace(/[0O1lI]/g, '');
}

function shufflePassword(password) {
    return password.split('').sort(() => Math.random() - 0.5).join('');
}

function getPasswordStrength(password) {
    let strength = 0;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*()-_=+[\]{};':"\\|,.<>/?]/.test(password)) strength++;
    if (password.length >= 12) strength++;
    return strength;
}

function getPasswordStrengthLabel(strength) {
    switch (strength) {
        case 1: return "Very Weak";
        case 2: return "Weak";
        case 3: return "Medium";
        case 4: return "Strong";
        case 5: return "Very Strong";
        default: return "-";
    }
}

function getStrengthClass(strength) {
    switch (strength) {
        case 1: return "very-weak";
        case 2: return "weak";
        case 3: return "medium";
        case 4: return "strong";
        case 5: return "very-strong";
        default: return "";
    }}

function saveToHistory(password) {
    passwordHistory.unshift(password);
    if (passwordHistory.length > 10) {
        passwordHistory.pop();
    }
    renderHistory();
}

function renderHistory() {
    const historyList = document.getElementById('history');
    historyList.innerHTML = '';
    passwordHistory.forEach(pwd => {
        const listItem = document.createElement('li');
        listItem.textContent = pwd;
        historyList.appendChild(listItem);
    });}

function copyToClipboard() {
    const passwordField = document.getElementById('password');
    passwordField.select();
    document.execCommand('copy');
    alert('Password copied to clipboard');}
