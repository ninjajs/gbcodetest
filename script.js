
var source = $("#results-template").html();
var template = Handlebars.compile(source);
var timeout = null;

$('#search').keyup(function(){

  if (!$('#search').val()) {
    $('#search-results').hide();
    return;
  }

  if (timeout) {
    clearTimeout(timeout);
  }

  timeout = setTimeout(search, 500);
});

$('#search-results').mouseleave(function() {
  $('#search-results').hide();
});

function search() {
  //console.debug('search', $('#search').val())

  if (!$('#search').val()) {
    return;
  }

  $.ajax({
    url: "https://api.github.com/search/repositories?q=" + encodeURIComponent($('#search').val()),
    success: function(data, textStatus, jqXHR) {
      //console.debug('test', data.items)

      var html = template(data);

      //console.debug('html', html);
      $("#search-results").html(html).show().scrollTop(0);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      //console.debug('error', jqXHR.responseJSON.message)
      alert(jqXHR.responseJSON.message);
    }
  });
}
