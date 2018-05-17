$(document).ready(() => {

  /* declare the functions here */
  var toggleSidebar = () => {
    if ($(window).innerWidth() < 768) {
      $('body').addClass('is-collapsed');
    }
  };


  /* register events here */
  $('.navbar-toggle').click((event) => {
    event.preventDefault();
    $('body').toggleClass('is-collapsed');
  });

  $('#togglepwd').click((event) => {
    event.preventDefault();
    var input = $('#currentpwd');
    var icon = $('#togglepwd').querySelector('i');
    if (input.attr('type') === 'password') {
      input.attr('type', 'text');
      icon.removeClass('icon-eye').addClass('icon-eye-blocked');
    } else {
      input.attr('type', 'password');
      icon.removeClass('icon-eye-blocked').addClass('icon-eye');
    }
  });

  $('.overlay').click(() => {
    toggleSidebar();
  });

  $(window).resize(() => {
    toggleSidebar();
  });

  var dataTable = new DataTable("#users", {
    searchable: false,
    //fixedHeight: true,
    fixedColumns: true,
    columns: [{
        select: [0, 2, 3, 7],
        sortable: false
      },
      {
        select: [0, 1, 2, 3, 4, 5, 6, 7],
        render: function(data, cell, row) {
          cell.style.width = '12.5%';
          return data;
        }
      }
    ],
    perPage: 5,
    layout: {
      top: "{search}",
      bottom: "{select}{pager}"
    },
    labels: {
      placeholder: "Search...",
      perPage: "Show {select} records",
      noRows: "No entries to found",
    }
  });

  /* list the functions to be invoked on page initialization here */
  toggleSidebar();
});
