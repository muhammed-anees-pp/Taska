async function loadWelcome() {
    try {
        const response = await fetch(BASE_URL + "welcome/");

        console.log(response);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        document.getElementById("welcome").textContent = data.message;

    } catch (error) {
        console.error("Error:", error);
        document.getElementById("welcome").textContent = "Something went wrong!";
    }
}

loadWelcome();