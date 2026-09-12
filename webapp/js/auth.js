const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = document.getElementById("message");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
        }),
      });

      const data = await response.json();
      message.textContent = data.message;

      if (response.ok) {
        registerForm.reset();
        setTimeout(() => { window.location.href = "login.html"; }, 800);
      }
    } catch (error) {
      message.textContent = "Server connection failed.";
      console.error(error);
    }
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = document.getElementById("loginMessage");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: document.getElementById("loginEmail").value,
          password: document.getElementById("loginPassword").value,
        }),
      });

      const data = await response.json();
      message.textContent = data.message;

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setTimeout(() => { window.location.href = "index.html"; }, 500);
      }
    } catch (error) {
      message.textContent = "Server connection failed.";
      console.error(error);
    }
  });
}
