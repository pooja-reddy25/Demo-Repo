document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    document.querySelectorAll(".error").forEach(error => error.textContent = "");

    const fullName = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const dob = document.getElementById("dob").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    let valid = true;

    function showError(id, message) {
        document.getElementById(id).textContent = message;
        valid = false;
    }

    if (!/^[A-Za-z]+\s[A-Za-z]+$/.test(fullName)) {
        showError("nameError", "Enter both first and last names");
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        showError("emailError", "Enter a valid email.");
    }

    if (!/^\+91 \d{5}-\d{5}$/.test(phone)) {
        showError("phoneNumberError", "Use format +91 XXXXX-XXXXX");
    }

    const birthDate = new Date(dob);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    if (isNaN(birthDate) || age < 18) {
        showError("dobError", "You must be at least 18 years old.");
    }

    if (!/^\w{4,}$/.test(username)) {
        showError("usernameError", "At least 4 characters; use letters, numbers, underscores.");
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password)) {
        showError("passwordError", "Password must be 8+ characters, with uppercase, lowercase, number, special characters.");
    } else if (password !== confirmPassword) {
        showError("confirmError", "Passwords do not match.");
    }

    if (valid) {
        const userData = { fullName, email, phone, dob, username };
        localStorage.setItem(email, JSON.stringify(userData));
        alert("Registration Successful!");
        document.querySelector("form").reset();
    }
});
