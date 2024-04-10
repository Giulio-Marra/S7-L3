const fetchBook = () => {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Bad Request");
        } else if (response.status === 401) {
          throw new Error("Unauthorized");
        } else if (response.status === 403) {
          throw new Error("Forbidden");
        } else if (response.status === 404) {
          throw new Error("Not Found");
        } else if (response.status === 500) {
          throw new Error("Server Error");
        } else {
          throw new Error("Generic Fetch Error");
        }
      }
      return response.json();
    })
    .then((books) => {
      const bookCardRow = document.getElementById("bookCardRow");

      books.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("col-md-6", "col-lg-4", "mb-3");

        card.innerHTML = `
          <div class="card h-100">
            <img src="${book.img}" class="card-img-top img-fluid h-100" alt="${
          book.title
        }"> 
            <div class="card-body">
              <h5 class="card-title">${book.title}</h5>
              <p class="card-text">Price: ${book.price + "$"}</p>
              <button class="btn btn-primary shop-btn">Shop</button>
              <button class="btn btn-warning delete-btn">Delete</button>
            </div>
          </div>
        `;

        bookCardRow.appendChild(card);
      });
      const deleteButtons = document.querySelectorAll(".delete-btn");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          const card = event.target.closest(".card");
          card.remove();
        });
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

fetchBook();
