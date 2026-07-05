async function loadWelcome() {
    try {
        const response = await getWelcomeMessage();

        document.getElementById("welcome").textContent = response.message;

    } catch (error) {
        console.error("Error:", error);
        document.getElementById("welcome").textContent = "Something went wrong!";
    }
}

loadWelcome();
