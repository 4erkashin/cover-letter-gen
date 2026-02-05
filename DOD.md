# Definition of Done for this project

- [ ] Code is written
- [ ] No changes to the code needed
- [ ] App is deployed to the Vercel

## Code: implementation details

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
- [x] Application create and details pages share the same layout

### App Header

- [x] App Logo
  - [x] Svg handled via reshaped recommended way: svgr + Icon component
  - [x] Component consists of circle svg icon and svg with text
    - Caveat: reshaped Icon component suited for square icons only,  
      so not square svg like [app-logo-text](./components/app-logo/app-logo-text.svg) should be handled with CSS without passing to the Icon component

  - [ ] Fits figma design

- [x] Goal progress
  - [x] Uses shared [Goal progress](#goal-progress)
  - [x] Text "{current}/{total} generated"
  - [x] Current capped by total, so 6/5 becomes 5/5
  - [x] Dots to indicate progress
  - [x] Success icon if status is completed

  - [ ] Fits figma design

- [x] Home button
  - [x] Uses shared [Link button](#link-button)
  - [x] No text, icon only
  - [x] Click navigates to the home page (pathname `/`) without reloading the page

  - [ ] Fits figma design

### Home page

- [ ] Header
  - [ ] Title
    - [x] Text "Applications"
    - [ ] Implemented via reshaped typography handling approach

    - [ ] Fits figma design

  - [x] Create application button
    - [x] Uses shared [Create application button](#create-application-button)

  - [ ] Fits figma design

- [ ] Can show:
  - [ ] List of application previews
    - [ ] Showing condition: ls has at least one application

  - [ ] Hit the goal widget
    - [x] Uses shared [Hit the goal widget](#hit-the-goal-widget)
    - [x] Showing condition: goal status is "in-progress"

    - [ ] Fits figma design

### Create new application page

- [ ] Title
  - [x] Text "New application"
  - [ ] Implemented via reshaped typography handling approach

  - [ ] Fits figma design

- [ ] Form

- [ ] Generated cover letter

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

#### Page header

Container with a preset paddings and border bottom.

#### Link button

Utility component to allow using next/link with reshaped button.

#### Goal progress

- [x] Implemented via composition, to fit figma design where it used in two places with different layout and item styling
- [x] Has composables Dot and Bar, that can be filled to indicate progress

- [ ] Fits figma design

#### Create application button

- [x] Text "Create new"
- [x] Plus icon before the text
- [x] Click navigates to the create new application page (pathname `/application/new`) without reloading the page

- [ ] Fits figma design

#### Hit the goal widget

- [x] Appears as green block with rounded corners
- [x] Title "Hit your goal"
- [x] Description "Generate and send out couple more job applications to get hired faster"
- [x] [Create application button](#create-application-button)
- [x] [Goal progress](#goal-progress), with:
  - [x] Bars to indicate progress
  - [x] Text `{current} out of {total}`

- [ ] Fits figma design

#### Card with actions bar

- [ ] Used in
  - [ ] Home page to show application preview
  - [ ] Application details page to show generated cover letter

#### Application form

- [x] Uses RHF
- [x] Uses Zod schema for validation
  - [x] job title
    - [x] required
  - [x] company name
    - [x] required
  - [ ] skills
    - [x] optional
  - [ ] additional details
    - [x] optional
    - [x] max length from application domain const
