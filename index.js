let images = Array.from(document.images),
  current = document.querySelector(".current"),
  slidesNum = document.querySelector(".slides-num"),
  previous = document.querySelector(".previous"),
  next = document.querySelector(".next"),
  indexes = document.querySelector(".indexes"),
  links;

function blockNextOrPrevious(index, num) {
  index < num ? next.classList.remove("block") : next.classList.add("block");

  index > 0
    ? previous.classList.remove("block")
    : previous.classList.add("block");
}

function activeIndex(links, nexLink) {
  links.forEach((link) => {
    link.classList.remove("active");
  });
  nexLink.classList.add("active");
}

function changeImage(images, index) {
  images.forEach((image, i) => {
    if (i == index) {
      // Remove active from all imgs
      images.forEach((image) => {
        image.classList.remove("active");
      });

      image.classList.add("active");
      current.textContent = i + 1;

      // Block Next and Prev Depend on Index
      blockNextOrPrevious(index, images.length - 1);
    }
  });
}

function createIndexes(num) {
  for (let i = 0; i < num; i++) {
    let a = document.createElement("a");
    a.textContent = i + 1;
    if (i == 0) {
      a.classList.add("active");
    }
    indexes.appendChild(a);
  }

  links = indexes.querySelectorAll("a");
}

function main() {
  current.textContent = 1;
  slidesNum.textContent = images.length;

  createIndexes(images.length);
}

main();

// On Click Index
links.forEach((link) => {
  link.addEventListener("click", () => {
    activeIndex(links, link);

    // -1 Is Because We Deal With Zero Based Index
    changeImage(images, link.textContent - 1);
  });
});

// On Click Next
next.addEventListener("click", () => {
  let currentIndex = indexes.querySelector(".active");
  let nextIndex = indexes.querySelector(".active + a");

  if (currentIndex.textContent < images.length) {
    activeIndex(links, nextIndex);

    changeImage(images, nextIndex.textContent - 1);
  }
});

// On Click Previous
previous.addEventListener("click", () => {
  let currentLink = indexes.querySelector(".active");
  let currentLinkIndex = currentLink.textContent - 1;
  let previousIndex = indexes.querySelector(`a:nth-child(${currentLinkIndex})`);
  if (currentLinkIndex > 0) {
    activeIndex(indexes.querySelectorAll("a"), previousIndex);

    changeImage(images, currentLink.textContent - 2);
  }
});
