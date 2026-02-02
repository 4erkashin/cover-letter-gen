# Definition of Done for this project

- [ ] Code is written
- [ ] No changes to the code needed
- [ ] App is deployed to the Vercel

## Code part

### Routing

- [x] Home page is accessible via `/` route
- [x] Create new application page is accessible via `/application/new` route
- [x] Application details page is accessible via `/application/:id` route
- [ ] 404 page
  - [x] Implemented by default Next.js 404 page
  - [ ] Nice to have: custom 404 page
- [ ] Nice to have redirect from `/application` to `/`

### Layout

- [x] App Header is visible on all pages
- [x] Create application and application details pages shares the same layout

### App Header

- [ ] Contains:
  - [x] App Logo
  - [ ] progress indicator
  - [x] Home button

#### Implementation details

- [x] App Logo
  - [x] Svg handled via reshaped recommended way: svgr + Icon component
  - [x] Component consists of svg icon with circle and svg icon with text
  - Caveat: Icon component suited for square icons only, so custom stuff like [app-logo-text](./components/app-logo/app-logo-text.svg) should be handled with CSS without passing to the Icon component

- [x] Home button
  - [x] Link from next/link passed via render prop, preserving reshaped button behavior, adding client side navigation without manual call of router.push

- [ ] Progress indicator
  - [x] Pure UI, only receives current and total and then renders via composition
  - [ ] Has composable Item, that can be filled to indicate progress

### Home page

- [ ] Contains:
  - [ ] title
  - [ ] button to create new application
  - [ ] horizontal separator

- [ ] Can show:
  - [ ] list of application previews
  - [ ] hit the goal widget

### Create new application page

- [ ] Contains:
  - [ ] title
  - [ ] form consisting of:
    - [ ] text input for job title
    - [ ] text input for company name
    - [ ] text input for skills (i'm good at)
    - [ ] text area for additional details
    - [ ] submit button
  - [ ] area for generated cover letter

### Application details page

- [ ] Contains:
  - [ ] title
  - [ ] form same as on the create new application page
    - [ ] submit is now regenerate with different style
  - [ ] area for generated cover letter, same as on the create new application page

- [ ] Can show:
  - [ ] application details
  - [ ] button to edit application
  - [ ] hit the goal widget

### Shared UI

#### Progress indicator

- [ ] Used in
  - [ ] App Header
  - [ ] Hit the goal widget

#### Create application button

- [ ] Used in
  - [ ] Home page
  - [ ] Hit the goal widget

#### Hit the goal widget

- [ ] Used in
  - [ ] Application details page
  - [ ] Home page

#### Card with actions bar

- [ ] Used in
  - [ ] Home page to show application preview
  - [ ] Application details page to show generated cover letter

#### Form

- [ ] Used in
  - [ ] Create new application page
  - [ ] Application details page
