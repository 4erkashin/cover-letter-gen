# Definition of Done for this project

- [ ] Code is written
- [ ] No changes to the code needed
- [ ] App is deployed to the Vercel

## Code part

### Routing

- [ ] Home page is accessible via `/` route
- [ ] Create new application page is accessible via `/application/new` route
- [ ] Application details page is accessible via `/application/:id` route
- [ ] 404 page is implemented and falls back from other paths

### Layout

- [ ] App Header is visible on all pages
- [ ] Create application and application details pages shares the same layout

### App Header

- [ ] Contains:
  - [ ] logo
  - [ ] progress indicator
  - [ ] home button

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
