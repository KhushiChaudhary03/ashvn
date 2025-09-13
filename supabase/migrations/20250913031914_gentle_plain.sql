/*
  # Initial Schema for Ashvaan Mental Health Platform

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `full_name` (text)
      - `role` (text, enum: student, counsellor, admin)
      - `institution_id` (uuid, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `institutions`
      - `id` (uuid, primary key)
      - `name` (text)
      - `logo_url` (text, optional)
      - `primary_color` (text)
      - `contact_email` (text)
      - `emergency_number` (text)
      - `address` (text)
      - `created_at` (timestamp)
    
    - `appointments`
      - `id` (uuid, primary key)
      - `student_id` (uuid, references profiles)
      - `counsellor_id` (uuid, references profiles)
      - `date` (date)
      - `time` (time)
      - `type` (text, enum: video, phone, in-person)
      - `status` (text, enum: scheduled, completed, cancelled)
      - `location` (text, optional)
      - `notes` (text, optional)
      - `created_at` (timestamp)
    
    - `assessments`
      - `id` (uuid, primary key)
      - `student_id` (uuid, references profiles)
      - `type` (text, enum: PHQ-9, GAD-7)
      - `score` (integer)
      - `responses` (jsonb)
      - `risk_level` (text, enum: low, medium, high, critical)
      - `created_at` (timestamp)
    
    - `forum_posts`
      - `id` (uuid, primary key)
      - `author_id` (uuid, references profiles)
      - `title` (text)
      - `content` (text)
      - `category` (text)
      - `tags` (text[])
      - `is_anonymous` (boolean, default true)
      - `likes` (integer, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `forum_replies`
      - `id` (uuid, primary key)
      - `post_id` (uuid, references forum_posts)
      - `author_id` (uuid, references profiles)
      - `content` (text)
      - `is_anonymous` (boolean, default true)
      - `likes` (integer, default 0)
      - `is_peer_volunteer` (boolean, default false)
      - `created_at` (timestamp)
    
    - `mood_entries`
      - `id` (uuid, primary key)
      - `student_id` (uuid, references profiles)
      - `date` (date)
      - `mood_score` (integer, 1-10)
      - `notes` (text, optional)
      - `activities` (text[])
      - `created_at` (timestamp)
    
    - `chat_sessions`
      - `id` (uuid, primary key)
      - `student_id` (uuid, references profiles)
      - `messages` (jsonb)
      - `assessments` (jsonb, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access control
    - Ensure student data privacy
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('student', 'counsellor', 'admin');
CREATE TYPE appointment_type AS ENUM ('video', 'phone', 'in-person');
CREATE TYPE appointment_status AS ENUM ('scheduled', 'completed', 'cancelled');
CREATE TYPE assessment_type AS ENUM ('PHQ-9', 'GAD-7');
CREATE TYPE risk_level AS ENUM ('low', 'medium', 'high', 'critical');

-- Create institutions table
CREATE TABLE IF NOT EXISTS institutions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text,
  primary_color text DEFAULT '#14B8A6',
  contact_email text,
  emergency_number text,
  address text,
  created_at timestamptz DEFAULT now()
);

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role user_role NOT NULL DEFAULT 'student',
  institution_id uuid REFERENCES institutions(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  counsellor_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  date date NOT NULL,
  time time NOT NULL,
  type appointment_type NOT NULL DEFAULT 'video',
  status appointment_status NOT NULL DEFAULT 'scheduled',
  location text,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Create assessments table
CREATE TABLE IF NOT EXISTS assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type assessment_type NOT NULL,
  score integer NOT NULL,
  responses jsonb NOT NULL,
  risk_level risk_level NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create forum_posts table
CREATE TABLE IF NOT EXISTS forum_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  tags text[] DEFAULT '{}',
  is_anonymous boolean DEFAULT true,
  likes integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create forum_replies table
CREATE TABLE IF NOT EXISTS forum_replies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES forum_posts(id) ON DELETE CASCADE,
  author_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  is_anonymous boolean DEFAULT true,
  likes integer DEFAULT 0,
  is_peer_volunteer boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create mood_entries table
CREATE TABLE IF NOT EXISTS mood_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  date date NOT NULL,
  mood_score integer NOT NULL CHECK (mood_score >= 1 AND mood_score <= 10),
  notes text,
  activities text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  UNIQUE(student_id, date)
);

-- Create chat_sessions table
CREATE TABLE IF NOT EXISTS chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  messages jsonb NOT NULL DEFAULT '[]',
  assessments jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Counsellors can read student profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    role = 'student' AND 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('counsellor', 'admin')
    )
  );

-- Create RLS policies for appointments
CREATE POLICY "Students can read own appointments"
  ON appointments
  FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Counsellors can read their appointments"
  ON appointments
  FOR SELECT
  TO authenticated
  USING (counsellor_id = auth.uid());

CREATE POLICY "Students can create appointments"
  ON appointments
  FOR INSERT
  TO authenticated
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can update own appointments"
  ON appointments
  FOR UPDATE
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Counsellors can update their appointments"
  ON appointments
  FOR UPDATE
  TO authenticated
  USING (counsellor_id = auth.uid());

-- Create RLS policies for assessments
CREATE POLICY "Students can read own assessments"
  ON assessments
  FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Students can create own assessments"
  ON assessments
  FOR INSERT
  TO authenticated
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Counsellors can read student assessments"
  ON assessments
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('counsellor', 'admin')
    )
  );

-- Create RLS policies for forum posts
CREATE POLICY "Anyone can read forum posts"
  ON forum_posts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create forum posts"
  ON forum_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (author_id = auth.uid());

CREATE POLICY "Users can update own forum posts"
  ON forum_posts
  FOR UPDATE
  TO authenticated
  USING (author_id = auth.uid());

-- Create RLS policies for forum replies
CREATE POLICY "Anyone can read forum replies"
  ON forum_replies
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create forum replies"
  ON forum_replies
  FOR INSERT
  TO authenticated
  WITH CHECK (author_id = auth.uid());

-- Create RLS policies for mood entries
CREATE POLICY "Students can read own mood entries"
  ON mood_entries
  FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Students can create own mood entries"
  ON mood_entries
  FOR INSERT
  TO authenticated
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can update own mood entries"
  ON mood_entries
  FOR UPDATE
  TO authenticated
  USING (student_id = auth.uid());

-- Create RLS policies for chat sessions
CREATE POLICY "Students can read own chat sessions"
  ON chat_sessions
  FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Students can create own chat sessions"
  ON chat_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can update own chat sessions"
  ON chat_sessions
  FOR UPDATE
  TO authenticated
  USING (student_id = auth.uid());

-- Create function to handle profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')::user_role
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Insert sample institution
INSERT INTO institutions (name, contact_email, emergency_number, address) VALUES
('State University', 'counseling@university.edu', '1-800-273-8255', '123 University Ave, Campus City, ST 12345')
ON CONFLICT DO NOTHING;