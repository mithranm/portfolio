---
title: "Patriot Hacks 2024 Winner - TransitNest"
summary: "A hackathon-winning web application that helps users find affordable housing near public transportation by aggregating Zillow data and visualizing it on an interactive map."
image: "/images/transitnest.png"
imageAlt: "Screenshot of the TransitNest application"
order: 7
projectUrl: "https://devpost.com/software/transitnest"
tags: ["Hackathon", "React", "FastAPI", "Google Maps API", "Python", "AWS"]
---

### Inspiration

Our team was inspired by our own struggles to find affordable housing near work and school that was also conveniently located near public transportation. We wanted to create a tool to simplify this search.

### What It Does

TransitNest uses an aggregated dataset to find housing options near public transport. Users can input a destination ZIP code, and the application will display rental listings from the Zillow Public Research Data, plotting them on an interactive Google Map and showing the transit path from each listing to the destination.

### How We Built It

*   **Frontend:** We built the site with **React** and **Tailwind CSS**. We integrated the **Google Maps API** to display the map and plot transit routes. We also used `html2canvas` to allow users to screenshot the map.
*   **Backend:** We used the **FastAPI** Python framework to create endpoints for our frontend to query. The backend handles fetching data from Zillow and interfacing with the Google Maps Platform API.
*   **Deployment:** After running into environment variable issues with GitHub Pages, we successfully deployed the application on an **Amazon EC2 instance**.

### Challenges & Accomplishments

This project was a fantastic learning experience. For many of us, it was our first time using React, and we were proud to build a full-stack application with a clean integration between the frontend and backend. We successfully navigated a complex Git merge with no conflicts and solved several frontend and deployment challenges under pressure. We were thrilled to be recognized as winners for our efforts at the hackathon.

### What's Next

Future plans for TransitNest include integrating live data through partnerships and enhancing backend security to protect against API abuse and create a more robust user experience.