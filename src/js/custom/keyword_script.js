// Script to request keywords.
async function loadTrendsAjax() {
  return $.ajax({
    url: 'http://127.0.0.1:8080/keywords',
    type: 'GET',
    data: {
      format: 'json'
    },
    dataType: 'json',
    contentType: "application/json;charset=utf-8",
    success: function (json_data) {
      if (json_data.request) {
        console.log('Keyword Data loaded');
        let trendRows = '';
        let keywordRows = '';
        let newsRows = '';
        $.each(json_data.trends, function (index, value) {
          trendRows += '<tr>' +
            '<td>' + index + '</td>' +
            '<td>' + value + '</td>' +
            '</tr>';
        });
        $('#trend-table-body').append(trendRows);

        $.each(json_data.keywords, function (index, value) {
          keywordRows += '<tr>' +
            '<td>' + index + '</td>' +
            '<td>' + value + '</td>' +
            '</tr>';
        });
        $('#keyword-table-body').append(keywordRows);
      
        $.each(json_data.news, function (index, value) {
          newsRows += '<tr>' +
            '<td>' + value.title + '</td>' +
            '<td>' + value.summary + '</td>' +
            '</tr>';
        });
        $('#news-table-body').append(newsRows);        
      }
      else {
        console.log(json_data.data);
      }
    },
    error: function (request, error) {
      console.log("Request: " + JSON.stringify(request));
    }
  });
}

await loadTrendsAjax();
renderTables();