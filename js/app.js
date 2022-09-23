// let database = [...parsedData()];
document.addEventListener("DOMContentLoaded", (e) => {
  const page = location.pathname;
  console.log(page);
  if (page === "/index.html" || page === "/") {
    console.log("salom");
    getBooksRequest()
      .then((data) => {
        displayBooks(data.payload.docs);
      })
      .catch((err) => {
        alert(err.message);
      });
  }
});

function displayBooks(data) {
  let result = "";
  const bookMenuNode = document.querySelector(".books");
  data.forEach((data) => {
    result += `
            <div class="book">
            <img width="100%" src="./img/book.png" alt="Book Image" class="book_img" />
            <h3>${data.title}</h3>
            <h6>${data.author.firstName}</h6>
            <img src="img/star.png" alt="Star" class="star" />
            <h5>4.1 • ${data.pages} bet</h5>
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
