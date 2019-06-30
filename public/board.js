$(function() {
        var currentBoard = window.location.pathname.slice(3,-1);
        var url = "/api/threads/"+currentBoard;
        $('#boardTitle').text('Welcome to '+window.location.pathname)
        $.ajax({
          type: "GET",
          url: url,
          success: function(data)
          {
            var html = ``;
            data.forEach(function(ele) {
              html += `<div class="thread">
                        <div class="thread1">
                          <h3>${ele.text}</h3>
                          <p class="id">Created on: ${new Date(ele.created_on).toUTCString()}</p>
                          <form id="reportThread">
                            <input type="hidden" name="report_id" value="${ele._id}">
                            <input type="submit" value="Report" class="btn report"></form>
                          <form id="deleteThread">
                            <input type="hidden" value="${ele._id}" name="thread_id" required="">
                            <input type="text" placeholder="password" name="delete_password" required="">
                            <input type="submit" value="Delete" class="btn delete"></form>
                          </div><div>`;
              
              var hiddenCount = ele.replycount - 3;
              if (hiddenCount < 1) { hiddenCount = 0 };
              
              html += `<h5 class="count">${ele.replycount} replies total (${hiddenCount} hidden)- <a href="${window.location.pathname+ele._id}">See the full thread here</a>.</h5>`;
              ele.replies.forEach(function(rep) {
              html += `<div class="reply">
                        <p>${rep.text}</p>
                        <p class="id">Created on: ${new Date(rep.created_on).toUTCString()}</p>
                        <form id="reportReply">
                          <input type="hidden" name="thread_id" value="${ele._id}">
                          <input type="hidden" name="reply_id" value="${rep._id}">
                          <input type="submit" value="Report" class="btn report"></form>
                        <form id="deleteReply">
                          <input type="hidden" value="${ele._id}" name="thread_id" required="">
                          <input type="hidden" value="${rep._id}" name="reply_id" required="">
                          <input type="text" placeholder="password" name="delete_password" required="">
                          <input type="submit" value="Delete" class="btn delete"></form>
                        </div>`
              });
              html += `<div>
                        <form action="/api/replies/${currentBoard}/" method="post" id="newReply">
                          <input type="hidden" name="thread_id" value="${ele._id}">
                          <textarea rows="5" cols="80" type="text" placeholder="Quick reply..." name="text" required=""></textarea><br>
                          <input type="text" placeholder="password to delete" name="delete_password" required="">
                          <input type="submit" value="Submit" class="btn submit">
                        </form></div></div></div>`
            });
            $('#boardDisplay').html(html);
          }
        });
        $('#newThread').submit(function(e){
          e.preventDefault();
          $.ajax({
            type: "POST",
            url: url,
            data: $(this).serialize(),
            success: function(data) { data ? window.location = '/b/'+currentBoard+'/': null; }
          });
        });
        $('#boardDisplay').on('submit','#newReply', function(e){
          e.preventDefault();
          $.ajax({
            type: "POST",
            url: '/api/replies/'+currentBoard,
            data: $(this).serialize(),
            success: function(data) { data ? window.location = '/b/'+currentBoard+'/': null; }
          });
        });
        $('#boardDisplay').on('submit','#reportThread', function(e) {
          var url = "/api/threads/"+currentBoard;
          $.ajax({
            type: "PUT",
            url: url,
            data: $(this).serialize(),
            success: function(data) { alert(data) }
          });
          e.preventDefault();
        });
        $('#boardDisplay').on('submit','#reportReply', function(e) {
          var url = "/api/replies/"+currentBoard;
          $.ajax({
            type: "PUT",
            url: url,
            data: $(this).serialize(),
            success: function(data) { alert(data) }
          });
          e.preventDefault();
        });
        $('#boardDisplay').on('submit','#deleteThread', function(e) {
          var url = "/api/threads/"+currentBoard;
          $.ajax({
            type: "DELETE",
            url: url,
            data: $(this).serialize(),
            success: function(data) { data ? window.location = '/': null; }
          });
          e.preventDefault();
        });        
        $('#boardDisplay').on('submit','#deleteReply', function(e) {
          var url = "/api/replies/"+currentBoard;
          $.ajax({
            type: "DELETE",
            url: url,
            data: $(this).serialize(),
            success: function(data) { data ? window.location = '/b/'+currentBoard+'/': null; }
          });
          e.preventDefault();
        });   
      });