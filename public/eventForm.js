//
$(document).ready(function () {
    toggleFields();
    $("#hasEntryFee").change(function () {
        toggleFields();
    });
});

// toggle the ticket price field is the entry fee field is the same
function toggleFields() {
    if ($("#hasEntryFee").val() === "TRUE")
        $("#ticketPriceInput").show();
    else
        $("#ticketPriceInput").hide();
}
