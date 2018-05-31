// import styles
//require('datatables.net-bs4/css/dataTables.bootstrap4.css');
import '../fonts/index.scss';
import '../styles/index.scss';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/tab';
import 'bootstrap/js/dist/tooltip';
import 'bootstrap/js/dist/popover';
import 'bootstrap4-datetimepicker';
import AutoComplete from 'devbridge-autocomplete';
import DataTable from 'datatables.net-bs4';
import 'datatables.net-fixedcolumns';
import './charts.js';

/* moved swapSelect function as a jQuery plugin */
(function($) {
	$.fn.swapSelect = function() {
		var buttonGroups = this;
		var init = () => {
			buttonGroups.each((index, group) => {
				$('.btn', group).click((event) => {
					var button = $(event.target);
					button.siblings().removeClass('is-active');
					button.addClass('is-active');
				}).eq(0).click(); // The default highlighted button;
			});
		};
		init();
		return this;
	};
}(jQuery));

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

	const asin = [{
			value: 'B018E65WW2',
			data: 'THERMO PURE Natural Fat Burner Caffeine Free Weight Loss Pills and Healthy Appetite Suppressant Dietary Supplement, 60 Capsule'
		},
		{
			value: 'B01BON4QAQ',
			data: 'PAIN-MD, Top Pain Relief Supplement, Fast Acting Natural Formula for Joint Pain Relief and Muscle Discomfort, More Flexibility with Anti-Inflammatory'
		},
		{
			value: 'B01NBHK5XX',
			data: 'Install Centric ICGM12BNGM 2005-16 Class II Complete Installation Solution for Car Stereos'
		},
		{
			value: 'B01EXS1NA0',
			data: 'New Domaine Shredded Latex Cooling pillow- Queen'
		},
	];

	$('#myInput').autocomplete({
		lookup: asin,
		onSelect: function(suggestion) {
			//var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
			$('#hiddenasin').val('');
			$('#hiddenasin').val(suggestion.value);
			$('#myInput').val(suggestion.data);
		}
	});

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

		if (group === 'all') {
			groupCogs.removeClass('is-active');
			if (isAllOption) {
				groupAll.addClass('is-active');
			} else {
				groupAll.removeClass('is-active');
			}
		} else {
			groupAll.removeClass('is-active');
		}
		ele.addClass('is-active');
	});

	/* Plugin calls */
	$('.btn-group').swapSelect();

	$('.input-date').datetimepicker({
		format: 'MMM DD, YYYY',
		inline: false,
		useCurrent: false
	});

	$("#daterange-from").on("dp.change", function(e) {
		$('#daterange-to').data("DateTimePicker").minDate(e.date);
	});

	$("#daterange-to").on("dp.change", function(e) {
		$('#daterange-from').data("DateTimePicker").maxDate(e.date);
	});

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

	$('#table-product_ranks').DataTable({
		dom: 'rt<"dataTables_bottom justify-content-end"p>',
		searching: false,
		lengthChange: false,
		fixedHeader: true,
		info: false,
		scrollX: true
	});

	$('#table-product_gainers').DataTable({
		dom: 'rt<"dataTables_bottom justify-content-end"p>',
		searching: false,
		lengthChange: false,
		fixedHeader: true,
		info: false,
		scrollX: true
	});

	$('#table-product_losers').DataTable({
		dom: 'rt<"dataTables_bottom justify-content-end"p>',
		searching: false,
		lengthChange: false,
		fixedHeader: true,
		info: false,
		scrollX: true
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

	$('#table-buy-box-top-sellers').DataTable({
		dom: 'rt<"dataTables_bottom justify-content-end">',
		searching: false,
		lengthChange: false,
		fixedHeader: true,
		info: false,
	});

	$('#table-buy-box-top-problem-products').DataTable({
		dom: 'rt<"dataTables_bottom justify-content-end">',
		searching: false,
		lengthChange: false,
		fixedHeader: true,
		info: false,
	});

	$('#table-buy-box-price').DataTable({
		dom: 'rt<"dataTables_bottom justify-content-end">',
		searching: false,
		lengthChange: false,
		fixedHeader: true,
		info: false,
	});

	$('#table-buy-box-seller-price').DataTable({
		dom: 'rt<"dataTables_bottom justify-content-end">',
		searching: false,
		lengthChange: false,
		fixedHeader: true,
		info: false,
	});

	$('#table-charge-back-dispute').DataTable({
		dom: 'rt<"dataTables_bottom"lp>',
		fixedHeader: true,
		orderCellsTop: true,
		scrollX: true,
		scrollCollapse: true,
		scrollY: 300,
		paging: false
	});

	$('#across-theweb').DataTable({
		dom: 'rt<"dataTables_bottom"lp>',
		fixedHeader: true,
		orderCellsTop: true,
		ordering: false,
		scrollX: true,
		scrollCollapse: true,
		scrollY: 500,
		paging: false
	});

	$('#table-reviews_trends').DataTable({
		dom: 'rt<"dataTables_bottom"lp>',
		fixedHeader: true,
		fixedColumns: {
			leftColumns: 2
		},
		orderCellsTop: true,
		scrollX: true,
		scrollCollapse: true,
		scrollY: 300,
	});

	$('#table-reviews_weeks').DataTable({
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

	$('#table-recommendations-promotion-count').DataTable({
		dom: 'rt<"dataTables_bottom justify-content-end">',
		searching: false,
		scrollX: true,
		lengthChange: false,
		fixedHeader: true,
		info: false,
	});

	$('#table-recommendations-promotion-request').DataTable({
		dom: 'rt<"dataTables_bottom justify-content-end">',
		searching: false,
		scrollX: true,
		lengthChange: false,
		fixedHeader: true,
		info: false,
	});

	$('#table-recommendations-promotion').DataTable({
		dom: 'rt<"dataTables_bottom justify-content-end">',
		searching: false,
		lengthChange: false,
		fixedHeader: true,
		info: false,
		scrollX: true,
		scrollCollapse: true,
		scrollY: 500,
		paging: false
	});

	$('#table-forecasting_view').DataTable({
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

	const reviewsInfo = [{
		rating: 5,
		percent: 50
	}, {
		rating: 4,
		percent: 80
	}, {
		rating: 3,
		percent: 93
	}, {
		rating: 2,
		percent: 45
	}, {
		rating: 1,
		percent: 20
	}];
	
	const popoverHTML =
		`${reviewsInfo.map(info => `
        <div class="row align-items-center mb-1">
          <div class="col-auto">
            <a href="#">${info.rating} stars</a>
          </div>
          <div class="col">
            <div class="progress">
              <div class="progress-bar bg-info"
                role="progressbar"
                style="width: ${info.percent}%"
                aria-valuenow="${info.percent}"
                aria-valuemin="0"
                aria-valuemax="100">
                ${info.percent}
              </div>
            </div>
          </div>
        </div>
      `).join('')}`;

	$('[data-toggle="popover"]').popover({
		container: 'body',
		content: popoverHTML,
		html: true,
		title: 'Review Ratings',
		trigger: 'focus',
		placement: 'left',
		boundary: 'viewport'
	});

	$('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
		//  $($.fn.dataTable.tables(true)).css('width', '100%');
		$($.fn.dataTable.tables(true)).DataTable().columns.adjust().draw();
	});

	/* functions to be invoked on page init */
	toggleSidebar();
	setContentSpacing();
});
