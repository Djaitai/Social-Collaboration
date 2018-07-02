package com.koffi.collaboration;

import static org.junit.Assert.assertEquals;

import java.util.Date;

import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.koffi.collaboration.dao.EventDAO;
import com.koffi.collaboration.domain.Event;

public class EventTestCase {
	
	private static AnnotationConfigApplicationContext context;
	
	//@Autowired
	//private static Event event;
	
	@Autowired
	private static EventDAO eventDAO;
	
	@BeforeClass
	public static void init()
	{
		context = new AnnotationConfigApplicationContext();
		
		context.scan("com.koffi");
		context.refresh();
		
		eventDAO =(EventDAO) context.getBean("eventDAO");
		//event = (Event)context.getBean("event");
	}

	@Test
	public void saveEventTestCase() {
		Event event = new Event();
		event.setDate(new Date());
		event.setEvent_date("20/06/2018");
		event.setEvent_description("My event");
		event.setEvent_time("10:20");
		Boolean status = eventDAO.addEvent(event); 
		assertEquals("Save event",true, status);
	}

}
