// request to events route for a specific tag
function filterEventTags() {
    //get tag from dropdown
    var tagToFilter = document.getElementById('filter').value
    // redirt to route filter
    window.location = '/events/filter/' + tagToFilter
}