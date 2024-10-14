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
git clone https://github.com/RudradevArya/Intellify-OA.git
cd
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

5. Open [http://localhost:3000](http://localhost:3000/signup) in your browser.

## API Documentation

### Authentication

#### Sign Up

* **Endpoint**: `/api/auth/signup`
* `https://intellify-oa.vercel.app/signup`
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
* `https://intellify-oa.vercel.app/login`
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
* `https://intellify-oa.vercel.app/dashboard`
* **Method**: GET
* **Authentication**: Required
* **Response**: Array of metric objects

#### Add Metric

* **Endpoint**: `/api/metrics`
* `https://intellify-oa.vercel.app/dashboard`
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

## Supabase Setup

1. Create a Supabase project at https://supabase.com

2. In your Supabase project, create a new table named `dashboard_metrics` with the following structure:
   - `id` (int8, primary key)
   - `created_at` (timestamptz, default: now())
   - `metric_name` (text)
   - `metric_value` (float8)
   - `user_id` (uuid, foreign key to auth.users)

3. Set up Row Level Security (RLS) policies:
   ```sql
   ALTER TABLE public.dashboard_metrics ENABLE ROW LEVEL SECURITY;

   CREATE POLICY "Users can insert their own metrics" 
   ON public.dashboard_metrics FOR INSERT 
   TO authenticated 
   WITH CHECK (auth.uid() = user_id);

   CREATE POLICY "Users can view all metrics" 
   ON public.dashboard_metrics FOR SELECT 
   TO authenticated 
   USING (true);
   ```

4. In Supabase project settings:
   - Go to API settings
   - Find your project URL and anon/public key
   - Add these to your `.env.local` file:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_project_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
     ```

5. Enable Email Auth in Authentication > Providers

6. Update allowed callback URLs in Authentication > URL Configuration:
   - Add your local development URL (e.g., http://localhost:3000)
   - Add your production URL after deployment
 - 
## Task List

1. Setup and Authentication (25%)

* [x] Set up a new Next.js project using the App Router
* [x] Implement user authentication using Supabase Auth
* [x] Create a login page
* [x] Create a signup page
* [x] Implement protected routes

2. Dashboard Implementation (30%)
    * [x] Design and implement a main dashboard page
    * [x] Use Recharts to create a line chart
    * [x] Use Recharts to create a bar chart
    * [ ] Use Recharts to create a pie chart
    * [x] Implement real-time data updates for at least one widget
3. Data Management (20%)
    * [x] Set up a Supabase database to store relevant data
    * [x] Implement API routes in Next.js to handle data operations (CRUD)
    * [x] Create a form to allow users to input new data
4. Responsive Design (15%)
    * [x] Ensure the dashboard is responsive on mobile devices
    * [ ] Implement a collapsible sidebar for navigation on smaller screens
5. Deployment and Documentation (10%)
    * [x] Deploy the application to Vercel
    * [x] Write documentation on how to set up and run the project locally
    * [x] Include API documentation for backend services


## My Detailed Approach and thinking

[Link to My approach to the assessment (another markdown file)](Assignment-Approach.md)


## Outputs

![Animated gif demo](demo/demo.gif)