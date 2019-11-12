$(function() {

  var showInfo = function(message) {
    console.log(message);
    $('strong.message').text(message);
    $('div.alert').show();
  };

  $('#submitButton').on('click', function(evt) {
    $('#submitButton').hide();
    evt.preventDefault();
    $('#progressBar').show();
    showInfo('Uploading sequencing data, please wait...');
    var formData = new FormData();
    //add form elements
    formData.append('genus',document.getElementById('genus').value);
    formData.append('species',document.getElementById('species').value);
    formData.append('treeMethod',document.getElementById('treeMethod').value);
    formData.append('reference',document.getElementById('reference').value);
    formData.append('usrReference',document.getElementsByClassName('custom-file-input')[0].files[0]);

    var file_input = document.getElementsByClassName('custom-file-input')[1].files
    for (var file in file_input){
      formData.append('fastqfiles',file_input[file]);
    }

    var xhr = new XMLHttpRequest();

    xhr.open('post', '/submission', true);

    xhr.upload.onprogress = function(e) {
      if (e.lengthComputable) {
        var percentage = (e.loaded / e.total) * 100;
        $('#bar').css('width', percentage + '%');
      }
    };

    xhr.onerror = function(e) {
      showInfo('An error occurred while uploading.');
    };

    xhr.onload = function() {
      showInfo('Upload Complete');
    };

    xhr.send(formData);

  });

});
