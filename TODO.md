# TODO: Fix Signup Database Error

## Steps to Resolve the "Database error saving new user" Issue

1. **Verify Environment Variables**

   - Check the `.env` file in the project root
   - Ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correctly set for your Supabase project
   - If using local Supabase, make sure it's running and accessible

2. **Apply Updated Database Trigger**

   - The trigger function has been updated to handle errors gracefully
   - If using hosted Supabase:
     - Go to your Supabase dashboard > SQL Editor
     - Run the updated function from `supabase/migrations/20250913031915_fix_signup_trigger.sql`
   - If using local Supabase:
     - Run `supabase db reset` or apply the migration

3. **Test Signup with Logging**

   - The signup function now includes console logging
   - Open the browser dev tools (F12) > Console
   - Attempt to sign up and check the logged data and errors
   - Look for any specific error details in the console

4. **Check Supabase Logs**

   - In Supabase dashboard > Logs > Database Logs
   - Look for any warnings or errors related to profile creation
   - The updated trigger will log warnings if profile insert fails

5. **Verify Database Schema**

   - Ensure the `user_role` enum is correctly defined: ('student', 'counsellor', 'admin')
   - Confirm the `profiles` table has the correct constraints
   - Check that RLS policies are not blocking the insert

6. **Test Different Roles**

   - Try signing up with different roles (student, counsellor, admin)
   - Verify that the role is correctly passed in the signup data

7. **Monitor for Success**
   - After applying the fixes, test signup again
   - Check that users are created successfully and profiles are inserted
   - Remove or comment out the console.log statements in production

## Files Modified

- `src/contexts/AuthContext.tsx`: Added logging to signup function
- `supabase/migrations/20250913031915_fix_signup_trigger.sql`: Updated trigger to handle insert errors gracefully
