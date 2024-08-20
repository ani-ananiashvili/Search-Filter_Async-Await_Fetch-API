"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const namesList = document.getElementById("names-list");
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  let allNames = [];

  async function fetchNames() {
    try {
      const response = await fetch("https://api.restful-api.dev/objects");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      allNames = data;
      displayNames(data);
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  }

  function displayNames(names) {
    namesList.innerHTML = "";
    names.forEach((nameObj) => {
      const listItem = document.createElement("li");
      listItem.classList.add("name-item");
      listItem.textContent = nameObj.name;
      namesList.appendChild(listItem);
    });
  }

  function filterNames() {
    const query = searchInput.value.toLowerCase().trim();
    const filteredNames = allNames.filter((nameObj) =>
      nameObj.name.toLowerCase().includes(query)
    );
    displayNames(filteredNames);
  }

  searchInput.addEventListener("input", filterNames);
  searchButton.addEventListener("click", filterNames);

  fetchNames();
});
