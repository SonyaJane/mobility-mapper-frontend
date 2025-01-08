# Mobility Mapper Frontend

Mobility Mapper is a route finder and navigation app for users of wheelchairs, mobility scooters, tricycles and other wheeled mobility devices (referred to as wheelers). 

This repository is the frontend of Mobility Mapper.

Sends a POST request to the OpenRouteService API with inputs in JSON format. 
Gets a route with details...

## Pages

### Rider Profile

1. Name (String)
2. Date of birth (Date)
3. Email Address (Email string)
4. Rider weight (for calculating most energy efficient route) (Integer, Kg or Stones and lbs)
5. Profile photo (Image)
6. Saved locations (Strings)

### Device profile

A user can have more than one device

1. Mobility device

**Options**

- Manual wheelchair
- Powered wheelchair max speed 4mph
- Powered wheelchair max speed 8mph
- Mobility scooter max speed 4mph (Class 2)
- Mobility scooter max speed 8mph (Class 3)
- Ticycle, manual
- Tricycle, Electric

**Notes**

a. A mobility scooter or powered wheelchair is in:

- class 2 if it has a maximum speed of 4mph or less
- class 3 if it has a maximum speed of 8mph

b. Mobility scooters and powered wheelchairs in class 2 and 3 can be used:

- on pavements and other pedestrian areas
- on cycle tracks

Class 3 mobility scooters and powered wheelchairs can also be used on the road.

c. Mobility scooters and powered wheelchairs in class 2 and 3 cannot be used on cycle lanes.

2. Device weight (Integer, Kg or Stones and lbs)

3. Device width (Float 2dp, cm or inches)

4. Device length (Float 2dp, cm or inches)

## Plan Route 

## Inputs
1. Choose mobility device

2. Choose start location
- Search place or address
- Use current location
- Click point on map
- Select from saved places

3. Choose destination

- Search place or address
- Use current location
- Click point on map
- Select from saved places

4. Option to add another destination

5. Maximum incline

6. Select 
    - shortest route
    - most energy efficient route
    - show both

Find accessible routes

## Outputs

Use Jest for automatic testing

## JavaScript Structure

| Function | Action |
|----------|--------|
|  |  |
|  |  |
|  |  |
|  |  |

## Open Route Service

### Profiles

The available profiles relevant to Mobility mapper are:

wheelchair 
foot-walking
cycling-road
cycling-mountain
cycling-electric 

Other profiles:

driving-car
driving-hgv        
foot-hiking
public-transport

Returns:

An encoded polyline is a compressed format used to represent a series of geographic points (latitude and longitude) as a compact string of characters. This encoding significantly reduces the amount of space needed to store or transfer path information.

## Nominatim
Use API to get LatLon from text search

## Development Log

1. Created repository on GitHub
2. Created local mobility-mapper-frontend folder
3. Created README.md 
4. Initiated local git repo and pushed to remote
5. Created .gitignore
6. Install Jest for JavaScript testing:

    `npm init`

    Keep all defaults except enter supply Jest as the testing command.
    Creates a package.json file 
    Install Jest:
    
    `npm install --save-dev jest`

Install the DOM test environment
    `npm install jest-environment-jsdom --save-dev`
Test installation
    `npm test`
7. Create folders and files for code
8. Add initial HTML code
9. Create "Plan Route" page structure with title, mobility device, start location, destination location, find route button, and div placeholder for map.
10. Create toggle view of device options on click
11. Create Start location section
    
11. Create a function to make an API post request
12. Create a function to display the data: turn the response into json and then call the appropriate function or throw an error if the  
response doesn't return okay. 
11. Use the formData object to get the form data
