# CS3219 OTOT Task C

- **Name**: Ryan Aidan
- **Matric. Number**: A0218327E
- **Repo Link**: [https://github.com/aidanaden/otot-c](https://github.com/aidanaden/otot-c)

## Tech stack used

- [Next.JS](https://nextjs.org/learn/foundations/about-nextjs) (frontend + backend API routes via nextjs' serverless functions)
- [TailwindCSS](https://tailwindcss.com/) (frontend styling)
- [Prisma](https://www.prisma.io/docs/concepts/overview/what-is-prisma) (database ORM)
- MySQL (database used)
- [tRPC](https://trpc.io/docs/v10/) (used to set up API routes with end-to-end typesafety)

## Hosting

- [Vercel](https://vercel.com/docs) (provides easy integration with Next.JS + continuous deployment)
- [Planetscale](https://planetscale.com/docs/concepts/planetscale-workflow) (highly scalable serverless MySQL database with generous free plans)

## Task B1: Simple Backend

### Requirements

1. MySQL (SQL database used)
2. NodeJS >= `v14.19.2`
3. [Postman](https://www.postman.com/) is used to (manually) test CRUD for the API.

### Local Deployment

1. Install docker by clicking [here](https://docs.docker.com/get-docker/)

2. Install pnpm by clicking [here](https://pnpm.io/installation)

3. Copy the `.env-example` file to `.env` and paste the following:

```bash
# Prisma
DATABASE_URL=mysql://root:root@localhost:3369/mysqldb

# Next Auth
NEXTAUTH_SECRET=secret

# Calendarific
CALENDARIFIC_API_KEY=00e9be3d9730c3d5504e5c4794788bc428cdeea5
```

4. Run the following commands to deploy the app locally

```bash
# install packages
pnpm install

# start local mysql db, deploy schema, build source files
pnpm build:local

# run locally
pnpm start
```

### Verify successful deployment

Run the following commands to verify successful local deployment

```bash
# query the /api/activity endpoint
curl http://localhost:3000/api/activity

# expected output
[]
```

Visit `http://localhost:3000` to confirm successful frontend deployment

### Testing via Postman

Import the Postman collection via [this link](https://www.getpostman.com/collections/f113769cd7f4466c39eb).

2 versions of the `API_URL` variable exists, one set to `localhost:3000` (locally deployment) and one set to `https://otot-b-phi.vercel.app` (vercel deployment)

Explanation of HTTP requests:

- `activity`: list all activities in database (will be empty if using local MySQL database)
- `activity/:id`: returns error if ID does not exist
  - `GET`: returns activity with the specified ID
  - `PATCH` / `PUT`: updates specified field(s) in request body given an ID
  - `DELETE`: removes the activity with the given ID from the database

Note:

- `params` and `body` would need to be updated manually, where they are necessary.

### Screenshots

#### `GET`: get activities given empty database

![get data from empty database](https://i.ibb.co/n7s2qDy/image.png)

#### `POST`: create invalid activity (missing category)

![post invalid activity](https://i.ibb.co/129j4mb/image.png)

#### `POST`: create valid activity

![post valid activity](https://i.ibb.co/QYfPw3t/image.png)

#### `PATCH`/`PUT`: update name of activity with invalid value

![update activity with invalid data](https://i.ibb.co/nzNbcFx/image.png)

#### `PATCH`/`PUT`: update name of activity with valid value

![update activity with valid data](https://i.ibb.co/n6HcdJ4/image.png)

#### `GET`: get invalid activity given invalid id

![get invalid activity](https://i.ibb.co/kqXGgK8/image.png)

#### `GET`: get valid activity given valid id

![get valid activity](https://i.ibb.co/KWKGxz3/image.png)

#### `DELETE`: remove invalid activity with invalid id

![delete invalid activity](https://i.ibb.co/2ZYpRZQ/image.png)

#### `DELETE`: remove valid activity with valid id

![delete valid activity](https://i.ibb.co/yQwNzgj/image.png)

## Task B2.1: Testing through Continuous Integration

Jest was used to test the API routes locally as well as via Github Action.

### Summary of CI

- [Jest](https://jestjs.io/) used to test API endpoints
- Local MySQL database used for tests
- Postman collection can be found [here](https://www.getpostman.com/collections/f113769cd7f4466c39eb) with variables already set
- Github Action yaml file can be viewed [here](https://github.com/aidanaden/otot-c/blob/main/.github/workflows/ci.yml).

### Local test output

![Jest output](https://i.ibb.co/zsrsZF2/image.png)

### Testing via [Github Action](https://github.com/aidanaden/otot-b/actions/runs/3303991148?check_suite_focus=true)

![Github Actions output](https://i.ibb.co/6YrF7Yd/image.png)

## Task B2.2: Deploying through Continuous Deployment

Since vercel is used to host both the frontend + backend, continuous deployment is automatically provided via vercel's github integration

### Continuous Deployment Screenshots

#### Vercel deployment

![vercel deployment github](https://i.ibb.co/RQMjVjV/image.png)

#### Deployed via vercel

![vercel deployment on vercel](https://i.ibb.co/Wx3ND8s/image.png)

## Task B3: Implement a Frontend

The website is deployed on Vercel and can be accessed through this link [https://otot-b-phi.vercel.app/](https://otot-b-phi.vercel.app/).

The home page automatically loads all of the activities currently stored in the live db hosted in planetscale.

1. To create an "activity", click on the "create activity" button on the top right of the screen.

2. To edit an activity, click on the "edit" button in the top right of the activity.

3. To delete an activity, click on the "delete" button in the top right of the activity.

<div style="page-break-after: always"></div>

### Screenshot of Activities on frontend

![desktop activity list](https://i.ibb.co/NtNJFnQ/image.png)

![mobile activity list](https://i.ibb.co/pnG85bJ/image.png)

<div style="page-break-after: always"></div>

## Task B4: Pulling data from Serverless Function to Frontend

The serverless API function will be pulling data from [Calendarific's API](https://calendarific.com/api-documentation) to query the holidays in SG for the current year

The serverless function will be run using Next.JS' serverless API routes. When a client queries the API route, the serverless function will query the calendarific API endpoint (given a valid country code and year) and return a list of holidays.

To view the holiday data, a page has been created on the frontend to display the holidays returned here [https://otot-b-phi.vercel.app/holidays](https://otot-b-phi.vercel.app/holidays).

### Screenshot of B4

#### Serverless function API route (via Postman)

![Cloud Function](https://i.ibb.co/k32qJRL/image.png)

<div style="page-break-after: always"></div>

#### View all SG holidays for 2022

![SG holidays 2022](https://i.ibb.co/W6Z0fvL/image.png)

<div style="page-break-after: always"></div>

#### View all UK holidays for 2011

![UK holidays 2011](https://i.ibb.co/k8ffDVQ/image.png)

<div style="page-break-after: always"></div>

### Potential improvements

In the future, google location API can be integrated to allow location autocomplete when creating activities (instead of having to manually enter the activity location information).
