## Ideal for causing side effects
- ComponentDidMount
- ComponentDidUpdate

```javascript
### Loading components/routes lazily (on demand):
Webpack will then generate a smaller bundle.js, and then add n.chunk.js lazily.

use new HOC:
```javascript
import React, { Component } from 'react';

const aysncComponent = (importComponent) => {
  return class extends Component {
    state = {
      component: null
    }

    componentDidMount () {
      importComponent()
        .then(cmp => {
          this.setState({component: cmp.default});
        });
    }
    render () {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }
}

export default aysncComponent;
```

It's used like this:

```javascript
javascript
const AsyncNewPost = asyncComponent(() => {
    // dynamic import syntax, whatever it's passed here v, it's only imported when that function is executed
    return import('./NewPost/NewPost');
});
```
