var peer = new Peer(); 
var uid = '';
peer.on('open', function(id) {
    console.log('My peer ID is: ' + id);
    document.getElementById('yourId').value = id
    uid = id
});


function submit () {
   if(document.getElementById('otherId').value) {
        var otherPeerId = document.getElementById('otherId').value
        peer.connect(otherPeerId)
        peer.on('connection', function(e) { 
           console.log(e)
        });
        peer.call(otherPeerId)
       var mediaStream = navigator.getUserMedia({ video: true, audio: false }, function (stream) {
        document.getElementById('yourVid').srcObject = stream
        document.getElementById('yourVid').style.display = "block"
        var y = document.getElementById('yourVid')
        y.play()
        var call = peer.call(otherPeerId ,stream);
        peer.on('call', function(call) {
            // Answer the call, providing our mediaStream
            call.answer(stream);
            call.on('stream', function (rStream) {
                var video = document.createElement('video')
                document.getElementById('otherVid').style.display = "block"
                document.getElementById('otherVid').srcObject = rStream
                var o = document.getElementById('otherVid')
                o.play()
            })
        });

       }, function (err) {
            console.log('Failed to get local stream' ,err);
       })
       /* var call = peer.call(otherPeerId ,mediaStream);

        peer.on('call', function(call) {
            // Answer the call, providing our mediaStream
            call.answer(mediaStream);
        }); 
        alert(document.getElementById('otherId').value) */
   } else {
       alert('No')
   }
}