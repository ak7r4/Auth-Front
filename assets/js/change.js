document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    // Quando o formulário for submetido
    form.addEventListener("submit", async event => {
        event.preventDefault(); // Evita o envio tradicional do formulário

        // Captura os dados dos campos do formulário
        const currentPassword = document.getElementById("current_password").value;
        const newPassword = document.getElementById("new_password").value;
        const retypeNewPassword = document.getElementById("retype_new_password").value;
        document.querySelector('.error-message')?.remove();
        document.querySelector('.success-message')?.remove();

        // Verifica se as senhas novas coincidem
        if (newPassword !== retypeNewPassword) {
            return displayError("New passwords do not match.");
        }

        // Cria um objeto com os dados do formulário
        const formData = new FormData();
        formData.append("current_password", currentPassword);
        formData.append("new_password", newPassword);
        formData.append("retype_new_password", newPassword);

        try {
            // Faz a requisição POST para a API
            const response = await fetch("/api/change", {
                method: "POST",
                body: formData,
                credentials: "include"
            });

            // Verifica se a resposta foi bem-sucedida
            if (response.ok) {
                const data = await response.json();
                displaySuccess(data.message || "Unknown error.");
            } else {
                const data = await response.json();
                displayError(data.error || "Unknown error.");
            }
        } catch (error) {
            // Caso ocorra algum erro com a requisição
            displayError("Unknown error.");
        }
    });

    // Função para exibir mensagens de erro
    function displayError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.textContent = message;
        errorDiv.classList.add('error-message');
        document.querySelector('.container').insertBefore(errorDiv, form);
    }

    // Função para exibir mensagens de sucesso
    function displaySuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.textContent = message;
        successDiv.classList.add('success-message');
        document.querySelector('.container').insertBefore(successDiv, form);
    }

    // Comportamento do botão "Voltar"
    document.getElementById("back-button").addEventListener("click", () => {
        window.location.href = "/success"; // Redireciona para a página principal (ou onde for necessário)
    });
});
