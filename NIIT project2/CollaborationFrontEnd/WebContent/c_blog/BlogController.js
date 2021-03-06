app.controller('BlogController', function($scope, $location, BlogService, $rootScope) {
	console.log("Entering Blog Controller")
	$scope.blogs = [];
	$rootScope.blogComments = [];
	$scope.blogComment = {
		id : '',
		blog_id : '',
		comment : '',
		postedAt : '',
		rating : '',
		username : ''
	};
	$scope.blog = {
		blog_id : '',
		blog_title : '',
		blog_description : '',
		username : '',
		status : '',
		date_time : '',
		rejected : '',
		errorMsg : '',
		errorCode : ''
	};

	$scope.addBlog = function() {
		console.log("Entering Add Blog")
		BlogService.addBlog($scope.blog).then(function(response) {
			alert("Blog Added. Waiting for admin approval")
			console.log("Add Blog Success " + response.status)
			$location.path("/viewBlogs")
		});
	}

	listBlog = function() {
		console.log("Entering List Blog Method-  controller")
		BlogService.listBlog().then(function(response) {
			console.log("List Blogs Successful " + response.status)
			$scope.blogs = response
		})
	}
	listBlog();

	$scope.getBlog = getSelectedBlog
	function getSelectedBlog(blog_title) {
		console.log("Entering Get blog " + blog_title)
		BlogService.getBlog(blog_title).then(function(response) {
			console.log("Get Blog Success " + response.status)
			console.log(response)
			$scope.blog = response;
		})
		BlogService.getComments(blog_title).then(function(response) {
			console.log("Get comments for " + blog_title)
			console.log(response.data)
			console.log(response)
			$scope.blogComments = response;
		});
		$location.path("/viewBlog")
	}

	this.addComment = addComment
	function addComment(blog_title) {
		console.log(blog_title)
		console.log($scope.blogComment.rating)
		$scope.blogComment.blog_id = blog_title;
		BlogService.addComments(blog_title, $scope.blogComment).then(
				function(response) {
					console.log("Add Blog Comment " + response.status)
				});
		BlogService.getBlog(blog_title).then(function(response) {
			console.log("Get Blog Success " + response.status)
			console.log(response)
			$scope.blog = response;
		})
		BlogService.getComments(blog_title).then(function(response) {
			console.log("Get comments for " + blog_title)
			console.log(response.data)
			console.log(response)
			$scope.blogComments = response;
		});

		$location.path("/cmred")

	}
})