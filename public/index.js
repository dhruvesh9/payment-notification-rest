function setToken() {
    fetch(window.location.origin + '/token/get')
        .then(response => {
            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Failed to fetch access token');
            }
            // Parse the JSON response
            return response.json();
        })
        .then(data => {
            // Extract the access_token from the JSON response
            console.log('JWT token :: ' + JSON.stringify(data));
            const accessToken = data.access_token;
            const mref = data.mref;

            // Set the access_token as the value of the specified HTML element
            window.document.getElementById('token_place').value = accessToken;
            window.document.getElementById('mref_place').value = mref;
            window.document.getElementById('success_url_place').value = window.location.origin+'/payment/notification?result=success';
            window.document.getElementById('fail_url_place').value = window.location.origin+'/payment/notification?result=fail';

        })
        .catch(error => {
            // Handle any errors that occur during the fetch
            console.error('Error fetching access token:', error.message);
        });
}