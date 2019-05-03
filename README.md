**Anonymous Message Board**
------

### User Stories

*I originally passed all of these user stories in order to complete a challenge but have since updated the app more for design purposes.
Most of them are still followed except for the need of inputing thread/reply_id's.

<ol>
  <li>Only allow your site to be loading in an iFrame on your own pages.</li>
  <li>Do not allow DNS prefetching.</li>
  <li>Only allow your site to send the referrer for your own pages.</li>
  <li>I can <b>POST</b> a thread to a specific message board by passing form data <code>text</code> and <code>delete_password</code> to <i>/api/threads/{board}</i>.(Recomend res.redirect to board page /b/{board})
    Saved will be <code>_id</code>, <code>text</code>, <code>created_on</code>(date&amp;time), <code>bumped_on</code>(date&amp;time, starts same as created_on), <code>reported</code>(boolean), <code>delete_password</code>, &amp; <code>replies</code>(array).</li>
  <li>I can <b>POST</b> a reply to a thread on a specific board by passing form data <code>text</code>, <code>delete_password</code>, &amp; <code>thread_id</code> to <i>/api/replies/{board}</i> and it will also update the bumped_on date to the comments date.(Recomend res.redirect to thread page /b/{board}/{thread_id})
    In the thread's 'replies' array will be saved <code>_id</code>, <code>text</code>, <code>created_on</code>, <code>delete_password</code>, &amp; <code>reported</code>.</li>
  <li>I can <b>GET</b> an array of the most recent 10 bumped threads on the board with only the most recent 3 replies from <i>/api/threads/{board}</i>. The <code>reported</code> and <code>delete_passwords</code> fields will not be sent.</li>
  <li>I can <b>GET</b> an entire thread with all it's replies from <i>/api/replies/{board}?thread_id={thread_id}</i>. Also hiding the same fields.</li>
  <li>I can delete a thread completely if I send a <b>DELETE</b> request to <i>/api/threads/{board}</i> and pass along the <code>thread_id</code> &amp; <code>delete_password</code>. (Text response will be 'incorrect password' or 'success')</li>
  <li>I can delete a post(just changing the text to '[deleted]') if I send a <b>DELETE</b> request to <i>/api/replies/{board}</i> and pass along the <code>thread_id</code>, <code>reply_id</code>, &amp; <code>delete_password</code>. (Text response will be 'incorrect password' or 'success')</li>
  <li>I can report a thread and change it's reported value to true by sending a <b>PUT</b> request to <i>/api/threads/{board}</i> and pass along the <code>thread_id</code>. (Text response will be 'success')</li>
  <li>I can report a reply and change it's reported value to true by sending a <b>PUT</b> request to <i>/api/replies/{board}</i> and pass along the <code>thread_id</code> &amp; <code>reply_id</code>. (Text response will be 'success')</li>
  <li>Complete functional tests that wholely test routes and pass.</li>
</ol>