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

- [x] App Logo
  - [x] Svg handled via reshaped recommended way: svgr + Icon component
  - [x] Component consists of svg icon with circle and svg icon with text
  - Caveat: reshaped Icon component suited for square icons only,  
    so not square svg like [app-logo-text](./components/app-logo/app-logo-text.svg) should be handled with CSS without passing to the Icon component
  - [ ] Fits figma design

- [x] Progress indicator
  - [x] Uses shared [Progress indicator](#progress-indicator)
  - [x] Text "{current}/{total} generated"
  - [x] Current capped by total, so 6/5 becomes 5/5
  - [x] Dots to indicate progress
  - [x] Success icon if status is completed

- [x] Home button
  - [x] Uses shared [Link button](#link-button)
  - [x] No text, icon only
  - [x] Click navigates to the home page (pathname `/`) without reloading the page
  - [ ] Fits figma design

### Home page

- [ ] Header
  - [ ] Title
    - [x] Text "Applications"
    - [ ] Implemented as reshaped suggests for typography handling
    - [ ] Fits figma design

  - [x] Create application button
    - [x] Uses shared [Create application button](#create-application-button)

  - [x] Title and button are in a row with justify content set as space between
  - [x] Border bottom
  - [ ] Fits figma design

- [ ] Can show:
  - [ ] List of application previews
    - [ ] Condition: ls has at least one application

  - [ ] Hit the goal widget
    - [ ] Condition: amount of applications is less than total defined in the constants

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

- [x] Implemented via composition, to fit figma design where it used in two places with different layout and item styling
- [x] Has composable Item, that can be filled to indicate progress
  - Note: using index as a key, to render items in the progress indicator is ok.  
    The key is representing the item's identity (position in the progress indicator).  
    There is no identity except for the position in that case.
- [x] Can render success icon instead of items if status is completed
  - Note: built in intentionally, cuz there no evidence it can be customized for now. So, no premature abstractions.
- [x] Current amount of applications read from ls via custom hook, reactive to ls changes
- [ ] Ls key and total amount extracted to the constants
- [ ] Fits figma design

- Used in
  - [x] [App Header](#app-header)
  - [ ] Hit the goal widget

#### Link button

Utility component to allow using next/link with reshaped button.

#### Create application button

- [x] Text "Create new"
- [x] Plus icon before the text
- [x] Click navigates to the create new application page (pathname `/application/new`) without reloading the page
- [ ] Fits figma design

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
