# Intellify OA - Dashboard Application Documentation

## Problem Statement

[Detailed Problem Statement](https://drive.google.com/file/d/1gkzlQtG9dWnwb8Ko1aQ8KnWNYfCU2Jby/view?usp=sharing)


## Prerequisites

* Node.js (v14 or later)
* npm (usually comes with Node.js)
* Git
* A Supabase account and project set up

## Folder struct

```
intellify-OA/
│
├── app/
│   ├── api/
│   │   └── metrics/
│   │       └── route.js
│   ├── dashboard/
│   │   └── page.js
│   ├── login/
│   │   └── page.js
│   ├── signup/
│   │   └── page.js
│   ├── layout.js
│   └── page.js
│
├── components/
│   ├── Auth/
│   │   ├── LoginForm.js
│   │   └── SignupForm.js
│   └── Layout/
│       └── Header.js
│
├── lib/
│   └── supabase.js
│
├── public/
│
├── styles/
│   └── globals.css
│
├── .env.local
├── .eslintrc.json
├── next.config.js
├── package.json
└── README.md
```

## Local Setup

1. Clone the repository:

```
git clone [your-repo-url]
cd [your-project-name]
```

2. Install dependencies:

```
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following content:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:

```
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Documentation

### Authentication

#### Sign Up

* **Endpoint**: `/api/auth/signup`
* **Method**: POST
* **Body**:
* Note : you'll be redirected to login page after successful signup , and during re-login you'll have to go through enter your credentials 2 times once at `signup` and `login` (due to time constriants)

``` json
{
  "email": "user@example.com",
  "password": "password123"
}
```

* **Response**: User object or error message

#### Sign In

* **Endpoint**: `/api/auth/login`
* **Method**: POST
* **Body**:

``` json
{
  "email": "user@example.com",
  "password": "password123"
}
```

* **Response**: User object or error message

### Metrics

#### Get Metrics

* **Endpoint**: `/api/metrics`
* **Method**: GET
* **Authentication**: Required
* **Response**: Array of metric objects

#### Add Metric

* **Endpoint**: `/api/metrics`
* **Method**: POST
* **Authentication**: Required
* **Body**:

``` json
{
  "metric_name": "Example Metric",
  "metric_value": 42.5
}
```

* **Response**: Created metric object or error message

. Setup and Authentication (25%)
   - [x] Set up a new Next.js project using the App Router
   - [x] Implement user authentication using Supabase Auth
   - [x] Create a login page
   - [x] Create a signup page
   - [x] Implement protected routes

2. Dashboard Implementation (30%)
   - [x] Design and implement a main dashboard page
   - [x] Use Recharts to create a line chart
   - [x] Use Recharts to create a bar chart
   - [x] Use Recharts to create a pie chart
   - [x] Implement real-time data updates for at least one widget

3. Data Management (20%)
   - [x] Set up a Supabase database to store relevant data
   - [x] Implement API routes in Next.js to handle data operations (CRUD)
   - [x] Create a form to allow users to input new data

4. Responsive Design (15%)
   - [x] Ensure the dashboard is responsive on mobile devices
   - [ ] Implement a collapsible sidebar for navigation on smaller screens

5. Deployment and Documentation (10%)
   - [x] Deploy the application to Vercel
   - [x] Write documentation on how to set up and run the project locally
   - [x] Include API documentation for backend services


## Outputs

* Starting up
![Starting up](https://github.com/RudradevArya/FinTarget-OA/blob/main/outputs/1.png)
* cURL Outputs
![cURL Outputs](https://github.com/RudradevArya/FinTarget-OA/blob/main/outputs/2.png)
* Postman Output
![Postman Output](https://github.com/RudradevArya/FinTarget-OA/blob/main/outputs/3.png)
* Task\_log log file
![Task_log log file](https://github.com/RudradevArya/FinTarget-OA/blob/main/outputs/4.png)
* Redis user queue monitoring
![Redis user queue monitoring](https://github.com/RudradevArya/FinTarget-OA/blob/main/outputs/5.png)
