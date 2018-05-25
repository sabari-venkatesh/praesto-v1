// import styles
//require('datatables.net-bs4/css/dataTables.bootstrap4.css');
import '../fonts/index.scss';
import '../styles/index.scss';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/tab';
import DataTable from 'datatables.net-bs4';
import 'datatables.net-fixedcolumns';
import './charts.js';

$(document).ready(() => {

  /* declare variables here */
  const headerNav = $('header.has-nav');

  /* declare the functions here */
  const toggleSidebar = () => {
    var breakpoint = 768;
    if ($('.has-nav').length > 0) {
      breakpoint = 1200;
    }
    if ($(window).innerWidth() > breakpoint) {
      $('body').removeClass('is-collapsed');
    } else {
      $('body').addClass('is-collapsed');
    }
  };

  const setContentSpacing = () => {
    $('.content').css('padding-top', headerNav.innerHeight());
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

  var toggle = $('.has-text .handle');
  toggle.text(toggle.attr('data-on'));

  $('.has-text input').change(function() {
    if (!toggle.prev().is(':checked')) {
      toggle.text(toggle.attr('data-off'));
    } else {
      toggle.text(toggle.attr('data-on'));
    }
  });

  $('.overlay').click(() => {
    toggleSidebar();
  });

  $(window).scroll(() => {
    if ($(window).scrollTop() > 50) {
      headerNav.addClass('is-scrolling');
    } else {
      headerNav.removeClass('is-scrolling');
    }
  });

  $(window).resize(() => {
    toggleSidebar();
    setContentSpacing();
  });

  $('.select-daterange').change(() => {
    var selected = $('.select-daterange option:selected').val().toLowerCase();
    $('.daterange').addClass('d-none');
    $('#' + selected).removeClass('d-none');
  });


  /* list the functions to be invoked on page initialization here */
  //toggleSidebar();
  setContentSpacing();

  $('#table-users').DataTable({
    dom: 'rt<"dataTables_bottom"lp>',
    fixedHeader: true,
    fixedColumns: {
      leftColumns: 1
    },
    orderCellsTop: true,
    scrollX: true,
    scrollCollapse: true,
    scrollY: 300,
  });

  $('#table-products_trends, #table-conversion_metrics, #table-inventory_trends').DataTable({
    dom: 'rt<"dataTables_bottom"lp>',
    fixedHeader: true,
    fixedColumns: {
      leftColumns: 1
    },
    orderCellsTop: true,
    scrollX: true,
    scrollCollapse: true,
    scrollY: 300,
  });

  $('#table-customers_trends, #table-customers_trends_new, #table-customers_trends_repeat').DataTable({
    dom: 'rt<"dataTables_bottom"lp>',
    fixedHeader: true,
    fixedColumns: {
      leftColumns: 1
    },
    orderCellsTop: true,
    scrollX: true,
    scrollCollapse: true,
    scrollY: 500,
  });

  $('#table-sales_geography').DataTable({
    ajax: './data/sales-demography.json',
    dom: 'rt<"dataTables_bottom justify-content-end"p>',
    searching: false,
    lengthChange: false,
    fixedHeader: true,
    info: false,
    columns: [{
        title: 'State',
        data: 'code'
      },
      {
        title: 'Sales ($)',
        data: 'value'
      },
      {
        title: 'Units',
        data: 'units'
      }
    ]
  });

  $('#table-replenishment_product').DataTable({

  });


  $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
    //  $($.fn.dataTable.tables(true)).css('width', '100%');
    $($.fn.dataTable.tables(true)).DataTable().columns.adjust().draw();
  });


});
