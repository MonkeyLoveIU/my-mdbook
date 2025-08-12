let scrollTimeout;

const listenActive = () => {
  const elems = document.querySelector(".pagetoc").children;
  [...elems].forEach(el => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = decodeURIComponent(el.getAttribute("href")).substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 20,
          behavior: "smooth"
        });
      }
      clearTimeout(scrollTimeout);
      [...elems].forEach(el => el.classList.remove("active"));
      el.classList.add("active");
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null;
      }, 150);
    });
  });
};

const getPagetoc = () => document.querySelector(".pagetoc") || autoCreatePagetoc();

const autoCreatePagetoc = () => {
  const main = document.querySelector("#content > main");
  const content = Object.assign(document.createElement("div"), {
    className: "content-wrap"
  });
  content.append(...main.childNodes);
  main.prepend(content);
  main.insertAdjacentHTML("afterbegin", '<div class="sidetoc"><nav class="pagetoc"></nav></div>');
  return document.querySelector(".pagetoc");
};

const updateFunction = () => {
  if (scrollTimeout) return;
  const pagetocLinks = [...document.querySelector(".pagetoc").children];
  const scrolledY = window.scrollY;
  let lastHeader = null;

  // 使用querySelectorAll选取带id的标题元素
  const headers = [...document.querySelectorAll("main h1[id], main h2[id], main h3[id]")];

  for (let i = headers.length - 1; i >= 0; i--) {
    if (scrolledY >= headers[i].offsetTop - 30) {
      lastHeader = headers[i];
      break;
    }
  }

  pagetocLinks.forEach(link => link.classList.remove("active"));

  if (lastHeader) {
    // 找到对应的目录链接并高亮
    const activeLink = pagetocLinks.find(link => link.getAttribute("href") === `#${lastHeader.id}`);
    if (activeLink) activeLink.classList.add("active");
  }
};

window.addEventListener('load', () => {
  const pagetoc = getPagetoc();

  // 使用querySelectorAll选取带id的标题元素
  const headers = [...document.querySelectorAll("main h1[id], main h2[id], main h3[id]")];

  headers.forEach(header => {
    const level = header.tagName;
    const link = Object.assign(document.createElement("a"), {
      textContent: header.textContent,
      href: `#${header.id}`,
      className: `pagetoc-${level}`,
      style: level === "H2" ? "padding-left:15px" : level === "H3" ? "padding-left:30px" : ""
    });
    pagetoc.appendChild(link);
  });

  updateFunction();
  listenActive();
  window.addEventListener("scroll", updateFunction);
});
