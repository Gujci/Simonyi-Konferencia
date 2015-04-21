$(document).ready(function() {
    $('#feedback-button').on('click', feedback);

    function feedback() {

        $.ajax('/', {
            type: 'post',
            data: {
                name: $('#feedback-name').val(),
                email: $('#feedback-email').val(),
                text: $('#feedback-text').val()
            },
            success: function (data) {
                $(".regform").hide(500);
                $("#regdone").show(500);

                $('#feedback-name').value="";
                $('#feedback-email').value="";
                $('#feedback-text').value="";

            },
            complete: function (data) {

            },
            error: function (data) {
                console.log("err");
            }
        });
    }
});
