const form = document.getElementById("login-form");
let token = "";

async function login(event) {
  event.preventDefault();
  console.log("entrou no form");

  const user = document.getElementById("user").value;
  const email = document.getElementById("email").value;

  if (user.length === "" || email.length === "") {
    console.log("email ou senha vazio");
  }

  const formData = {
    username: user,
    email: email,
  };

  await fetch("https://poupe-mais-api.vercel.app/user/sign-in", {
    method: "POST",
    headers : { "Content-Type": "application/json"},
    body: JSON.stringify(formData),
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Nenhum dado retorna");
      }

      return response.json();
    })
    .then(function (data) {
      console.log(data.body);
      const { username, email, token } = data.body;
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("token", token);

     

    })
    .catch(function(error){
      console.error(error);
    })
    window.location.href = "dashboard.html";
}

form.addEventListener("submit", login);
