function deleteUser(id){
    $.ajax({
        url: '/users/delete/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload();
        }
    })
}