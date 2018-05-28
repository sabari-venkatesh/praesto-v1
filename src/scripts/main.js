// import styles
//require('datatables.net-bs4/css/dataTables.bootstrap4.css');
import '../fonts/index.scss';
import '../styles/index.scss';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/tab';
//import 'bootstrap-daterangepicker';
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

  //$('input[name="daterangepicker"]').daterangepicker();

  $('.select-daterange').change(() => {
    var last = $('.select-daterange option:last-child');

    if (last.is(':selected')) {
      //var selected = $('.select-daterange option:selected').val().toLowerCase();
      $('#daterange').removeClass('d-none');
    } else {
      $('#daterange').addClass('d-none');
    }
  });

 $('.table-filters .badge').click((event) => {
    
    event.preventDefault();
    var ele = $(event.target),
    tableFilters = ele.parent(),
    group = ele.attr('name'),
    filters = $('.badge', tableFilters),
    isAllOption = ($(filters).index(ele) === 0),
    groupAll = $(('[name="all"]'), tableFilters),
    groupCogs = $(('[name="cogs"]'), tableFilters);

    if(group === 'all') {
      groupCogs.removeClass('is-active');
      if(isAllOption) {
        groupAll.addClass('is-active');
      } else {
        groupAll.removeClass('is-active');
      }
    } else {
      groupAll.removeClass('is-active');
    }
    ele.addClass('is-active');
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

  /* Exceptions */
  $('#table-replenishment').DataTable({
    dom: 'rt<"dataTables_bottom justify-content-end"p>',
    searching: false,
    lengthChange: false,
    fixedHeader: true,
    info: false,
  });

  $('#table-replenishment_product').DataTable({
    dom: 'rt<"dataTables_bottom justify-content-end"p>',
    searching: false,
    lengthChange: false,
    fixedHeader: true,
    info: false,
  });

  $('#table-count_image').DataTable({
    dom: 'rt<"dataTables_bottom justify-content-end"p>',
    searching: false,
    lengthChange: false,
    fixedHeader: true,
    info: false,
  });

  $('#table-count_aplus').DataTable({
    dom: 'rt<"dataTables_bottom justify-content-end"p>',
    searching: false,
    lengthChange: false,
    fixedHeader: true,
    info: false,
  });

  $('#table-count_twister').DataTable({
    dom: 'rt<"dataTables_bottom justify-content-end"p>',
    searching: false,
    lengthChange: false,
    fixedHeader: true,
    info: false,
  });

  $('#table-products_changes').DataTable({
    dom: 'rt<"dataTables_bottom justify-content-end"p>',
    searching: false,
    lengthChange: false,
    fixedHeader: true,
    info: false,
  });

  $('#table-products_offer').DataTable({
    dom: 'rt<"dataTables_bottom justify-content-end"p>',
    searching: false,
    lengthChange: false,
    fixedHeader: true,
    info: false,
  });

  $('#table-buy_box').DataTable({
    dom: 'rt<"dataTables_bottom justify-content-end"p>',
    searching: false,
    lengthChange: false,
    fixedHeader: true,
    info: false,
  });

  $('#table-best_seller').DataTable({
    dom: 'rt<"dataTables_bottom justify-content-end"p>',
    searching: false,
    lengthChange: false,
    fixedHeader: true,
    info: false,
  });

  $('#table-amazon_sellers').DataTable({
    dom: 'rt<"dataTables_bottom justify-content-end"p>',
    searching: false,
    lengthChange: false,
    fixedHeader: true,
    info: false,
  });

  $('#table-performing_keywords, #table-performing_products').DataTable({
    dom: 'rt<"dataTables_bottom"lp>',
    fixedHeader: true,
    fixedColumns: {
      leftColumns: 1
    },
    orderCellsTop: true,
    scrollX: true,
    scrollCollapse: true,
    scrollY: 500,
    paging: false
  });

  $('#top20-seller, #top20-problem-products').DataTable({
    dom: 'rt<"dataTables_bottom"lp>',
    fixedHeader: true,
    orderCellsTop: true,
    scrollX: true,
    scrollCollapse: true,
    scrollY: 500,
    paging: false
  });

  $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
    //  $($.fn.dataTable.tables(true)).css('width', '100%');
    $($.fn.dataTable.tables(true)).DataTable().columns.adjust().draw();
  });


});
