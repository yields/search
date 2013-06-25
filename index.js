
/**
 * dependencies
 */

var events = require('events')
  , classes = require('classes')
  , map = require('map')
  , slice = [].slice;

/**
 * Export `SearchInput`
 */

module.exports = SearchInput;

/**
 * Initialize `Input` with `el`.
 *
 * @param {Elemnet} el
 */

function SearchInput(el){
  if (!(this instanceof SearchInput)) return new SearchInput(el);
  this.events = events(el, this);
  this.els = [];
  this.el = el;
  this.bind();
}

/**
 * Bind internal events.
 *
 * @return {Search}
 */

SearchInput.prototype.bind = function(){
  this.events.bind('keyup');
  return this;
};

/**
 * Unbind internal events.
 *
 * @return {Unbind}
 */

SearchInput.prototype.unbind = function(){
  this.events.unbind();
  return this;
};

/**
 * Add `NodeList` or `el` to search in.
 *
 * @param {Element|NodeList} els
 * @return {SearchInput}
 */

SearchInput.prototype.add = function(els){
  els = slice.call(els.children || els);
  this.els = this.els.concat(els);
  this.cache();
  return this;
};

/**
 * Cache all items.
 *
 * @return {SearchInput}
 */

SearchInput.prototype.cache = function(){
  this._cache = map(this.els, 'textContent.toLowerCase();');
  return this;
};

/**
 * Use the given `algorithm`.
 *
 * @param {Function} fn
 * @return {SearchInput}
 */

SearchInput.prototype.use = function(fn){
  this._fn = fn;
  return this;
};

/**
 * on-keyup
 */

SearchInput.prototype.onkeyup = function(){
  this.match(this.el.value);
};

/**
 * Search all elemnets using `_fn(str, term)`.
 *
 * @param {String} term
 * @return {SearchInput}
 */

SearchInput.prototype.match = function(term){
  var fn = this._fn || index
    , items = this._cache
    , len = items.length;

  term = term.toLowerCase();

  for (var i = 0; i < len; ++i) {
    if (fn(items[i], term)) {
      classes(this.els[i]).remove('hide');
      classes(this.els[i]).add('show');
    } else {
      classes(this.els[i]).remove('show');
      classes(this.els[i]).add('hide');
    }
  }

  return this;
};

/**
 * default search.
 *
 * @param {String} str
 * @param {String} term
 * @return {Number}
 */

function index(str, term){
  return ~ str.indexOf(term);
};
