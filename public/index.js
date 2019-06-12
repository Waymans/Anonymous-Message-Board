$(function() {
        $.ajax({
          type: "GET",
          url: '/api/boards',
          success: function(data) {
            var boards= [];
            data.forEach(function(ele) {
              var list = [
                '<div class="cell">',
                '<h2><a href="/b/'+ele+'/">/b/'+ele+'/</a></h2>',
                '</div>'];
              boards.push(list.join(''));
            });
            $('#boardList').html(boards.join(''));
          }
        });
      });
      $('#newThread').submit(function(){
          var board = $('#board1').val();
          $(this).attr('action', "/api/threads/" + board);
      });