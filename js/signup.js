// let database = [...parsedData()];

document.addEventListener("DOMContentLoaded", (e) => {
  const page = location.pathname;
  console.log(page);
  if (page === "/signup.html" || page === "/signup") {
    const form = document.forms[0];
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
        });
      });
    } catch (err) {
      console.log(err);
    }
    async function signUprRequest(formData) {
      const req = await fetch("https://bookzone-v2.herokuapp.com/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await req.json();
      return data;
    }
    document.getElementById("author").addEventListener("click", function (event) {
      if (event.target && event.target.matches("input[type='radio']")) {
        event.preventDefault();
        // do something here ...
        const text = document.querySelector(".author__value");
        text.innerHTML += `<label>You want to be Author?
      <a href="./signupauthor.html"> Click on!!!
      </a></label>`;
      }
    });
  }

  const form = document.forms[0];
  if (page === "/signupauthor.html" || page === "/signupauthor") {
    try {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new SignUpAuthor(
          form.firstName.value,
          form.lastName.value,
          form.email.value,
          form.password.value,
          form.phone.value,
          form.role.value,
          form.date_of_birth.value
        );
        console.log(formData);
        signUprRequest(formData).then((data) => {
          console.log(data);
        });
        
      });
      
    } catch (err) {
      console.log(err);
    }
    async function signUprRequest(formData) {
      const req = await fetch("https://bookzone-v2.herokuapp.com/api/sign-up", {
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
});

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
function SignUpAuthor(
  firstName,
  lastName,
  email,
  password,
  phone,
  role,
  date_of_birth
) {
  try {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.role = role || "author";
    this.date_of_birth = date_of_birth;
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

function loadingPage() {
  const inputValue = document.querySelectorAll("input")
  if(inputValue.values === "") {
    prompt("bu juda yomon");
  }
  else {
    window.location.assign("http://127.0.0.1:5500/index.html")
  }
}