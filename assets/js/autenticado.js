document.addEventListener("DOMContentLoaded", function () {
  const changeBtn = document.getElementById("change");
  const logoutBtn = document.getElementById("logout");

  changeBtn.addEventListener("click", () => {
    window.location.href = "/change";
  });
logoutBtn.addEventListener("click", () => {
    fetch("/api/logout", {
      method: "POST",
      credentials: "include" // Garante envio do cookie da sessão
    })
    .then(response => {
      if (response.ok) {
        window.location.href = "/"; // Ou redireciona pra login, etc.
      } else {
        throw new Error("Falha ao fazer logout");
      }
    })
    .catch(err => {
      console.error("Erro no logout:", err);
    });
  });
});
