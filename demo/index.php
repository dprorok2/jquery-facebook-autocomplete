<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="//connect.facebook.net/en_US/sdk.js"></script>
    
    <script>
      FB.init({
        appId      : '584858804947426',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.2'
      });

    function checkLoginState() {
      FB.getLoginStatus(function(response) {
        if(response.status === 'connected'){
          console.log("Connected");
        }
      });
    }
    </script>

    <link rel="stylesheet" href="facebook-friend-autocomplete.css">
    <script type="text/javascript" src="facebook-friend-autocomplete.js"></script>
  </head>
  <body>
    <input id="facebook-demo" type="text" />
        <fb:login-button scope="public_profile,email" onlogin="checkLoginState();">
    </fb:login-button>
  </body>
</html>