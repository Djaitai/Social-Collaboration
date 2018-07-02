app.controller('ForumController', function($scope, $location, ForumService, $rootScope) {
	console.log("Entering Forum Controller")

	$scope.forum = {
		id : '',
		forum_id : '',
		username : '',
		status : '',
		rejected : '',
		date_time : '',
		content : ''
	};
	$scope.forumReply= {reply_id:'', forum_id:'',  postedAt:'', reply:'',rating:'', username:''};

	$scope.forums = [];
	$rootScope.replies = [];

	$scope.message;
	
	$scope.addForum = function() {
		console.log("Entering Add Forum")
		ForumService.addForum($scope.forum).then(function(response) {
			alert("Forum added. Wait for admin approval")
			console.log("Add Forum Success " + response.status)
			$location.path("/viewForums")
		});
	}
	
	
	
	
	
	listForum = function()
	{
		console.log("Entering List Forum Method")
		ForumService.listForum()
		.then
		(
			function(response)
			{
				console.log("Forum List Retrieved "+response.status)
				$scope.forums = response.data;
			}
	)}
	listForum();
	
	
	
	
	
	
	
	$scope.getForum = function(id)
	{
		console.log("Entering Get Forum "+id)
		ForumService.getForum(id)
		.then
		(
			function(response)
			{
				console.log("Forum Recieved")
				$location.path("/viewForum")
			}
		)
		ForumService.getForumReply(id)
		.then
		(
			function(response)
			{
				console.log("Get Comments for "+id)
				$scope.replies = response.data;
				console.log("-------------------------------")
				console.log($scope.replies)
				
				
			}
		)
	}
	
	
	
	$scope.addReply = addReply
	function addReply(id)
	{
		console.log(id)
		$scope.forumReply.forum_id = id;
		ForumService.addForumReply(id, $scope.forumReply)
		.then
		(
			function(response)
			{
				console.log("Forum COmment added "+response.status)
			}
		)
		ForumService.getForum(id)
		.then
		(
			function(response)
			{
				$scope.forum=response
				console.log("Forum Recieved")
			}
		)
		ForumService.getForumReply(id)
		.then
		(
			function(response)
			{
				console.log("Get Comments for "+id)
				
				$scope.replies=response.data
				console.log("this is replies.........")
				console.log($scope.replies)
			}
		)
		$location.path("/fmred")

	}
})
