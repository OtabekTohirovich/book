const form = document.forms[0];
const searchlist = document.getElementsByClassName("book");
document.addEventListener("DOMContentLoaded", (e) => {
  const page = location.pathname;
  console.log(page);
  if (page === "/index.html" || page === "/index") {
    if (localStorage.token) {
      let img__wrapper = document.querySelector(".img__wrapper");
      let auth__link = document.querySelector(".btn");
      auth__link.remove();
      img__wrapper.classList.remove("hide");
    }
    getAuthorsRequest()
    getBooksRequest()
      .then((data) => {
        displayBooks(data.payload.docs);
        initializeBookEvent();
        displayAuthors(data.payload.docs);
        instializationAuthorsEvent();
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }
  if (page === "/book.html" || page === "/book") {
    fetchById(
      `https://bookzone-v2.herokuapp.com/api/books`,
      history.state.id
    ).then((book) => {
      console.log(book, "book data from");
    });
  }

  if (page === "/authors.html" || page === "/authors") {
    fetchById(
      `https://bookzone-v2.herokuapp.com/api/authors`,
      history.state.id
    ).then((author) => {
      console.log(author, "authors data from");
    });
  }

  if (page === "/signin.html" || page === "/login") {
    const signInForm = document.querySelector(".signIn_form");

    signInForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = {
        email: signInForm.email.value,
        password: signInForm.password.value,
      };
      authRequest("https://bookzone-v2.herokuapp.com/api/login", formData)
        .then((data) => {
          console.log(data);
          localStorage.token = data.token;
          localStorage.user = JSON.stringify(data.user);
          location.assign("/");
        })
        .catch((err) => {
          Toastify({
            text: err.msg,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, red, red)",
            },
            onClick: function () {}, // Callback after click
          }).showToast();
          // alert(err.msg);
          if (err?.path) {
            location.assign(err.path);
          }
        });
    });
  }

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
        signUprRequest(formData)
          .then((data) => {
            console.log(data);
            localStorage.token = data.token;
            localStorage.user = JSON.stringify(data.user);
            location.assign("/index.html");
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
        const req = await fetch(
          "https://bookzone-v2.herokuapp.com/api/sign-up",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
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
      } catch (error) {
        throw error;
      }
    }
  }
});

function initializeBookEvent() {
  const bookMenuNode = document.querySelector(".books");
  bookMenuNode.addEventListener("click", (event) => {
    const id = event.target.closest(".book")?.dataset?.id;
    console.log(id, "bosilgan");
    if (!id) return;
    history.pushState({ id }, null, "/book.html");
    location.reload();
  });
}

function instializationAuthorsEvent() {
  const authorMenuNode = document.querySelector(".authorss");
  authorMenuNode.addEventListener("click", (event) => {
    const id = event.target.closest(".authorr")?.dataset?.id;
    console.log(id, "bosildi");
    if (!id) return;
    history.pushState({ id }, null, "/authors.html");
    location.reload();
  });
}

function displayAuthors(data) {
  let result = "";
  const authorMenuNode = document.querySelector(".authorss");
  data.forEach((author) => {
    result += `<div class="authorr" data-id="${author._id}">
    <img width="100%" src="#" alt="Book Image" class="book_img" />
    <h3>${author.author.firstName}</h3>
    <h6>${author.author.lastName}</h6>
    <img src="#" alt="Star" class="star" />
  </div>`;
  });
  authorMenuNode.innerHTML = result;
}

const getAuthorsRequest = async () => {
  try {
    const response = await fetch("https://bookzone-v2.herokuapp.com/api/authors");
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Iltimos to'g'ri manzilga so'rov jo'nating!");
      } else if (response.status === 403) {
        // displaying "hm, what about no?"
      } else {
        // displaying "dunno what happened \_(ツ)_/¯"
      }
      throw new Error(response);
    }
    let data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

function displayBooks(data) {
  let result = "";
  const bookMenuNode = document.querySelector(".books");
  data.forEach((book) => {
    result += `
            <div class="book" data-id="${book._id}">
            <img width="100%" src="./img/book.png" alt="Book Image" class="book_img" />
            <h3>${book.title}</h3>
            <h6>${book.author.firstName}</h6>
            <img src="#" alt="Star" class="star" />
            <h5>4.1 • ${book.pages} bet</h5>
          </div>
        `;
  });
  bookMenuNode.innerHTML = result;
}

const getBooksRequest = async () => {
  try {
    const response = await fetch("https://bookzone-v2.herokuapp.com/api/books");
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Iltimos to'g'ri manzilga so'rov jo'nating!");
      } else if (response.status === 403) {
        // displaying "hm, what about no?"
      } else {
        // displaying "dunno what happened \_(ツ)_/¯"
      }
      throw new Error(response);
    }
    let data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};




const fetchById = async (url, id) => {
  try {
    const response = await fetch(`${url}/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Iltimos to'g'ri manzilga so'rov jo'nating!");
      } else if (response.status === 403) {
        // displaying "hm, what about no?"
      } else {
        // displaying "dunno what happened \_(ツ)_/¯"
      }
      throw new Error(response);
    }
    let data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

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

async function authRequest(url, formData) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    let data = await response.json();
    if (!response.ok) {
      if (response.status === 404) {
        throw { msg: "Iltimos to'g'ri manzilga so'rov jo'nating!" };
      } else if (response.status === 403) {
        // displaying "hm, what about no?"
      } else if (response.status === 401) {
        throw { msg: "Iltimos ro'yxatdan o'ting" };
      } else {
        // displaying "dunno what happened \_(ツ)_/¯"
      }
      if (data?.msg.startsWith("E11000")) {
        throw {
          msg: "Siz allaqochon ro'yhatdan o'tgansiz",
          path: "/sign-in.html",
        };
      }
      throw data;
    }
    return data;
  } catch (error) {
    throw error;
  }
}

// const authcheck = document.querySelector(".authorss");
// authcheck.addEventListener('change', function (e) {
//   if (this.checked) {
//     console.log(this.value);
//     const dataBirth = document.querySelector(".author__value")
//     dataBirth.innerHTML += ` <label for="date_of_birth">Date of your Birthday</label>
//     <input class="input__disgn"  type="date" name="date_of_birth" id="date_of_birth">`
//   }
// });
