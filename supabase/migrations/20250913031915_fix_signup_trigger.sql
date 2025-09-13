-- Fix the handle_new_user function to handle invalid role values gracefully and catch insert errors
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

  -- Attempt to insert profile, catch any errors
  BEGIN
    INSERT INTO profiles (id, email, full_name, role)
    VALUES (
      NEW.id,
      COALESCE(NEW.email, NEW.raw_user_meta_data->>'email', ''),
      COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
      user_role_val
    );
  EXCEPTION
    WHEN OTHERS THEN
      -- Log the error but don't fail the user creation
      RAISE WARNING 'Failed to create profile for user %: %', NEW.id, SQLERRM;
  END;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
