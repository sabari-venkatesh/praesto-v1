// import styles
import '../fonts/index.scss';
import '../styles/index.scss';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';
import DataTable from 'vanilla-datatables';
import HighCharts from 'highcharts';

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
  /* list the functions to be invoked on page initialization here */
  toggleSidebar();

  if ($('#users').length > 0) {
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
  }
  HighCharts.chart('container', {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Fruit Consumption'
    },
    xAxis: {
      categories: ['Apples', 'Bananas', 'Oranges']
    },
    yAxis: {
      title: {
        text: 'Fruit eaten'
      }
    },
    series: [{
      name: 'Jane',
      data: [1, 0, 4]
    }, {
      name: 'John',
      data: [5, 7, 3]
    }]
  });
});
