This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

I have also used [Typescript](https://www.typescriptlang.org/) for better type-safe code and [Tailwind](https://tailwindcss.com/) for styling.

A live version is deployed on http://65.1.208.19:3000/

## Visualization library

The visualization library used here is [recharts](https://recharts.org/en-US/).

The reason I chose this library is that it is lightweight and works well with React. It is also highly customizable and has animation support.

## Implementation points

For the project structure I used separate folders for each React component and subfolders within those folders for sub-components.

I used [Material-UI](https://mui.com/material-ui/) for the components as they provide very clean looking React-based components with nice animation effects for interactivity.

For coloring the line graphs I used a random color choosing algorithm which chooses a color at random which contrasts well with the white background.

## Other possible improvements

There were other improvements which could have been done but I skipped due to lack of time.

### Responsiveness

Right now, on mobile devices I move around the chart controls from the left to the top and make it a bit smaller. But you could actually have a sliding chart control and free up the screen space exclusively for the chart.

### Chart coloring

A more complicated color choosing algorithm can be chosen. While the colors are distinct for each field, since it is random, a few colors might be too similar for the human eye (even if technically they are different colors). 

Ideally, the colors should be manually chosen and sent via the API, rather than automatically generated. 

There are a huge number of occupations so choosing colors for all of them might be difficult. What could be done is lumping occupations together to decrease the number of occupations. For example all occupations related to education and teaching can be under **"Education"**.

### Animation

Recharts does support animated charts but to have them working properly would mean having to manipulate the data in a specific manner in line with the way Recharts' animations expect.

