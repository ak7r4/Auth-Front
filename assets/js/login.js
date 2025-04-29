document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("form").addEventListener("submit", async event => {
        event.preventDefault();
        document.querySelector('.error-message')?.remove();

        if (!grecaptcha.getResponse()) {
            return displayError("Please complete the reCAPTCHA.");
        }

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                body: new FormData(event.target),
                credentials: "include"
            });

            if (response.status === 200) {
                window.location.href = "/success";
            } else {
                const data = await response.json();
                displayError(data.error || "Unknown error");
                grecaptcha.reset();
            }
        } catch {
            displayError("Unknown error");
            grecaptcha.reset();
        }
    });

    function displayError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.textContent = message;
        errorDiv.classList.add('error-message');
        document.querySelector('.login-container').insertBefore(errorDiv, document.querySelector('form'));
    }
});
