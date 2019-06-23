function progressBar(percent, $element) {
  var progressBarWidth = (percent * $element.width()) / 100;
  $element
    .find("div")
    .animate({ width: progressBarWidth }, 500)
    .html(percent + "%&nbsp;");
}

function uploadFormData(file) {
  var formData = new FormData();
  formData.append("uploadinp", file);

  var xhr = new XMLHttpRequest();
  // Add any event handlers here...
  xhr.open("post", "../uploadfile", true);
  xhr.send(formData);
  return false;
}
$(document).ready(function() {
  $(".file-upload").file_upload();
  $("input[type=file]").change(function() {
    var file = document.getElementById("file_input").files[0];
    uploadFormData(file);
    $("#success").hide();

    var i = 30;
    progressBar(i, $("#progressBar"));

    var temp = setInterval(function() {
      if (i <= 100) {
        progressBar(i, $("#progressBar"));
        $("#progressBar").show();
        i = i + 10;
      } else {
        $("#progressBar").hide();
        $("#success").show();
        clearInterval(temp);
      }
    }, 500);
  });
});
