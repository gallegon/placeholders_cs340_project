function updateEvent(id){
    $.ajax({
        url: '../' + id,
        type: 'POST',
        data: $('#update-event-form').serialize(),
        success: function(result){
            window.location.replace("/events");
        }
    })
};