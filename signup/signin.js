document.getElementById("signInBtn").addEventListener("click", async (e) => {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  try {
    const response = await fetch(
      "https://demo-dev-cpbh.2.sg-1.fl0.io/api/v1/users/login",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    const data = await response.json();
    if (data.data.statusCode === 422) {
      if (data.data.value[0].email) {
        alert(data.data.message);
      } else {
        alert(data.data.value[0].password);
      }
      return;
    } else if (data.data.statusCode === 401) {
      alert("Please enter correct credentials");
    } else {
      location.href = location.href = location.origin + "/index.html";
    }
  } catch (error) {
    console.log(error.message);
  }
});
