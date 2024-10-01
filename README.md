
# Stroll Assignment
## Local Setup

To setup this project locally, follow these commands

- Install MeteorJs
```bash
  npm install -g meteor@2.8.1
```
- Clone this repository and cd into it
- Run this command
```bash
  meteor npm i
```
- After successful installation, run this command to start the application on localhost
```bash
  npm start
```

## Approach

This assignment focuses on building a question rotation system where different questions are assigned to users based on their region and a predefined cycle. The system ensures that questions rotate per region over configurable cycles, enabling users in different locations to receive different questions at different times.

We will use APIs to handle the management of questions, regions, and cycles, allowing scalability and flexibility for millions of users across various regions. Here is a detailed explanation of the strategy used to implement the system.

To solve the problem of assigning questions based on region and cycle, here’s a step-by-step approach:

### Database Schema
- Cycles Collection (cycle)
```bash
  _id: String (Primary Key)
  name: String
  startDate: DateTime
  endDate: DateTime
  duration: Integer
```
- Regions Collection (region)
```bash
  _id: String (Primary Key)
  name: String
```
- Questions Collection (question)
```bash
  _id: String (Primary Key)
  title: String
  cycleId: String (Foreign Key)
  regionId: String (Foreign Key)
```
### API Strategy & Design
- #### createQuestion(title, regionName, cycleName)

Purpose: 
This API is used to create a new question and associate it with a specific region and cycle.

Steps: 
- Fetch the regionId using the regionName from the database.
- Fetch the cycleId using the cycleName.
- Insert the question into the database with the provided title, associated region, and cycle.
Return: The created question id.


- #### createRegion(name)

Purpose: This API is responsible for creating a new region in the system.

Steps:
- Insert the region’s name into the region collection.

Return: The regionId of the newly created region.

- #### createCycle(name, startDate, endDate, duration)

Purpose: This API is responsible for creating a new cycle with a defined duration and start/end dates.

Steps:
- Insert the cycle details (name, startDate, endDate, duration) into the cycle collection.

Return: The cycleId of the created cycle.

- #### getQuestion(regionName, date)

Purpose: This API retrieves the question for a user based on their region and the current cycle.

Steps:
- Fetch the regionId based on the regionName.
- Identify the current cycle by checking which cycle matches the given date using startDate and endDate.
- Query the database for questions tied to the specific region and cycle.

Return: A list of questions assigned to the region and cycle, or an empty list if no question is found.

- #### getAllRegions()

Purpose: This API retrieves all available regions in the system.

Steps:
- Fetch all records from the region collection.

Return: A list of all regions.

- #### getAllCycles()

Purpose: This API retrieves all available cycles in the system.

Steps:
- Fetch all records from the cycle collection.
  
Return: A list of all cycles.

### Design Considerations
#### Data Model
- Regions: Represent geographical areas that help segregate users and assign region-specific questions. Each user belongs to a region.
- Cycles: Define the time period for which a specific question is active in a region. Cycles can be configured to be weekly, daily, or any custom duration, which makes the system highly flexible.
- Questions: Each question is tied to a specific region and cycle. This ensures region-specific rotations for users.

#### Flexibility
The system allows for different cycle durations (e.g., 7 days, 14 days, etc.), which makes it adaptable to different product requirements. The logic to determine which question is active for a user is based on querying the current cycle and region, ensuring all users in a region get the same question.

#### Potential Improvements
- Caching: Using a cache layer like Redis for storing the current question assignment for a region and cycle reduces the need for repetitive queries and improves response times.
- Load Balancing: Distribute incoming requests across multiple servers, ensuring the system can scale with high user volume.
- Loaction based fetching: Implementing a location detection system, to automatically map a user to their region.

### Important note
- For better logic testing, I have implemented a manual setting of region and cycle for querying questions. This can further be improved by detecting location and cycle automatically from the system. For time being, I have kept it manual for better testing experience.

### The application demo can be found here
```bash
http://98.83.1.193
```
