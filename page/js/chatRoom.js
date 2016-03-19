var socket = io();
$(document).ready(function() {
	//跳出視窗，輸入暱稱
	//result = window.prompt(text, value);
	var name =  window.prompt("請輸入暱稱",guest);

	if (name=""||name=null) {
		name="guest";
	}

	//tell server
	socket.emit("add user",name);

	//listener new message event
	socket.on('chat message', function(data){
          appendMessage(data.username+":"+data.msg);
    });

	//listener new user message event
	socket.on('add user', function(data){
          appendMessage(data.username+"加入聊天室");
    });

	//listener  user leave message event
	socket.on('user left',function(data){
          appendMessage(data.username+"離開聊天室");
    });

    $('#send').click(function(){
    	var text = $('#m').val();
     	socket.emit('chat message', text);
        $('#m').val('');
        return false;
      });

    $("#m").keydown(function(event){
     	if ( event.which == 13 ){
          // 13 = Carriage Return
            $('#send').click();
          }
      });
    
    function appendMessage(msg){
    	$('#messages').append($('<li>').text(msg));
    	var message = document.getElementById("message_block");
    	message.scrollTop = message.scrollHeight;
    }



});
