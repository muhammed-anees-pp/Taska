function getFormValues(form) {
    return Object.fromEntries(new FormData(form).entries());
}

function showMessage(messageElement, text, type) {
    messageElement.textContent = text;
    messageElement.className = `form-message ${type}`;
}

function formatApiError(error) {
    if (!error) {
        return "Something went wrong. Please try again.";
    }

    if (typeof error === "string") {
        return error;
    }

    if (error.message) {
        return error.message;
    }

    const messages = Object.values(error).flat();
    return messages.length ? messages.join(" ") : "Something went wrong. Please try again.";
}

function setSubmitting(form, isSubmitting) {
    const button = form.querySelector("button[type='submit']");
    if (!button) {
        return;
    }

    button.disabled = isSubmitting;
    button.textContent = isSubmitting ? "Please wait..." : button.dataset.label;
}

function saveLoggedInUser(email) {
    localStorage.setItem("taska_user_email", email || "");
}

function goToDashboard() {
    window.location.href = "dashboard.html";
}

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const messageElement = document.getElementById("message");

if (localStorage.getItem("taska_user_email")) {
    window.location.href = "dashboard.html";
}

if (registerForm) {
    const submitButton = registerForm.querySelector("button[type='submit']");
    submitButton.dataset.label = submitButton.textContent;

    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!registerForm.checkValidity()) {
            registerForm.reportValidity();
            return;
        }

        const userData = getFormValues(registerForm);

        if (userData.password !== userData.confirm_password) {
            showMessage(messageElement, "Passwords do not match.", "error");
            return;
        }

        try {
            setSubmitting(registerForm, true);
            const response = await registerUser(userData);
            saveLoggedInUser(response.email || userData.email);
            showMessage(messageElement, response.message || "Registration successful.", "success");
            registerForm.reset();
            goToDashboard();
        } catch (error) {
            showMessage(messageElement, formatApiError(error), "error");
        } finally {
            setSubmitting(registerForm, false);
        }
    });
}

if (loginForm) {
    const submitButton = loginForm.querySelector("button[type='submit']");
    submitButton.dataset.label = submitButton.textContent;

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!loginForm.checkValidity()) {
            loginForm.reportValidity();
            return;
        }

        try {
            setSubmitting(loginForm, true);
            const response = await loginUser(getFormValues(loginForm));
            saveLoggedInUser(response.email || getFormValues(loginForm).email);
            showMessage(messageElement, response.message || "Login successful.", "success");
            goToDashboard();
        } catch (error) {
            showMessage(messageElement, formatApiError(error), "error");
        } finally {
            setSubmitting(loginForm, false);
        }
    });
}
