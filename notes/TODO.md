# Todo

## 1.0

- [x] Refactor presets to have a 'group' field
- [x] Remove 'mantine' group from color drop down
- [x] Replace color palettes with the ones from tailwind
- [ ] Show mini code preview next to the code form
- [ ] Find better title font
- [ ] Write better landing page text
- [ ] Come up with better title
- [ ] Refactor so all 'scales' are in the 'code-generation' folder
- [x] Additional custom label (eg; for color you want to have `color-primary` instead of just `color`)
- [x] Proper color shade keys
- [ ] JS/TS Array/Object presets

## Potential Future Features

- Change how the units/presets for code generation form works to make it more intuitive
- Typography scale
  - Font size/weight for different title levels
  - Font families for titles/body
  - Maybe there is some kind of font pair API for generating good font pairings?
- Serialise state into URL params to allow for sharing
  - Rather than storing individual state pieces in their own url params, could look into a way to serialize/compress the whole state object into a short(ish) string which then gets saved in a single URL param
  - May be easiest to stringify the state object with `telejson` and then compress/encrypt it
- Multiple Theme Scales At once (eg; you could have multiple different colors)
  - UI could be done by having tabs with each scale in a different tab
  - The generated cod would now longer be shwon in the stepper and instead in a modal which is opened via a button underneath the stepper
