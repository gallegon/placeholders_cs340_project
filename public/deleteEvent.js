function deleteEvent(id){
    $.ajax({
        url: '/events/delete/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload();
        }
    })
}