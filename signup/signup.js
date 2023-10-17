document.getElementById("signUpBtn").addEventListener("click", async (e) => {
  e.preventDefault();
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let name = firstName + lastName;
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/users/register",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          email,
          password,
        }),
      }
    );
    const data = await response.json();
    if (data.data.statusCode === 422) {
      if (data.data.value[0].username) {
        console.log(data.data.value[0].username);
        alert(data.data.value[0].username);
      } else {
        alert(data.data.value[0].password);
      }
      return;
    } else if (data.data.statusCode === 409) {
      return alert("This email id is alredy registered")
    } else {
      location.href = "http://127.0.0.1:5500/index.html";
    }
  } catch (error) {
    console.log(error.message);
  }
});
