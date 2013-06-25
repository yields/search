
# search

  list input search.

## Installation

  Install with [component(1)](http://component.io):

    $ component install yields/search

## Example

```html
var input = query('input');
var one = query('ul.one');
var two = query('ul.two');
var search = new InputSearch(input);

// add lists

search
.add(one)
.add(two);
```

## API

### SearchInput(el)

Initialize `SearchInput` with `<input>`.

### .bind()

Bind internal events.

### .unbind()

Unbind internal events.

### .add(NodeList|Element)

Add a `NodeList` or `Element` that has `.children` to search in.

### .cache()

Cache elements, the method is called after you add `Element` or `NodeList`.

### .use(fn)

Change the algorithm to `fn(str, term)`, by default a naive `index(str, term)` is used.

### .match(term)

Search `term`, the method will use `fn(str, term)` to add / remove `.hide` or `.show` classes.

## License

  MIT
