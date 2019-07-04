var hasUploadError = false;

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
  hasUploadError = false;
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        hasUploadError = true;
      }
    }
  };
  xhr.send(formData);
  return false;
}
$(document).ready(function() {
  $(".file-upload").file_upload();
  $("input[type=file]").change(function() {
    var file = document.getElementById("file_input").files[0];
    uploadFormData(file);
    $("#success").hide();
    $("#hasError").hide();

    var i = 30;
    progressBar(i, $("#progressBar"));

    var temp = setInterval(function() {
      if (i <= 100) {
        progressBar(i, $("#progressBar"));
        $("#progressBar").show();
        i = i + 10;
      } else {
        $("#progressBar").hide();
        if (hasUploadError) {
          $("#hasError").show();
        } else {
          $("#success").show();
        }
        clearInterval(temp);
        getFiles();
      }
    }, 500);
  });
});
