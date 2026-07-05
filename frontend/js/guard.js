const loggedInEmail = localStorage.getItem("taska_user_email");
const currentPage = window.location.pathname.split("/").pop() || "index.html";
const isProtectedPage = ["index.html", "dashboard.html", "tasks.html"].includes(currentPage);

if (currentPage === "index.html" && loggedInEmail) {
    window.location.replace("pages/dashboard.html");
}

if (isProtectedPage && !loggedInEmail) {
    const loginPath = currentPage === "index.html" ? "pages/login.html" : "login.html";
    window.location.replace(loginPath);
}

const userEmailElement = document.getElementById("userEmail");
if (userEmailElement && loggedInEmail) {
    userEmailElement.textContent = loggedInEmail;
}

const logoutButton = document.getElementById("logoutButton");
if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
        logoutButton.disabled = true;
        logoutButton.textContent = "Logging out...";

        try {
            if (typeof logoutUser === "function") {
                await logoutUser();
            }
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            localStorage.removeItem("taska_user_email");
            window.location.replace("login.html");
        }
    });
}
