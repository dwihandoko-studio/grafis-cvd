$(document).ready(function() {
            $('.advancesearch').keyup(function () {
                // this.value.charAt(0).toUpperCase()

                a = this.value.charAt(0).toUpperCase()+this.value.slice(1);
                $('.advancesearch').val(a)
            });

          $('.advancesearch').typeahead({
            source: function (query, process) {
                return $.post(url, { query: query ,'csrfmiddlewaretoken' :csrf}, function (data) {
                    return process(data['data']);
                });
            },

          });

    });