$(document).ready(function () {

     $("#text").hide();
     $("#MultiMedia").hide();

    $("#type").change(function () {
       var text = $('#type').val();
        if(text == "1")
        {
            $("#text").show();
            $("#MultiMedia").hide();
        }
        else
        {
            $("#text").hide();
            $("#MultiMedia").show();
        }
    });


    $("#btnPress").on('click', function () {
         $.ajax({
            type: 'GET',
            url: '/openweb',
            success: function (data) {

                if ((data)) {
                    alert(JSON.stringify((data.result)));
                    $("#regForm").hidden
                }
                else {


                }

            }, error: function (data) {
                alert("Try After Some Time.....!");
            }
        });
    });


});

