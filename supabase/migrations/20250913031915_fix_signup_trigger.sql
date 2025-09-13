-- Fix the handle_new_user function to handle invalid role values gracefully
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
DECLARE
  user_role_val user_role;
BEGIN
  -- Safely cast the role, default to 'student' if invalid
  BEGIN
    user_role_val := COALESCE(NEW.raw_user_meta_data->>'role', 'student')::user_role;
  EXCEPTION
    WHEN invalid_text_representation THEN
      user_role_val := 'student';
  END;

  INSERT INTO profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    user_role_val
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
