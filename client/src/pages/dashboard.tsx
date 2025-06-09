import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  LogOut, 
  Settings, 
  Users, 
  BarChart3, 
  Book, 
  Trophy, 
  CheckCircle, 
  Crown, 
  Clock,
  UserCheck,
  Activity,
  Bell,
  HelpCircle,
  Key,
  MessageSquare,
  GraduationCap
} from "lucide-react";

export default function DashboardPage() {
  const [, setLocation] = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

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

  const getUserInitials = (username: string) => {
    return username.substring(0, 2).toUpperCase();
  };

  const formatLastLogin = (lastLogin: Date | string | null) => {
    if (!lastLogin) return "Never";
    const date = new Date(lastLogin);
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center mr-3">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">AuthSystem Pro</h1>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {getUserInitials(user.username)}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-gray-900">{user.username}</div>
                  <div className="text-xs text-gray-500">{user.role}</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocation("/profile")}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <Settings className="h-4 w-4" />
              </Button>
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
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.username}!
          </h2>
          <p className="text-gray-600">Here's what's happening with your account.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Account Status */}
          <Card className="card-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                </div>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                  Active
                </Badge>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Account Status</h3>
              <p className="text-gray-600 text-sm">Your account is verified and active</p>
            </CardContent>
          </Card>

          {/* Role Information */}
          <Card className="card-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                  {user.role === "Admin" ? (
                    <Crown className="h-6 w-6 text-indigo-600" />
                  ) : (
                    <GraduationCap className="h-6 w-6 text-indigo-600" />
                  )}
                </div>
                <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
                  {user.role}
                </Badge>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Your Role</h3>
              <p className="text-gray-600 text-sm">
                {user.role === "Admin" ? "Full system access granted" : "Learning access granted"}
              </p>
            </CardContent>
          </Card>

          {/* Last Login */}
          <Card className="card-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                  Recent
                </Badge>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Last Session</h3>
              <p className="text-gray-600 text-sm">{formatLastLogin(user.lastLogin)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Role-Based Content */}
        <div className="space-y-6">
          {user.role === "Admin" ? (
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 text-indigo-600 mr-3" />
                  Admin Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">User Management</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      Manage all registered users and their permissions
                    </p>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                      <Users className="h-4 w-4 mr-2" />
                      Manage Users
                    </Button>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">System Analytics</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      View detailed system usage and performance metrics
                    </p>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Analytics
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="h-5 w-5 text-emerald-600 mr-3" />
                  Student Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Learning Resources</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      Access your courses and learning materials
                    </p>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      <Book className="h-4 w-4 mr-2" />
                      View Courses
                    </Button>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Progress Tracking</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      Monitor your learning progress and achievements
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Trophy className="h-4 w-4 mr-2" />
                      View Progress
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 text-yellow-500 mr-3" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Button
                  variant="ghost"
                  className="p-4 h-auto flex-col bg-gray-50 hover:bg-gray-100 group"
                  onClick={() => setLocation("/profile")}
                >
                  <Settings className="h-6 w-6 text-gray-600 group-hover:text-indigo-600 mb-2" />
                  <span className="text-sm font-medium">Edit Profile</span>
                </Button>

                <Button
                  variant="ghost"
                  className="p-4 h-auto flex-col bg-gray-50 hover:bg-gray-100 group"
                >
                  <Key className="h-6 w-6 text-gray-600 group-hover:text-emerald-600 mb-2" />
                  <span className="text-sm font-medium">Change Password</span>
                </Button>

                <Button
                  variant="ghost"
                  className="p-4 h-auto flex-col bg-gray-50 hover:bg-gray-100 group"
                >
                  <Bell className="h-6 w-6 text-gray-600 group-hover:text-purple-600 mb-2" />
                  <span className="text-sm font-medium">Notifications</span>
                </Button>

                <Button
                  variant="ghost"
                  className="p-4 h-auto flex-col bg-gray-50 hover:bg-gray-100 group"
                >
                  <HelpCircle className="h-6 w-6 text-gray-600 group-hover:text-blue-600 mb-2" />
                  <span className="text-sm font-medium">Help & Support</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
