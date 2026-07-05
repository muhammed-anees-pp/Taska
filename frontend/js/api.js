const BASE_URL = CONFIG.BASE_URL;

/** GENERAL */
async function apiRequest(endpoint, method = "GET", body = null) {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
        throw data;
    }

    return data;
}

/* WELCOME */
async function getWelcomeMessage() {
    return await apiRequest("/welcome/");
}

/* AUTHENTICATION */
async function registerUser(userData) {
    return await apiRequest("/auth/register/", "POST", userData);
}

async function loginUser(loginData) {
    return await apiRequest("/auth/login/", "POST", loginData);
}

async function logoutUser() {
    return await apiRequest("/auth/logout/", "POST");
}
