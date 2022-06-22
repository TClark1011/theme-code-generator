# Todo

## 1.0

- [ ] Remove 'mantine' group from color drop down
- [ ] Show mini code preview next to the code form
- [ ] Find better title font
- [ ] Write better landing page text
- [ ] Come up with better title
- [ ] Refactor so all 'scales' are in the 'code-generation' folder

## Potential Future Features

- Change how the units/presets for code generation form works to make it more intuitive
- Typography scale
  - Font size/weight for different title levels
  - Font families for titles/body
  - Maybe there is some kind of font pair API for generating good font pairings?
- Serialise state into URL params to allow for sharing
  - Rather than storing individual state pieces in their own url params, could look into a way to serialize/compress the whole state object into a short(ish) string which then gets saved in a single URL param
  - May be easiest to stringify the state object with `telejson` and then compress/encrypt it
