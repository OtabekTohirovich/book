// let database = [...parsedData()];
const form = document.forms[0];
document.addEventListener("DOMContentLoaded", (e) => {
  const page = location.pathname;
  console.log(page);
  if (page === "/signup.html" || page === "/signup") {
    try {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new SignUp(
          form.firstName.value,
          form.lastName.value,
          form.email.value,
          form.password.value,
          form.phone.value,
          form.lang.value,
          form.role.value
        );
        console.log(formData);
        signUprRequest(formData).then((data) => {
          console.log(data);
          localStorage.token = data.token;
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
    async function signUprRequest(formData) {
      try {
        const req = await fetch("https://bookzone-v2.herokuapp.com/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await req.json();
      if (!req.ok) {
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

function SignUp(firstName, lastName, email, password, phone, lang, role) {
  try {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.lang = lang;
    this.role = role;
  } catch (err) {
    console.log(err);
  }
}


// radios.addEventListener("click", showlink);

// console.log(showlink());
// function showlink(e) {
//   const text = document.querySelector("author__value");
//   text.innerHTML = `<label>You want to be Author?
//   <a href="./signupauthor.html"> Click on!!!
//   </a></label>`;
// }

// function loadingPage() {
//   const inputValue = document.querySelectorAll("input")
//   if(inputValue.values === "") {
//     prompt("bu juda yomon");
//   }
//   else {
//     window.location.assign("http://127.0.0.1:5500/index.html")
//   }
// }