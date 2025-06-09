import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginRequest } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { AnimatedBackground } from "@/components/animated-background";
import { RobotVisual } from "@/components/robot-visual";
import { Eye, EyeOff, Shield, Loader2, Bot } from "lucide-react";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { login, isLoginPending, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
  });

  // Redirect if already authenticated
  if (isAuthenticated) {
    setLocation("/dashboard");
    return null;
  }

  const onSubmit = (data: LoginRequest) => {
    login(data, {
      onSuccess: () => {
        setLocation("/dashboard");
      },
    });
  };

  return (
    <div className="auth-container auth-gradient-1 relative overflow-hidden">
      <AnimatedBackground />
      


      {/* Robot Visual Section */}
      <div className="auth-visual-section">
        <div className="relative">
          <RobotVisual />
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
            <div className="glass-card px-6 py-3 rounded-full">
              <p className="text-sm font-medium text-white dark:text-gray-200">
                AuthSystem Pro AI
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="auth-form-section">
        <div className="w-full max-w-md">
          <Card className="glass-card border-0 shadow-2xl">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-white dark:text-gray-100">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-base text-gray-200 dark:text-gray-300">
                  Sign in to your account
                </CardDescription>
              </div>
            </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white dark:text-gray-200">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  className="h-12 rounded-xl focus-ring bg-white/20 dark:bg-black/20 border-white/30 dark:border-gray-600 text-white dark:text-gray-100 placeholder-gray-300 dark:placeholder-gray-400"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-sm text-red-300 dark:text-red-400">{errors.username.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white dark:text-gray-200">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-12 rounded-xl pr-12 focus-ring bg-white/20 dark:bg-black/20 border-white/30 dark:border-gray-600 text-white dark:text-gray-100 placeholder-gray-300 dark:placeholder-gray-400"
                    {...register("password")}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-300 dark:text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-300 dark:text-gray-400" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-300 dark:text-red-400">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="remember" className="text-sm font-normal text-white dark:text-gray-200">
                    Remember me
                  </Label>
                </div>
                <Link href="#" className="text-sm font-medium text-blue-300 hover:text-blue-200 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-12 gradient-primary text-white font-semibold rounded-xl hover:opacity-90 focus-ring shadow-lg"
                disabled={isLoginPending}
              >
                {isLoginPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/20 text-center">
              <p className="text-gray-200 dark:text-gray-300">Don't have an account?</p>
              <Link href="/signup">
                <Button variant="link" className="mt-1 font-semibold text-blue-300 hover:text-blue-200">
                  Create an account
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
}
