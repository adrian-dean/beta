---
title: React Hooks Fundamentals
description: A comprehensive guide to understanding and using React Hooks like useState, useEffect, and useRef.
technologies: [React, JavaScript]
date: 2023-11-20
---

React Hooks revolutionized how we write React components.

## `useState`

The `useState` hook allows you to add state to functional components.

```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## `useEffect`

`useEffect` lets you perform side effects in functional components.

```javascript
import React, { useState, useEffect } => {

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('[https://api.example.com/data](https://api.example.com/data)')
      .then(res => res.json())
      .then(data => setData(data));
  }, []); // Empty dependency array means it runs once on mount

  return (
    <div>
      {data ? <p>Data loaded: {data.message}</p> : <p>Loading...</p>}
    </div>
  );
}
```

It's crucial to understand the dependency array for `useEffect`.
