addSelectors = function ($selectorDiv, sisenseBuilderConfig) {


  //make an api call to get widgets for the dashboard
  var url = sisenseBuilderConfig.sisenseServerURL + '/api/v1/dashboards/' + sisenseBuilderConfig.dashboardId + '/widgets';
  var app = sisenseBuilderConfig.sjsApp;

  $widgetSelect = $('<select></select>');

  //	Make an API call to get the filters from an existing dashboard
  app.$$http.get(url).then(function (response) {
    var wArr = response.data;

    for (var w = 0; w < wArr.length; w++) {
      var t = wArr[w].title != '' ? wArr[w].title : wArr[w].oid;
      $widgetSelect.append('<option value="' + wArr[w].oid + '">' + t + '</option>');
      //console.log(t);
    }
  });


  var $addWidget = $('<span>[ + ]</span>');
  var $removeWidget = $('<span>[ - ]</span>');

  $selectorDiv.append($widgetSelect);
  $selectorDiv.append($addWidget);
  $selectorDiv.append($removeWidget);

  var sdash = sisenseBuilderConfig.sjsDash;


  $addWidget.on('click', function () {
    //add a div area
    if (!sdash.widgets.get($widgetSelect.val()).container) {
      //console.log('Container Not Assigned');
      $wdiv = $('<div class = "Tab1" style = "height: 400px; width: 33%; float: left; top: 25px; display: inline; margin-top:10px;"></div>');
      $wdiv.attr('id', 'W-' + $widgetSelect.val());

      //append the div area to the DOM
      $('#sisenseApp').append($wdiv);

      //assign the widget to the Div area
      sdash.widgets.get($widgetSelect.val()).container = document.getElementById("W-" + $widgetSelect.val());
      sdash.widgets.get($widgetSelect.val()).refresh();
    } else {
      $('#W-' + $widgetSelect.val()).show();
      sdash.widgets.get($widgetSelect.val()).refresh();
    }


  });

  $removeWidget.on('click', function () {
    //remove the div area
    $('#W-' + $widgetSelect.val()).hide();

  });

};
