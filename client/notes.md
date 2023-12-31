`imr`

```js
import React from 'react';
```

`imrd`

```js
import ReactDOM from 'react-dom';
```

`rafce`

```js
import React from 'react';

const UpdatePage = () => {
  return <div>UpdatePage</div>;
};

export default UpdatePage;
```

# React

## Controlled Inputs

Adding a `value` attribute an input element turns the input element into a **controlled input**

Change the `value` attributes to `defaultValue` attributes. This allows the input component to be changed to something else, while also allowing you to give the input a default value.

# Bugs

This was a hard to find bug for me. The titles were not getting updated but the definition were.

```js
const handleSubmit = async (e) => {
  e.preventDefault();
  const updateIdiom = await IdiomFinder.put(`/${id}`, {
    title, //      ->   title_old: title,
    titleNew, //   ->   title_new: title,
    definition,
  });
  console.log(`title: ${title}`);
  navigate(`/`);
};
```

- State updates in React are asynchronous, and the values of the state variables won't be updated immediately after the state-setting function is called. If you want to log the state values after they are updated, you can use the useEffect hook with a dependency on the state variables.
