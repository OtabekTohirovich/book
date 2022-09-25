const form = document.forms[0];
document.addEventListener("DOMContentLoaded", (e) => {
    const page = location.pathname;
  console.log(page);
  if (page === "/signin.html" || page === "/signin") {
    try {
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          const formData = new Signin(
            form.email.value,
            form.password.value,
          );
          console.log(formData);
          signInRequest(formData).then((data) => {
            console.log(data);
            // localStorage.token = data.token;
            localStorage.user = JSON.stringify(data.user);
            location.assign("/");
          })
          .catch((err) => {
          console.log(err.msg);
          if (err?.path) {
            location.assign(err.path);
          }
        });
        });
      } catch (err) {
        console.log(err);
      }
    async function signInRequest(formData) {
      try {
        const req = await fetch("https://bookzone-v2.herokuapp.com/api/docs/#/Auth/post_api_login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await req.json();

      if (req.ok) {
        if (req.status === 404) {
          throw { msg: "Iltimos to'g'ri manzilga so'rov jo'nating!" };
        } else if (req.status === 403) {
          // displaying "hm, what about no?"
        } else if (req.status === 401) {
          throw { msg: "Iltimos ro'yxatdan o'ting" };
        } else {
          // displaying "dunno what happened \_(ツ)_/¯"
        }
        if (data?.msg.startsWith("E11000")) {
          throw {
            msg: "Siz allaqochon ro'yhatdan o'tgansiz",
            path: "/signin.html",
          };
        }
        throw data;
      }
      return data;
      } catch (error){
        throw error;
      }

      
    }

  }
})

function Signin(email, password) {
    try {
      this.email = email;
      this.password = password;
    } catch (err) {
      console.log(err);
    }
}
