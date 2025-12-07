document.addEventListener("DOMContentLoaded", () => {
  const offset = 125;
  const smoothScrollLinks = document.querySelectorAll("a[href^='#']");

  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      if (href.startsWith("#") && href !== "#") {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          const targetPosition = targetElement.offsetTop - offset;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          closeMobileMenu();
        }
      }
    });
  });

  const toggleButton = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const body = document.body;

  function closeMobileMenu() {
    navMenu.classList.remove("open");
    toggleButton.classList.remove("active");
    body.classList.remove("menu-open");
  }

  toggleButton.addEventListener("click", () => {
    const isOpening = !navMenu.classList.contains("open");

    navMenu.classList.toggle("open");
    toggleButton.classList.toggle("active");
    body.classList.toggle("menu-open");

    if (isOpening) {
      setTimeout(() => {
        document.addEventListener("click", outsideClickHandler);
      }, 100);
    } else {
      document.removeEventListener("click", outsideClickHandler);
    }
  });

  function outsideClickHandler(e) {
    if (!navMenu.contains(e.target) && !toggleButton.contains(e.target)) {
      closeMobileMenu();
      document.removeEventListener("click", outsideClickHandler);
    }
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("open")) {
      closeMobileMenu();
    }
  });
});
