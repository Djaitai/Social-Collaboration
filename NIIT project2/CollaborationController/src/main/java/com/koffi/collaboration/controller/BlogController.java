package com.koffi.collaboration.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.koffi.collaboration.domain.Blog;
import com.koffi.collaboration.service.BlogService;

import util.Date_Time;

@RestController
public class BlogController {
    Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	private BlogService blogService;
	
	@Autowired
	private Blog blog;
	
	@Autowired
	private HttpSession session;
	
	
	@PostMapping("/addBlog")
	public ResponseEntity<Blog> addBlog(@RequestBody Blog blog)
	{
		logger.info("Blog Recieved");
		blog.setStatus("Submitted");
		blog.setUsername(session.getAttribute("username").toString());
		Date_Time dt = new Date_Time();
		String date = dt.getDateTime();
		blog.setDate_time(date);
		boolean value = blogService.addBlog(blog);
		
		if(value == true)
		{
			logger.info("Blog added successfully");
			blog.setErrorCode("100");
			blog.setErrorMessage("Blog has been added");
		}
		else
		{
			logger.info("Blog has not been added");
			blog.setErrorCode("404");
			blog.setErrorMessage("Adding Blog Unsuccessful");
		}
		return new ResponseEntity<Blog>(blog, HttpStatus.OK);
	}
	
	@GetMapping("/admin_getAllBlogs")
	public ResponseEntity<List<Blog>> getAllBlogs()
	{
		List<Blog> list = blogService.getAllBlogs();
		if(list.isEmpty())
		{
			blog.setErrorCode("100");
			blog.setErrorMessage("No blogs are available");
		}
		
		blog.setErrorCode("200");
		blog.setErrorMessage("Success");
		System.out.println("in get admin all blogs...................");
		return new ResponseEntity<List<Blog>>(list, HttpStatus.OK);
	}
	
	
	
	@GetMapping("/getBlog-{title}")
	public ResponseEntity<Blog> getBlog(@PathVariable ("title") String title)
	{
		System.out.println("Name - "+title);
		blog = blogService.getBlog(title);
		if(blog == null)
		{
			blog = new Blog();
			blog.setErrorCode("100");
			blog.setErrorMessage("Blog is not available");
		}
		else
		{
			blog.setErrorCode("200");
			blog.setErrorMessage("Blog Details retrieved");
		System.out.println("enter into get blog by title.................");
		}
		return new ResponseEntity<Blog>(blog, HttpStatus.OK);
	}
	
	
	
	@PostMapping("/admin_approveBlog")
	public ResponseEntity<Blog> approveBlog(@RequestBody Blog blog)
	{
		logger.info("Blog recieved");
		String title = blog.getBlog_title();
		blog = blogService.getBlog(title);
		blog.setStatus("Approved");
		boolean value = blogService.approveBlog(blog);
		if(value == true)
		{
			logger.info("Blog approved successfully");
			blog.setErrorCode("100");
			blog.setErrorMessage("Blog has been approved");
		}
		else
		{
			logger.info("Blog has not been approved");
			blog.setErrorCode("404");
			blog.setErrorMessage("Approving Blog Unsuccessful");
		}
		return new ResponseEntity<Blog>(blog, HttpStatus.OK);
	}
	
	@PostMapping("/admin_rejectBlog")
	public ResponseEntity<Blog> rejectBlog(@RequestBody Blog blog)
	{
		logger.info("Blog recieved");
		String title = blog.getBlog_title();
		blog = blogService.getBlog(title);
		blog.setStatus("Rejected");
		boolean value = blogService.approveBlog(blog);
		if(value == true)
		{
			logger.info("Blog rejected successfully");
			blog.setErrorCode("100");
			blog.setErrorMessage("Blog has been rejected");
		}
		else
		{
			logger.info("Blog has not been rejected");
			blog.setErrorCode("404");
			blog.setErrorMessage("Rejecting Blog Unsuccessful");
		}
		return new ResponseEntity<Blog>(blog, HttpStatus.OK);
	}
}
