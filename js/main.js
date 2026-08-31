(function () {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const toast = $("#toast");
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => {
      toast.hidden = true;
    }, 2800);
  }

  $$(".tabs__item").forEach((tab) => {
    tab.addEventListener("click", () => {
      $$(".tabs__item").forEach((item) => item.classList.remove("tabs__item--active"));
      tab.classList.add("tabs__item--active");
    });
  });

  function maskPhone(input) {
    input.addEventListener("input", () => {
      const digits = input.value.replace(/\D/g, "").slice(0, 11);
      let next = digits;
      if (digits.startsWith("8")) next = "7" + digits.slice(1);
      if (next.startsWith("7") && next.length > 1) {
        const rest = next.slice(1);
        input.value = `+7 ${rest.slice(0, 3)}${rest.length > 3 ? " " + rest.slice(3, 6) : ""}${
          rest.length > 6 ? "-" + rest.slice(6, 8) : ""
        }${rest.length > 8 ? "-" + rest.slice(8, 10) : ""}`.trim();
      }
    });
  }

  function bindLeadForm(form, successText) {
    if (!form) return;
    const phone = form.phone;
    if (phone) maskPhone(phone);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      form.querySelector(".consult__success").hidden = false;
      form.reset();
      if (form.agree) form.agree.checked = true;
      showToast(successText);
    });
  }

  bindLeadForm($("#consult-form"), "Заявка на консультацию отправлена");
  bindLeadForm($("#sample-form"), "Заявка на бесплатный образец отправлена");

  if (typeof Swiper === "undefined") return;

  new Swiper(".banner__media", {
    loop: true,
    speed: 500,
    slidesPerView: 1,
    grabCursor: true,
  });

  $$(".projects__slider, .reviews__slider, .blog__slider").forEach((el) => {
    const gap = el.classList.contains("reviews__slider") ? 13 : 20;
    const pagination =
      el.querySelector(".swiper-pagination") ||
      el.parentElement.querySelector(":scope > .swiper-pagination");
    new Swiper(el, {
      rewind: true,
      speed: 500,
      grabCursor: true,
      slidesPerView: 1,
      spaceBetween: 0,
      pagination: {
        el: pagination,
        clickable: true,
      },
      breakpoints: {
        577: {
          slidesPerView: 3,
          spaceBetween: gap,
          rewind: false,
          pagination: { enabled: false },
        },
      },
    });
  });
})();
