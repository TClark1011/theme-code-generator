# Todo

## 1.0

- [x] Refactor presets to have a 'group' field
- [x] Remove 'mantine' group from color drop down
- [x] Replace color palettes with the ones from tailwind
- [x] Show mini code preview next to the code form
- [x] Find better title font
- [ ] Write better landing page text
- [ ] Come up with better title
- [ ] Refactor so all 'scales' are in the 'code-generation' folder
- [x] Additional custom label (eg; for color you want to have `color-primary` instead of just `color`)
- [x] Proper color shade keys
- [x] JS Array/Object presets
- [x] If 'show key' is disabled, change the label for the 'keyValueSeparator' field to read 'value prefix' and make sure its not disabled
- [x] Repeat above step but for 'show label'
- [x] `lineBreakAfterPrefix` and `lineBreakBeforePostfix` toggles in code form
- [ ] Fix bug where code form reverts to selected preset when its form step is entered
- [ ] Analytics
  - If you are having trouble deciding, you can start by implementing the groundwork for analytics with this (https://github.com/davidwells/analytics) which then lets you hook it up to an actual analytics provider later
  - This one looks like it might be the best https://plausible.io/
- [ ] Favicon
- [ ] Page Metadata
- [x] Change the code rule form so that by default you can only see the top 3 inputs, you have to manually open the form to enter custom values
- [ ] Do not allow for no prefix to be selected, add 'blank' prefix

## Potential Future Features

- Tests
- Semantic Versioning
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
- Replace the 'line rules' system with a template string system
  - eg; You define a line for css variables with `--{label}-{key}: {value}px;`
  - So we sub in the actual values for `{label}`, `{key}` and `{value}`
