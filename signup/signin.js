document.getElementById("signInBtn").addEventListener("click", async (e) => {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  try {
    const response = await fetch("http://localhost:8080/api/v1/users/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    if (data.data.statusCode === 422) {
      if (data.data.value[0].email) {
        alert(data.data.message);
      } else {
        alert(data.data.value[0].password);
      }
      return;
    }
    else if (data.data.statusCode === 401) {
      alert("Please enter correct credentials")
    } else {
      location.href = "http://127.0.0.1:5500/index.html";
    }
  } catch (error) {
    console.log(error.message);
  }
});
