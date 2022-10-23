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

## Task C: Backend auth

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

Import the Postman collection via [this link](https://www.getpostman.com/collections/e455e91c4348cd07f8fa).

2 versions of the `API_URL` variable exists, one set to `localhost:3000` (locally deployment) and one set to `https://otot-b-phi.vercel.app` (vercel deployment)

Explanation of HTTP requests:

- `signin`: sign in with username and password (public route)
- `user/signup`: sign up with a user account (public route)
- `user/protected`: get user data of logged in user account (user protected route)
- `admin/signup`: sign up with an admin account (public route)
- `admin/protected`: get user data of logged in admin account (admin protected route)

Note:

- `params` and `body` would need to be updated manually, where they are necessary.

### Public role screenshots

#### Sign up as user with invalid credentials

![public sign up](https://i.ibb.co/8DdysTg/image.png)

#### Sign in as user with invalid credentials

![public sign in](https://i.ibb.co/WDbgSFk/image.png)

#### Test user protected route failure

![public user protected route](https://i.ibb.co/w6w7Z4r/image.png)

#### Test admin protected route failure

![public admin protected route](https://i.ibb.co/xXNCFx6/image.png)

### User role screenshots

#### Sign up as user with valid credentials

![user sign up](https://i.ibb.co/GkPLNXM/image.png)

#### Sign in as user with valid credentials

![user sign in](https://i.ibb.co/wKHhNmc/image.png)

#### Test user protected route success

![user user protected route](https://i.ibb.co/y8kWwCF/image.png)

#### Test admin protected route failure

![user admin protected route](https://i.ibb.co/GxJJSLD/image.png)

### Admin role screenshots

#### Sign up as admin with valid credentials

![admin sign up](https://i.ibb.co/7NmZbbz/image.png)

#### Sign in as admin with valid credentials

![admin sign in](https://i.ibb.co/ZfgvWfr/image.png)

#### Test user protected route success

![admin user protected route](https://i.ibb.co/5kxCTwQ/image.png)

#### Test admin protected route success

![admin admin protected route](https://i.ibb.co/NxFLJjm/image.png)
