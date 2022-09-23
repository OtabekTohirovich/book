document.addEventListener("DOMContentLoaded", (e) => {
    const page = location.pathname;
  console.log(page);
  if (page === "/signip.html" || page === "/signip") {
    try {
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          const formData = new Signin(
            form.email.value,
            form.password.value,
          );
          console.log(formData);
          signInrRequest(formData).then((data) => {
            console.log(data);
          });
        });
      } catch (err) {
        console.log(err);
      }
    async function signInrRequest(formData) {
        const req = await fetch("https://bookzone-v2.herokuapp.com/api/docs/#/Auth/post_api_login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await req.json();
        return data;
      }

  }
})

function Signin( email, password) {
    try {
      this.email = email;
      this.password = password;
    } catch (err) {
      console.log(err);
    }
}
function loadinggPage() {
    const inputValue = document.querySelectorAll("input")
    if(inputValue.values === "") {
      prompt("bu juda yomon");
    }
    else {
      window.location.assign("http://127.0.0.1:5500/index.html")
    }
}