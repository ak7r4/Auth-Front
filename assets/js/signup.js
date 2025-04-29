document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("form").addEventListener("submit", async event => {
        event.preventDefault();
        document.querySelector('.error-message')?.remove();
        document.querySelector('.success-message')?.remove();

        if (!grecaptcha.getResponse()) {
            return displayError("Please complete the reCAPTCHA.");
        }

        try {
            const response = await fetch("/api/signup", {
                method: "POST",
                body: new FormData(event.target),
                credentials: "include"
            });

            // Verifica se o status da resposta é ok (2xx)
            if (response.ok) {
                const data = await response.json();

                // Se a API retornar sucesso com uma mensagem, trata como sucesso
                if (data.message && data.message === "User created successfully!") {
                    displaySuccess("Cadastro realizado com sucesso! Redirecionando para login...");
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 3000);
                } else {
                    displayError(data.error || "Erro inesperado.");
                    grecaptcha.reset();
                }
            } else {
                // Se a resposta não for ok (erro), exibe a mensagem de erro
                const data = await response.json();
                displayError(data.error || "Erro desconhecido.");
                grecaptcha.reset();
            }
        } catch (error) {
            // Captura qualquer erro de rede ou falha de requisição
            displayError("Erro desconhecido.");
            grecaptcha.reset();
        }
    });

    // Função para exibir mensagem de erro
    function displayError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.textContent = message;
        errorDiv.classList.add('error-message');
        document.querySelector('.login-container').insertBefore(errorDiv, document.querySelector('form'));
    }

    // Função para exibir mensagem de sucesso
    function displaySuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.textContent = message;
        successDiv.classList.add('success-message');
        document.querySelector('.login-container').insertBefore(successDiv, document.querySelector('form'));
    }
});
