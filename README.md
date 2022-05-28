# Insert Cool Website Name

Team PHP: Hilarious Programmers

## Project Description

A crowdsourced (friendsourced) restaurant finder: Put a group of friends in a lobby together and have them vote yes/no on restuarants within X km. At the end, show the list that everyone voted yes on (or use some other metrics to determine a single winner).  

**Who is it for?**: Friends who want to go out to eat but do not know where.  

**What will it do?**: Display restaurants based on proximity to the users and collect their preferences for said restaurants.  

**What type of data will it store?**:  
* Account system for logging in
* For each account will save some statistics (logins, restaurants voted yes/no, blacklisted restaurants)
* For each group/lobby will save some statistics (previously visited restaurants)  

**What will users be able to do with this data?**:  
* Log into the app
* Invite other users to a restaurant group and start a voting session
* View their individual and group statistics  

**What is some additional functionality you can add/remove based on time constraints?**:  
* Group and individual statistics seem to be the easiest to remove as it doesn't impact the MVP much.  

## Project Task Requirements

### Detailed Task Breakdown
#### Front End Task Breakdown
##### Important HTML pages:
###### Lobby Pages
* Create/Settings page
* Results page
###### Individual User Pages:
* Individual selectors
* Enter lobby page
* Account info pages
* Restaurant info pages

##### General page styling
* One css file to keep design consistent across pages
* Styling file for each page for page-specific elements 
    * May be combined with the general page css with unique ids? May create unnecessarily complex DOM

##### Javascript file - functions as necesary

#### Backend Task Breakdown
##### Google Maps API
* Establish link with Google Maps API 
    * config files
    * Google API key
* Find all restaurants in specified radius from input location
* Get all data related to restaurants
    * Storing restaurant as object for future reference, i.e. restaurant preferences
* Filter restaurants by user parameters, i.e. type of food, cost

## Protoypes
