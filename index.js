let activePage = "home";

//utilities functions

function $(selector) {
  return document.querySelector(selector);
}

function hide(id) {
  console.info("hide %o element", id);
  $(`#${id}`).style.display = "none";
}

function show(id) {
  const page = $("#" + id);
  console.info("show %o", id, page);
  page.style.display = "block";
}

function showPage(id) {
  const oldLink = $(`#top-menu-bar a[data-page=${activePage}]`);
  oldLink.classList.remove("active");

  hide(activePage);

  activePage = id;

  const link = $(`#top-menu-bar a[data-page=${activePage}]`);
  link.classList.add("active");

  show(activePage);
}

function clickOnMenu(e) {
  const link = e.target.closest("a");
  //console.warn("click", link, e.target);
  if (link) {
    const id = link.dataset.page;
    //console.warn("click %o menu", e.target.getAttribute("data-page"));
    //console.warn("click %o menu", id, e.target.matches("a"));
    //console.warn("click %o menu", id);
    if (id) {
      //if (e.target.matches("a") & id) {
      showPage(id);
    }
  }
}

function sortByEndorcements(a, b) {
  return b.endorcements - a.endorcements;
}

function sortByName(a, b) {
  return a.name.localeCompare(b.name);
}

function showSkills(skills) {
  skills.sort(sortByEndorcements);
  const htmlSkills = skills.map((skill) => {
    //<li class="favorite">HTML</li>
    console.info("skill", skill);
    const cls = skill.favorite ? "favorite" : "";
    return `<li class="${cls}">${skill.name} <span>- ${skill.endorcements}</span></li>`;
  });
  console.info("skills", htmlSkills);
  const ul = $("#skills ul");
  ul.innerHTML = htmlSkills.join("");
}

function loadSkills() {
  //console.time("load");
  const response = fetch("skills.json");
  const loaded = response.then((r) => {
    return r.json();
  });
  loaded.then((skills) => {
    showSkills(skills);
    //console.timeEnd("load");
    //console.warn("ready");
  });
  //console.warn("end");
}

//HR Skills

function showHrSkills(skills) {
  const htmlSkills = skills.map(function (skill) {
    //console.info("skill", skill);
    return `<li>${skill.name}</li>`;
  });
  //console.info("skills", htmlSkills);
  const ul = $("#hrSkills");
  ul.innerHTML = htmlSkills.join("");
}

function loadHrSkills() {
  const response = fetch("hrskills.json");
  const loaded = response.then(function (r) {
    return r.json();
  });
  loaded.then(function (skills) {
    showHrSkills(skills);
  });
}

function showTableOfFour() {
  const checkBox = document.getElementById("four");
  const table = document.getElementById("tableOfFour");
  if (checkBox.checked == true) {
    table.style.display = "block";
  } else {
    table.style.display = "none";
  }
}

function showTableOfNine() {
  const checkBox = document.getElementById("nine");
  const table = document.getElementById("tableOfNine");
  if (checkBox.checked == true) {
    table.style.display = "block";
  } else {
    table.style.display = "none";
  }
}

//work experience

function showWorkExperience(positions) {
  const htmlPositions = positions.map(function (position) {
    //console.info("position", position);
    const cls = position.current ? "current" : "";
    return `<li class="${cls}">${position.company} - ${position.position} (${position.start} - ${position.finish}) </li>`;
  });
  //console.info("positions", htmlPositions);
  const ul = $("#workExperience");
  ul.innerHTML = htmlPositions.join("");
}

function loadWorkExperience() {
  const response = fetch("experience.json");
  const loaded = response.then(function (r) {
    return r.json();
  });
  loaded.then(function (positions) {
    showWorkExperience(positions);
  });
}

//start our code

showPage(activePage);
$("#top-menu-bar").addEventListener("click", clickOnMenu);
loadSkills();
loadHrSkills();
loadWorkExperience();
