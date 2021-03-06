angular.module('app.home', [])
  .controller('homeController', function($scope, $location, $window) {

    /*********LOGIN*********/
    // console.log("TEST ---> username=", $window.user.username); //test
    // if (!$window.user.username) {
    //   $location.path('/login');
    // } // if

    /*********INIT*********/
    $('#videoContainer').hide(); // hide video player
    $window.homepageLoaded = true; 

    /*********CONTROLLER*********/
    $scope.submitVideo = function() {
        var url = $scope.videoUrl;
        var videoId = url.split('=')[1];
        // console.log('test. VideoId = '+videoId);
        $location.path('/video/' + videoId); //dev  
        // $rootScope.newVideo = 
        // request the vidoe and comments from the server
      } //submitVideo

  })
  .controller('movieListController', function($scope, $location, $rootScope, commentGraph) {
    //request the relevant information from the server via socet io and append it to the page
    //emmiting cs-movielist event and then listening for sc-movielist from the server


    // if ($scope.movies === undefined) { } //deprecated
    /**** Load movieList ****/// each time homepage is loaded
    console.log('fetching movies'); //test
    socket.emit('cs-movielist');
    socket.on('sc-movielist', function(data) {
      console.log("TEST inside sc-movielist", data);

      //save the data to a variable for ng-repeat
      $scope.$apply(function() { //re-renders page when data comes in
        $rootScope.movies = data.videos; //this once 
        console.log("TEST inside sc-movielist", data);
      }); //apply
    }); //socket.on(sc-movielist)


    //make a function that transmits the movie id and routes user to the video page
    //it takes in the videoId as it's only argument
    $scope.select = function(id) {
      $location.path('/video/' + id);
      console.log('Clicked on Movie', id);
    };
    //get the length in human readable format while inside ng-repeat
    $scope.getLength = function(movie) {
      // console.log('HERE---->',movie);
      if (movie.duration === undefined) {
        movie.formatedLength = 'Length not provided';
        return;
      };
      var length = (movie.duration / 60).toString().split('.');
      // console.log('THIS IS LENGTH', length);
      var hours = 0;
      var minutes = parseInt(length[0]);
      var seconds = movie.duration % 60;
      if (minutes > 59) {
        hours = Math.floor(minutes / 60);
        minutes = minutes % 60;
      }
      if (minutes < 10) {
        minutes = '0' + minutes.toString();
      }
      if (seconds < 10) {
        seconds = '0' + seconds.toString();
      }
      movie.formatedLength = hours.toString() + ':' + minutes.toString() + ':' + seconds.toString();

      // return hours.toString() + ':' + minutes.toString() + ':' + seconds.toString();

    };

  })

//Unecessary factory for now
// .factory('homeFactory',function(){
//   var movie = 'This is where the displayed movies will show';
//   return {
//     movie: movie
//   }
// });
