$(function() {
        var currentURL = window.location.pathname.slice(3);
        currentURL = currentURL.split('/');
  console.log(currentURL)
        var url = "/api/replies/"+currentURL[0];
        $('#threadTitle').text(window.location.pathname);
        $.ajax({
          type: "GET",
          url: url,
          data:{thread_id: currentURL[1]},
          success: function(ele)
          {
            var html = ``;
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
                        </div><div>`
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
                        <form action="/api/replies/${currentURL[0]}" method="post" id="newReply">
                          <input type="hidden" name="body" value="${ele._id}">
                          <input type="hidden" name="thread_id" value="${ele._id}">
                          <textarea rows="5" cols="80" type="text" placeholder="Quick reply..." name="text" required=""></textarea><br>
                          <input type="text" placeholder="password to delete" name="delete_password" required="">
                          <input type="submit" value="Submit" class="btn submit">
                        </form></div></div></div>`
            $('#boardDisplay').html(html);
          }
        });    
        $('#boardDisplay').on('submit','#newReply', function(e) {
          var url = "/api/replies/"+currentURL[0];
          $.ajax({
            type: "POST",
            url: url,
            data: $(this).serialize(),
            success: function(data) { data ? window.location = '/b/'+currentURL[0]+'/'+currentURL[1]: null; }
          });
          e.preventDefault();
        });
        $('#boardDisplay').on('submit','#reportThread', function(e) {
          var url = "/api/threads/"+currentURL[0];
          $.ajax({
            type: "PUT",
            url: url,
            data: $(this).serialize(),
            success: function(data) { alert(data) }
          });
          e.preventDefault();
        });
        $('#boardDisplay').on('submit','#reportReply', function(e) {
          var url = "/api/replies/"+currentURL[0];
          $.ajax({
            type: "PUT",
            url: url,
            data: $(this).serialize(),
            success: function(data) { alert(data) }
          });
          e.preventDefault();
        });
        $('#boardDisplay').on('submit','#deleteThread', function(e) {
          var url = "/api/threads/"+currentURL[0];
          $.ajax({
            type: "DELETE",
            url: url,
            data: $(this).serialize(),
            success: function(data) { alert(data) }
          });
          e.preventDefault();
        });        
        $('#boardDisplay').on('submit','#deleteReply', function(e) {
          var url = "/api/replies/"+currentURL[0];
          $.ajax({
            type: "DELETE",
            url: url,
            data: $(this).serialize(),
            success: function(data) { alert(data) }
          });
          e.preventDefault();
        }); 
        $('#back').submit(function() {
          var path = currentURL[0];
          $(this).attr('action', "/b/" + path + '/');
        })
      });