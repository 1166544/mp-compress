function isDef(n){return null!=n}function isObj(n){var t=typeof n;return null!==n&&("object"===t||"function"===t)}function isNumber(n){return/^\d+$/.test(n)}export{isObj,isDef,isNumber};