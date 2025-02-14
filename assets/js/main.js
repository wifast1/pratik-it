/**
* Template Name: Serenity
* Template URL: https://bootstrapmade.com/serenity-bootstrap-corporate-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

})();

  /**
   * prepa-certif
   */
document.addEventListener("DOMContentLoaded", function () {
  const searchBar = document.getElementById("searchBar");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const certificationItems = document.querySelectorAll(".certification-item");

  searchBar.addEventListener("keyup", function () {
      let searchText = searchBar.value.toLowerCase();
      certificationItems.forEach(item => {
          let text = item.textContent.toLowerCase();
          item.style.display = text.includes(searchText) ? "block" : "none";
      });
  });

  filterButtons.forEach(button => {
      button.addEventListener("click", function () {
          let filter = this.getAttribute("data-filter");

          certificationItems.forEach(item => {
              if (filter === "all" || item.classList.contains(filter)) {
                  item.style.display = "block";
              } else {
                  item.style.display = "none";
              }
          });

          filterButtons.forEach(btn => btn.classList.remove("btn-primary"));
          this.classList.add("btn-primary");
      });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
          // Retirer la classe "active" de tous les boutons
          filterButtons.forEach((button) => button.classList.remove("active"));

          // Ajouter la classe "active" au bouton cliqué
          this.classList.add("active");
      });
  });
});


  /**
   * detail-category
   */
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const techFilter = document.getElementById("techFilter");
  const typeFilter = document.getElementById("typeFilter");
  const resetButton = document.getElementById("resetButton");
  const projects = document.querySelectorAll(".project-card");

  function filterProjects() {
      const searchText = searchInput.value.toLowerCase();
      const selectedTech = techFilter.value;
      const selectedType = typeFilter.value;

      projects.forEach(project => {
          const title = project.querySelector(".card-title").textContent.toLowerCase();
          const description = project.querySelector(".card-text").textContent.toLowerCase();
          const tech = project.dataset.tech;
          const type = project.dataset.type;
          
          const matchesSearch = title.includes(searchText) || description.includes(searchText);
          const matchesTech = selectedTech === "" || tech === selectedTech;
          const matchesType = selectedType === "" || type === selectedType;
          
          if (matchesSearch && matchesTech && matchesType) {
              project.style.display = "block";
          } else {
              project.style.display = "none";
          }
      });
  }

  function resetFilters() {
      searchInput.value = "";
      techFilter.value = "";
      typeFilter.value = "";
      filterProjects();
  }

  searchInput.addEventListener("input", filterProjects);
  techFilter.addEventListener("change", filterProjects);
  typeFilter.addEventListener("change", filterProjects);
  resetButton.addEventListener("click", resetFilters);
});