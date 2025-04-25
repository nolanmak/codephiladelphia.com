document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch Meetup events
    function fetchMeetupEvents() {
        const eventsContainer = document.getElementById('upcoming-events');
        if (!eventsContainer) return;
        
        // Show loading state
        eventsContainer.innerHTML = '<div class="loading">Loading upcoming events...</div>';
        
        // Fetch events from our proxy endpoint
        fetch('/api/meetup-events')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(html => {
                // Parse the HTML response
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                
                // Extract upcoming events
                const eventElements = doc.querySelectorAll('.eventCard');
                
                if (eventElements.length === 0) {
                    eventsContainer.innerHTML = '<p>No upcoming events found. Check back soon!</p>';
                    return;
                }
                
                // Clear loading message
                eventsContainer.innerHTML = '';
                
                // Display up to 3 upcoming events
                const maxEvents = Math.min(eventElements.length, 3);
                
                for (let i = 0; i < maxEvents; i++) {
                    const eventElement = eventElements[i];
                    
                    // Extract event details
                    const titleElement = eventElement.querySelector('.eventCardHead--title');
                    const dateElement = eventElement.querySelector('.eventTimeDisplay-startDate');
                    const timeElement = eventElement.querySelector('.eventTimeDisplay-startTime');
                    const locationElement = eventElement.querySelector('.venueDisplay-venue-address');
                    const linkElement = eventElement.querySelector('a.eventCard--link');
                    
                    const title = titleElement ? titleElement.textContent.trim() : 'Untitled Event';
                    const date = dateElement ? dateElement.textContent.trim() : '';
                    const time = timeElement ? timeElement.textContent.trim() : '';
                    const location = locationElement ? locationElement.textContent.trim() : 'Location TBA';
                    const link = linkElement ? 'https://www.meetup.com' + linkElement.getAttribute('href') : 'https://www.meetup.com/code-coffee-philly/';
                    
                    // Create event card
                    const eventCard = document.createElement('div');
                    eventCard.className = 'event-card';
                    eventCard.innerHTML = `
                        <h3>${title}</h3>
                        <p class="event-date">${date} at ${time}</p>
                        <p class="event-location">${location}</p>
                        <a href="${link}" target="_blank" class="event-link">View Details</a>
                    `;
                    
                    eventsContainer.appendChild(eventCard);
                }
                
                // Add a "View All" link
                const viewAllLink = document.createElement('div');
                viewAllLink.className = 'view-all-events';
                viewAllLink.innerHTML = '<a href="https://www.meetup.com/code-coffee-philly/events/" target="_blank">View All Events</a>';
                eventsContainer.appendChild(viewAllLink);
            })
            .catch(error => {
                console.error('Error fetching Meetup events:', error);
                eventsContainer.innerHTML = '<p>Unable to load events. Please check <a href="https://www.meetup.com/code-coffee-philly/" target="_blank">our Meetup page</a>.</p>';
            });
    }
    
    // Call the function to fetch and display events
    fetchMeetupEvents();
});