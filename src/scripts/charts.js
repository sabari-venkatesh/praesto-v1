import Highcharts from 'highcharts';
import HighMaps from 'highcharts/highmaps';
//import HighMaps from 'Highcharts/highmaps';
import mapData from './us-all.js';

$(document).ready(() => {
  /* Sales: Sales to Customers */
  if ($('#chart-sales_customers').length > 0) {
    Highcharts.chart('chart-sales_customers', {
      chart: {
        type: 'column',
        height: (9 / 21 * 100) + '%'
      },
      title: {
        text: 'Sales to Customers'
      },
      xAxis: {
        categories: ['15 Apr', '16 Apr', '17 Apr', '18 Apr', '19 Apr', '20 Apr']
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Sales($)'
        },
      },
      legend: {
        align: 'left',
        x: 30,
        verticalAlign: 'bottom',
        y: 0,
        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
        shadow: false
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
        }
      },
      series: [{
        name: '3P Sales - MFN',
        type: 'column',
        data: [50, 200, 400, 700, 200, 480]
      }, {
        name: '3P Sales - FBA',
        type: 'column',
        data: [100, 300, 500, 400, 600, 500]
      }, {
        name: 'Amazon Sales',
        type: 'column',
        data: [900, 600, 300, 200, 400, 600]
      }, {
        name: 'Amazon COGS',
        type: 'spline',
        data: [200, 314, 440, 522, 665, 855]
      }],
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            chart: {
              height: 300
            },
            subtitle: {
              text: null
            },
            navigator: {
              enabled: false
            }
          }
        }]
      }
    });
  }

  /* Sales: Sales to Amazon */
  if ($('#chart-sales_amazon').length > 0) {
    Highcharts.chart('chart-sales_amazon', {
      chart: {
        type: 'column',
        height: (9 / 21 * 100) + '%'
      },
      title: {
        text: 'Sales to Amazon'
      },
      xAxis: {
        categories: ['18 Mar', '19 Mar', '20 Mar', '21 Mar', '22 Mar']
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Units'
        },
      },
      legend: {
        align: 'center',
        x: 0,
        verticalAlign: 'bottom',
        y: 0,
        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
        shadow: false
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      series: [{
        name: 'Amazon PO',
        data: [500, 300, 400, 700, 200]
      }, {
        name: 'Amazon Shipped - Confirmed PO',
        data: [280, 250, 304, 20, 10]
      }],
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            chart: {
              height: 300
            },
            subtitle: {
              text: null
            },
            navigator: {
              enabled: false
            }
          }
        }]
      }
    });
  }

  /* Sales: Geographic Trends */
  if ($('#chart-sales_geographic').length > 0) {
    $.getJSON('./data/sales-demography.json', function({
      data
    }) {
      // Make codes uppercase to match the map data
      $.each(data, function() {
        this.code = this.code.toUpperCase();
      });

      // Instantiate the map
      HighMaps.mapChart('chart-sales_geographic', {
        title: {
          text: 'Sales per State'
        },

        legend: {
          layout: 'vertical',
          borderWidth: 0,
          backgroundColor: 'rgba(255,255,255,0.85)',
          floating: true,
          verticalAlign: 'middle',
          align: 'right',
          y: 0
        },

        mapNavigation: {
          enabled: true
        },

        colorAxis: {
          min: 1,
          type: 'logarithmic',
          minColor: '#EEEEFF',
          maxColor: '#000022',
          stops: [
            [0, '#EFEFFF'],
            [0.67, '#055948'],
            [1, '#000022']
          ]
        },

        series: [{
          data: data,
          mapData: mapData,
          joinBy: ['postal-code', 'code'],
          dataLabels: {
            enabled: true,
            color: '#FFFFFF',
            format: '{point.code}'
          },
          name: 'Sales per State',
          tooltip: {
            pointFormat: '{point.code}: ${point.value}'
          }
        }]
      });
    });
  }

  /* Inventory: Inventory Source */
  if ($('#chart-inventory').length > 0) {
    Highcharts.chart('chart-inventory', {
      chart: {
        zoomType: 'xy',
        height: 300
      },
      title: {
        text: 'Inventory'
      },
      xAxis: [{
        categories: ['15 Apr', '16 Apr', '17 Apr', '18 Apr', '19 Apr', '20 Apr'],
        crosshair: true
      }],
      yAxis: [{ // Primary yAxis
        labels: {
          format: '{value}',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        title: {
          text: '',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        }
      }, { // Secondary yAxis
        title: {
          text: '',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        labels: {
          format: '{value}',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        opposite: true
      }],
      tooltip: {
        shared: true
      },
      legend: {
        layout: 'horizontal',
        align: 'center',
        x: 0,
        verticalAlign: 'bottom',
        y: 0,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
      },
      series: [{
        name: 'Amazon On-Hand',
        type: 'column',
        color: '#1b66aa',
        yAxis: 1,
        data: [1000, 800, 500, 400, 600, 500],
      }, {
        name: 'Amazon Back-Ordered',
        type: 'spline',
        color: '#25aa1b',
        data: [100, 90, 98, 123, 144, 89],
      }, {
        name: 'Amazon Cancelled',
        type: 'spline',
        data: [20, 20, 10, 30, 40, 30],
      }]
    });
  }

  /* Exceptions: Count of Exceptions */
  if ($('#chart-exceptions_count').length > 0) {
    Highcharts.chart('chart-exceptions_count', {
      chart: {
        type: 'column',
        zoomType: 'xy'
      },
      title: {
        text: 'Count of Exceptions'
      },
      xAxis: {
        categories: ['15 Apr', '16 Apr', '17 Apr', '18 Apr', '19 Apr', '20 Apr'],
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Exceptions'
        },
      },
      tooltip: {
        shared: true
      },
      plotOptions: {
        column: {
          stacking: 'normal',
        }
      },
      legend: {
        layout: 'horizontal',
        align: 'center',
        x: 0,
        verticalAlign: 'bottom',
        y: 0,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
      },
      series: [{
        name: 'Count of Image Change',
        type: 'column',
        data: [500, 200, 100, 80, 120, 60],
      }, {
        name: 'Count of No A+',
        type: 'column',
        data: [400, 200, 100, 50, 25, 25],
      }, {
        name: 'Count of variation (twister) change',
        type: 'column',
        data: [250, 125, 62, 31, 15, 15],
      }, {
        name: 'Replenishment Code',
        type: 'column',
        data: [200, 100, 50, 25, 12, 12],
      }, {
        name: 'Product Category Changes',
        type: 'column',
        data: [300, 150, 75, 37, 16, 30],
      }, {
        name: 'Products without offer',
        type: 'column',
        data: [250, 125, 62, 31, 15, 30],
      }]
    });
  }

  /* Advertising: All AMS Advertising Source */
  if ($('#chart-advertising').length > 0) {
    Highcharts.chart('chart-advertising', {
      chart: {
        zoomType: 'xy'
      },
      title: {
        text: 'All AMS Advertising'
      },
      xAxis: [{
        categories: ['15 Apr', '16 Apr', '17 Apr', '18 Apr', '19 Apr', '20 Apr'],
        crosshair: true
      }],
      yAxis: [{ // Primary yAxis
        labels: {
          format: '{value}',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        title: {
          text: '',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        }
      }, { // Secondary yAxis
        title: {
          text: '',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        labels: {
          format: '{value}',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        opposite: true
      }],
      tooltip: {
        shared: true
      },
      legend: {
        layout: 'horizontal',
        align: 'center',
        x: 0,
        verticalAlign: 'bottom',
        y: 0,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
      },
      series: [{
        name: 'Sales',
        color: '#ed7d31',
        type: 'column',
        yAxis: 1,
        data: [900, 600, 300, 200, 400, 1100],
      }, {
        name: 'Impressions',
        type: 'spline',
        color: '#4472C4',
        data: [862, 150, 850, 680, 400, 500],
      }, {
        name: 'Clicks',
        color: '#1b66aa',
        type: 'spline',
        yAxis: 1,
        data: [750, 680, 750, 680, 675, 800],
      }, {
        name: 'CPC',
        color: '#25aa1b',
        type: 'spline',
        yAxis: 1,
        data: [680, 750, 850, 950, 680, 1050],
      }, {
        name: 'ACOS',
        color: '#7cb5ec',
        type: 'spline',
        yAxis: 1,
        data: [700, 157, 235, 687, 845, 900],
      }, {
        name: 'Live Campaigns',
        color: '#795548',
        type: 'spline',
        yAxis: 1,
        data: [100, 300, 680, 950, 425, 800],
      }]
    });
  }

  /* Product Ranks: Daily Rank of all products */
  if ($('#chart-product_ranks').length > 0) {
    Highcharts.chart('chart-product_ranks', {
      chart: {
        type: 'column',
        height: 300
      },
      title: {
        text: 'Daily ranking of all Products'
      },
      xAxis: {
        categories: ['15 Apr', '16 Apr', '17 Apr', '18 Apr', '19 Apr']
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Rank'
        },
      },
      legend: {
        align: 'center',
        x: 0,
        verticalAlign: 'bottom',
        y: 0,
        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
        shadow: false
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      series: [{
        name: 'All Products',
        data: [400, 190, 80, 180, 10],
        type: 'spline',
      }]
    });
  }

  /* Map: All Count of Violations  */
  if ($('#chart-map').length > 0) {
    Highcharts.chart('chart-map', {
      chart: {
        zoomType: 'xy'
      },
      title: {
        text: 'Count of Violations'
      },
      xAxis: [{
        categories: ['15 Apr', '16 Apr', '17 Apr', '18 Apr', '19 Apr', '20 Apr'],
        crosshair: true
      }],
      yAxis: [{ // Primary yAxis
        labels: {
          format: '{value}',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        title: {
          text: '',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        }
      }, { // Secondary yAxis
        title: {
          text: '',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        labels: {
          format: '{value}',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        opposite: false
      }],
      tooltip: {
        shared: true
      },
      legend: {
        layout: 'horizontal',
        align: 'center',
        x: 0,
        verticalAlign: 'bottom',
        y: 0,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
      },
      series: [{
        name: 'Violations',
        color: '#4472c4',
        type: 'column',
        yAxis: 1,
        data: [900, 600, 300, 200, 400, 1100],
      }]
    });
  }

  /* Buy-box: Buy-box report */
  if ($('#chart-buy-box').length > 0) {
    Highcharts.chart('chart-buy-box', {
      chart: {
        zoomType: 'xy',
        height: 300
      },
      title: {
        text: 'All Products - BuyBox'
      },
      xAxis: [{
        title: {
          text: 'Date',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        categories: ['4/15/2018', '4/16/2018', '4/17/2018', '4/18/2018', '4/19/2018', '4/20/2018']
      }],
      yAxis: {
        min: 82,
        max: 100,
        labels: {
          formatter: function() {
            return this.value + '%';
          }
        },
        title: {
          text: 'BuyBox %',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        }
      },
      series: [{
        name: 'Products',
        type: 'column',
        color: '#1b66aa',
        data: [98, 88, 92, 90, 95, 88],
      }]
    });
  }

  if ($('#chart-chargeback-trend').length > 0) {
    Highcharts.chart('chart-chargeback-trend', {
      chart: {
        zoomType: 'xy',
        height: 300
      },
      title: {
        text: 'Chargeback Trends'
      },
      xAxis: [{
        categories: ['April', 'May', 'June', 'July', 'Augest', 'September'],
        crosshair: true
      }],
      yAxis: [{ // Secondary yAxis
        title: {
          text: '',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        labels: {
          format: '{value}',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        }
      }],
      tooltip: {
        shared: true
      },
      legend: {
        layout: 'horizontal',
        align: 'center',
        x: 0,
        verticalAlign: 'bottom',
        y: 0,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
      },
      series: [{
        name: 'Chargebacks this year',
        type: 'line',
        color: '#25aa1b',
        data: [1200, 900, 600, 500, 700, 500],
      }, {
        name: 'Chargebacks last year',
        type: 'line',
        data: [1000, 600, 200, 200, 400, 1200],
      }]
    });
  }
});
