app.controller('JobController', function($scope,$location,JobService)
{
	console.log("Entering Job Controller")
	$scope.jobs;
	$scope.job;
	
	$scope.job={job_id:'', title:'', username:'', status:'', position:'', company:'', description:'', salary:'', location:'', qualification:'' , date:'', vacancy:''};
	$scope.message;
	$scope.myJobs;

	//LIST JOB FUNCTION
	listJob=function()
	{
		console.log("Entering List Job Method")
		JobService.listJob()
		.then
		(
				function(response)
				{
					console.log("List Job Success "+response.status)
					$scope.jobs=response
				}
		)}
		listJob();
	
	//ADD JOB METHOD IN JOB CONTROLLER
	$scope.addJobs=function()
	{
		console.log("Add Job Started")
		JobService.addJob($scope.job)
		.then
		(
				function(response)
				{
					console.log("Add Job Success "+response.status)
					alert("Job has been added")
					$location.path("/admin")
				}
		);
	}
	
	
	
	//user applied job in job controller
	getAppliedJobs = function()
	{
		console.log("Getting Applied Jobs")
		JobService.getAppliedJobs()
		.then
		(
			function(response)
			{
				console.log("Applied Jobs Recieved")
				$scope.myJobs = response.data;
			}
		

	)}
	getAppliedJobs();
})