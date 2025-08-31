export function scrollToSection(id: string) {
  const container = document.querySelector(".content-container");

  const target = document.getElementById(id);
  if (!container || !target) return;

  const containerTop = container.getBoundingClientRect().top;
  const targetTop = target.getBoundingClientRect().top;

  const offset = targetTop - containerTop + container.scrollTop;

  container.scrollTo({
    top: offset,
    behavior: "smooth",
  });
}
