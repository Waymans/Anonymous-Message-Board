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
        /*e.preventDefault();
          $.ajax({
            type: "POST",
            url: url,
            data: $(this).serialize(),
            success: function(data) { data ? window.location = 'https://mess-board1-project.glitch.me/b/'+currentBoard+'/': null; }
          });*/
      });
      $('#on').click(function() {
        $("#overlay").fadeIn();//.css('display', "block");
        $(document.body).css('overflow', "hidden");
      })
      $('#overlay').click(function() {
        $("#overlay").fadeOut();//.css('display' ,"none");
        $(document.body).css('overflow', "auto");
      })