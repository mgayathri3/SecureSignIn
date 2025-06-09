import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema, type UpdateProfileRequest } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProfilePictureUpload } from "@/components/profile-picture-upload";
import { ArrowLeft, LogOut, Shield, Save, X, History, Key, Crown, GraduationCap } from "lucide-react";

export default function ProfilePage() {
  const [, setLocation] = useLocation();
  const { user, logout, updateProfile, isUpdatePending, isAuthenticated } = useAuth();
  const [profilePicture, setProfilePicture] = useState<string>(user?.profilePicture || "");

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    setValue,
    watch,
  } = useForm<UpdateProfileRequest>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      profilePicture: user?.profilePicture || "",
    },
  });

  if (!isAuthenticated) {
    setLocation("/login");
    return null;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        setLocation("/login");
      },
    });
  };

  const onSubmit = (data: UpdateProfileRequest) => {
    const updatedData = {
      ...data,
      profilePicture: profilePicture,
    };
    updateProfile(updatedData);
  };

  const handleProfilePictureChange = (imageData: string) => {
    setProfilePicture(imageData);
    setValue('profilePicture', imageData, { shouldDirty: true });
  };

  const getUserInitials = (username: string) => {
    return username.substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocation("/dashboard")}
                className="mr-4 p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Profile Settings</h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Profile Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Profile Header */}
          <Card className="card-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                <div className="flex-shrink-0">
                  <ProfilePictureUpload
                    currentImage={user.profilePicture}
                    username={user.username}
                    onImageChange={handleProfilePictureChange}
                  />
                </div>
                <div className="text-center lg:text-left">
                  <h2 className="text-2xl font-bold text-gray-900">{user.username}</h2>
                  <p className="text-gray-600">{user.email}</p>
                  <Badge 
                    variant="secondary" 
                    className={`mt-2 ${
                      user.role === "Admin" 
                        ? "bg-purple-100 text-purple-800" 
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {user.role === "Admin" ? (
                      <Crown className="h-3 w-3 mr-1" />
                    ) : (
                      <GraduationCap className="h-3 w-3 mr-1" />
                    )}
                    {user.role}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Form */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Update your account details below
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Username */}
                  <div className="space-y-2">
                    <Label htmlFor="profile-username">Username</Label>
                    <Input
                      id="profile-username"
                      type="text"
                      className="h-12 rounded-xl focus-ring"
                      {...register("username")}
                    />
                    {errors.username && (
                      <p className="text-sm text-destructive">{errors.username.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="profile-email">Email Address</Label>
                    <Input
                      id="profile-email"
                      type="email"
                      className="h-12 rounded-xl focus-ring"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div className="space-y-2">
                    <Label htmlFor="profile-first-name">First Name</Label>
                    <Input
                      id="profile-first-name"
                      type="text"
                      className="h-12 rounded-xl focus-ring"
                      {...register("firstName")}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-destructive">{errors.firstName.message}</p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <Label htmlFor="profile-last-name">Last Name</Label>
                    <Input
                      id="profile-last-name"
                      type="text"
                      className="h-12 rounded-xl focus-ring"
                      {...register("lastName")}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-destructive">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                {/* Role Display */}
                <div className="space-y-2">
                  <Label>Role</Label>
                  <div className="h-12 px-4 py-3 border border-input rounded-xl bg-muted flex items-center">
                    <span className="text-muted-foreground">{user.role}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Role cannot be changed. Contact an administrator if needed.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <Button
                    type="submit"
                    disabled={!isDirty || isUpdatePending}
                    className="gradient-primary text-white font-semibold rounded-xl hover:opacity-90 focus-ring"
                  >
                    {isUpdatePending ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => reset()}
                    disabled={!isDirty}
                    className="rounded-xl border-gray-300 focus-ring"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Security Section */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and privacy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Change Password */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <h4 className="font-medium text-gray-900">Change Password</h4>
                    <p className="text-sm text-gray-600">Update your account password</p>
                  </div>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
                    <Key className="mr-2 h-4 w-4" />
                    Change
                  </Button>
                </div>

                {/* Account Activity */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <h4 className="font-medium text-gray-900">Account Activity</h4>
                    <p className="text-sm text-gray-600">View login history and active sessions</p>
                  </div>
                  <Button variant="outline" className="rounded-lg border-gray-300">
                    <History className="mr-2 h-4 w-4" />
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
