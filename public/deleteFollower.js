function deleteFollower(followedID, followerID){
    $.ajax({
        url: '/users/delete/' + followedID + '/' + followerID,
        type: 'DELETE',
        success: function(result){
            window.location.reload();
        }
    })
}