function getTicketPage(id){
    $.ajax({
        url: '../get-ticket/' + id,
        type: 'GET',
        success: function(result){
            window.location.replace('../get-ticket/' + id);
        }
    })
};