# Starlink Tracker (Angular)

tThis personal project is an Angular redesign of a [previous Starlink Tracker application](https://github.com/Daniel-Y-Yun/Starlink-Tracker) I had developed with a team.\
It is designed to collect and display data, such as the location (i.e. Latitude and Longitude), elevation, and speed, of individual satellites from the Starlink satellite constellation. The satellites are broken down into groups by their launch dates.\
Users have the option of visualizing this data in a detailed table format or on a globe map. In the map visualization, users can select a single satellite to see it’s x,y,z coordinates as well as its corresponding x,y,z velocities. The map also includes a feature to track that satellite’s path.

## Data

The Starlink satellite TLE is gathered from the [N2YO.com api](https://www.n2yo.com/api).\
Each TLE request requires the NORAD id for a satellite. These ids were gathered and grouped by launch date from a python program that scrapes [N2YO.com's table](https://www.n2yo.com/satellites/?c=52) of currently active Starlink satellites.

## License

[MIT](https://choosealicense.com/licenses/mit/)
