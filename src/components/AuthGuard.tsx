import React from "react";

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default function AuthGuard({ children }: AuthGuardProps) {
  // Sabko bina kisi condition ke content dikhana hai
  return <>{children}</>;
}
