/**
 * @overview
 *
 * @author
 * @version 2013/09/27
 */

var socket = io.connect();
socket.on("start", function () {
//  alert(1);
});

socket.on("showImg", function (data) {
   $("img.show").attr("src", data.link);
});
