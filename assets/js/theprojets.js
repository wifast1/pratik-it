/**
* Template Name: Serenity
* Template URL: https://bootstrapmade.com/serenity-bootstrap-corporate-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

function filterProjects() {
  let input = document.getElementById("searchInput");
  let filter = input.value.toLowerCase();
  let projectList = document.getElementById("projectList");
  let projects = projectList.getElementsByClassName("col-md-4");
  
  for (let i = 0; i < projects.length; i++) {
      let title = projects[i].getElementsByClassName("card-title")[0].innerText.toLowerCase();
      if (title.includes(filter)) {
          projects[i].style.display = "block";
      } else {
          projects[i].style.display = "none";
      }
  }
}