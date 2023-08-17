// Script to request news.
async function loadNewsAjax() {
  return $.ajax({
    url: 'http://127.0.0.1:8080/news',
    type: 'GET',
    data: {
      format: 'json'
    },
    dataType: 'json',
    contentType: "application/json;charset=utf-8",
    success: function (json_data) {
      if (json_data.request) {
        console.log('News Data loaded');
        let newsRows = '';

        $.each(json_data, function (index, value) {
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

await loadNewsAjax();
new DataTable("#news-table");