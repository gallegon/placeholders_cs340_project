//
$(document).ready(function () {
    toggleFields();
    $("#entry-fee").change(function () {
        toggleFields();
    });
});

// toggle the ticket price field is the entry fee field is the same
function toggleFields() {
    if ($("#entry-fee").val() === "TRUE")
        $("#ticket-price").show();
    else
        $("#ticket-price").hide();
}
