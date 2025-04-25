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
                
                // Extract upcoming events from JSON-LD script tags
                const scriptTags = doc.querySelectorAll('script[type="application/ld+json"]');
                let events = [];
                
                scriptTags.forEach(script => {
                    try {
                        const jsonData = JSON.parse(script.textContent);
                        if (Array.isArray(jsonData)) {
                            // Filter for Event type objects
                            const eventObjects = jsonData.filter(item => item['@type'] === 'Event');
                            events = events.concat(eventObjects);
                        }
                    } catch (e) {
                        console.error('Error parsing JSON data:', e);
                    }
                });
                
                if (events.length === 0) {
                    eventsContainer.innerHTML = '<p style="color: #000000;">No upcoming events found. Check back soon!</p>';
                    return;
                }
                
                // Sort events by date
                events.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
                
                // Clear loading message
                eventsContainer.innerHTML = '';
                
                // Display up to 3 upcoming events
                const maxEvents = Math.min(events.length, 3);
                
                for (let i = 0; i < maxEvents; i++) {
                    const event = events[i];
                    
                    // Format date and time
                    const eventDate = new Date(event.startDate);
                    const formattedDate = eventDate.toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    });
                    
                    const formattedTime = eventDate.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                    });
                    
                    // Get location
                    let location = 'Location TBA';
                    if (event.location && event.location.name) {
                        location = event.location.name;
                        if (event.location.address && event.location.address.addressLocality) {
                            location += ', ' + event.location.address.addressLocality;
                        }
                    }
                    
                    // Create event card
                    const eventCard = document.createElement('div');
                    eventCard.className = 'event-card';
                    eventCard.style.backgroundColor = 'white';
                    eventCard.style.borderRadius = '8px';
                    eventCard.style.padding = '15px';
                    eventCard.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
                    eventCard.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
                    
                    eventCard.innerHTML = `
                        <h3 style="margin-top: 0; color: #000000; font-size: 1.2rem;">${event.name}</h3>
                        <p style="margin: 8px 0; color: #000000; font-size: 0.9rem;">${formattedDate} at ${formattedTime}</p>
                        <p style="margin: 8px 0; color: #000000; font-size: 0.9rem;">${location}</p>
                        <a href="${event.url}" target="_blank" style="display: inline-block; margin-top: 10px; padding: 6px 12px; background-color: #59969B; color: white; text-decoration: none; border-radius: 4px; font-size: 0.9rem; transition: background-color 0.2s ease;">View Details</a>
                    `;
                    
                    eventsContainer.appendChild(eventCard);
                }
                
                // Add a "View All" link
                const viewAllLink = document.createElement('div');
                viewAllLink.style.textAlign = 'center';
                viewAllLink.style.marginTop = '15px';
                viewAllLink.innerHTML = '<a href="https://www.meetup.com/code-coffee-philly/events/" target="_blank" style="color: #000000; text-decoration: none; font-weight: bold;">View All Events</a>';
                eventsContainer.appendChild(viewAllLink);
            })
            .catch(error => {
                console.error('Error fetching Meetup events:', error);
                eventsContainer.innerHTML = '<p style="color: #000000;">Unable to load events. Please check <a href="https://www.meetup.com/code-coffee-philly/" target="_blank" style="color: #000000;">our Meetup page</a>.</p>';
            });
    }
    
    // Call the function to fetch and display events
    fetchMeetupEvents();
});