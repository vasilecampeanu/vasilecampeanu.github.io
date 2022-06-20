---
title: "React Quick Start"
description: "In this blog post I will present how to get started with react.js."
date: 2022-06-20T11:27:59+03:00
tags: [ "jsx", "react" ]
categories: [ "dvse", "web" ]
draft: false
---

# What is React?
React is a **free** and **open-source** front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta (formerly Facebook) and a community of individual developers and companies. React can be used as a base in the development of single-page, mobile, or server-rendered applications with frameworks like **Next.js**.

# Why Use React?
React JS allows complete flexibility to the developer. You can use it for creating **SPAs**, **mobile** or **hybrid apps**, even a **TV application**. You can add as many external libraries and tools as required and build a massive, complicated web application. ReactJS will ensure your app performance is optimized.

<br>

React JS is the **most popular** JS library in today’s times. Even after years of its release, it is consistently used by web developers. It is the best JavaScript **UI library** for creating and maintaining views.

<br>

The two main features that make React more than just a library are **JSX** and **Virtual DOMs**.

<br>

**JSX** or **JavaScript** extension combines HTML syntax with JavaScript making it easier for developers to interact with the browser.

<br>

**Virtual DOM** is a virtual copy of the DOM tree created by web browsers that React creates for simplifying the process of keeping track of updates in real-time.

<br>

{{< callout warning >}}
**Main features:**
- React is Easier to Learn Compared to Angular
- React Has a Large Development Community
- React Offers Reusable Components
- JSX increases the performance and efficiency of ReactJS
- Efficient Debugging and Error-checking With Unidirectional Data Flow
- Redux Maintains Data Consistency Across all Components
- React Hooks
{{< /callout >}}


# Create React App

{{< callout info >}}
**Requirements:**
<br>
You’ll need to have **Node >= 14.0.0** and **npm >= 5.6** on your machine.
{{< /callout >}}

**Create React App** is a comfortable environment for learning React, and is the best way to start building a new **single-page application** in React.

To create a new react app go to a directory where you want to save the project and run the following command in your terminal:

```bash
npx create-react-app my-app
```

# Preview
Now, you should have a quickstart folder. To visualize your application run the following commands.

```bash
cd my-app
npm start
```

# First React Application
You should get something similar:

{{< react-quickstart >}}

# Deployment
When you’re ready to deploy to production, running **npm run build** will create an optimized build of your app in the build folder. You can learn more about Create React App from its README and the User Guide.