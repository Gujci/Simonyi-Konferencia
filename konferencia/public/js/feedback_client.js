$(document).ready(function () {
    $('#feedback-button').on('click', feedback);

    function feedback() {

        var _name = $('#feedback-name').val();
        var _email = $('#feedback-email').val();
        var _text = $('#feedback-text').val();

        if (_name != "" && _email != "" && _text != "") {

            $.ajax('/', {
                type: 'post',
                data: {
                    name: _name,
                    email: _email,
                    text: _text
                },
                success: function (data) {
                    $(".regform").hide(500);
                    $("#regdone").show(500);

                    $('#feedback-name').value = "";
                    $('#feedback-email').value = "";
                    $('#feedback-text').value = "";

                },
                complete: function (data) {

                },
                error: function (data) {
                    console.log("err");
                }
            });
        }
    }
});
