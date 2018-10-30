#My Neighborhood Map Project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Table of Contents

- [Getting Started / Credits](#getting-started-credits)
- [Installing](#installing)

##Getting Started / Credits

This was a big difficult project, and I would like to thank Carlos F. and Rodrick, for 
taking time to work with me and give me support.

I also watched several walk throughs that influenced some of the design, by Forrest, 
Doug Brown and one of the EMEA talks.

I opted to use Foursquare, Google Maps, and write my own interface.  Wow, I had no idea 
how long that would take, but it was a chance to learn.  I also used dotenv, and later 
learned that it was already built in.  I used Materialize, and have found out how unstable
the react version is, and how many bugs need to be squashed.  I had planned on using the 
toast for the errors, but didn't have the time to track down the issues so went with alerts.

I don't feel like this is a finished project as I have a lot I would like to refactor and 
improve, but there comes a time you have to ship.

##Installing

Download the source from my github account.
Add the .env file to the root directory.

```
npm install
```

Setup a Google Account and get a key.

Get a key from Foursquare.

```$xslt
npm start
```

For a production version, run 

```$xslt
npm run build
```

then to run it type

```$xslt
npx serve -s build
```





