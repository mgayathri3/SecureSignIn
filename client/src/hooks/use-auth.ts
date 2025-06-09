import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthService } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import type { User, LoginRequest, SignupRequest, UpdateProfileRequest } from "@shared/schema";

export function useAuth() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: user, isLoading, error } = useQuery({
    queryKey: ["/api/user"],
    queryFn: AuthService.getCurrentUser,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const loginMutation = useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/user"], data.user);
      toast({
        title: "Welcome back!",
        description: `Successfully logged in as ${data.user.username}`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    },
  });

  const signupMutation = useMutation({
    mutationFn: AuthService.signup,
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/user"], data.user);
      toast({
        title: "Account created!",
        description: `Welcome to AuthSystem Pro, ${data.user.username}!`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Signup failed",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      queryClient.setQueryData(["/api/user"], null);
      queryClient.clear();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    },
    onError: () => {
      toast({
        title: "Logout failed",
        description: "There was an error logging out",
        variant: "destructive",
      });
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: AuthService.updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/user"], data.user);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user && !error,
    login: loginMutation.mutate,
    signup: signupMutation.mutate,
    logout: logoutMutation.mutate,
    updateProfile: updateProfileMutation.mutate,
    isLoginPending: loginMutation.isPending,
    isSignupPending: signupMutation.isPending,
    isLogoutPending: logoutMutation.isPending,
    isUpdatePending: updateProfileMutation.isPending,
  };
}
