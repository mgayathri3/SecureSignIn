import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupRequest } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { validatePasswordStrength, getPasswordStrengthColor } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Eye, EyeOff, UserPlus, Loader2, GraduationCap, Crown } from "lucide-react";

export default function SignupPage() {
  const [, setLocation] = useLocation();
  const { signup, isSignupPending, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignupRequest>({
    resolver: zodResolver(signupSchema),
  });

  // Redirect if already authenticated
  if (isAuthenticated) {
    setLocation("/dashboard");
    return null;
  }

  const onSubmit = (data: SignupRequest) => {
    signup(data, {
      onSuccess: () => {
        setLocation("/dashboard");
      },
    });
  };

  const password = watch("password") || "";
  const { score, feedback } = validatePasswordStrength(password);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 auth-gradient-2">
      <div className="w-full max-w-md">
        <Card className="card-shadow border-0">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
              <CardDescription className="text-base">
                Join our platform today
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  className="h-12 rounded-xl focus-ring"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-sm text-destructive">{errors.username.message}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Must be unique and 3+ characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 rounded-xl focus-ring"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="h-12 rounded-xl pr-12 focus-ring"
                    {...register("password", {
                      onChange: (e) => setPasswordValue(e.target.value),
                    })}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}

                {/* Password Strength Indicator */}
                {password && (
                  <div className="space-y-2">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-2 flex-1 rounded ${
                            i <= score
                              ? getPasswordStrengthColor(score)
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Password strength: {feedback}
                    </p>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Must contain: 8+ chars, uppercase, lowercase, number
                </p>
              </div>

              <div className="space-y-3">
                <Label>Select Role</Label>
                <RadioGroup
                  onValueChange={(value) => setValue("role", value as "Student" | "Admin")}
                  className="grid grid-cols-2 gap-3"
                >
                  <div className="space-y-2">
                    <RadioGroupItem value="Student" id="student" className="sr-only" />
                    <Label
                      htmlFor="student"
                      className="role-card flex flex-col items-center p-4 cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/10"
                    >
                      <GraduationCap className="h-8 w-8 text-emerald-600 mb-2" />
                      <div className="font-medium">Student</div>
                      <div className="text-xs text-muted-foreground">Learning access</div>
                    </Label>
                  </div>
                  <div className="space-y-2">
                    <RadioGroupItem value="Admin" id="admin" className="sr-only" />
                    <Label
                      htmlFor="admin"
                      className="role-card flex flex-col items-center p-4 cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/10"
                    >
                      <Crown className="h-8 w-8 text-emerald-600 mb-2" />
                      <div className="font-medium">Admin</div>
                      <div className="text-xs text-muted-foreground">Full access</div>
                    </Label>
                  </div>
                </RadioGroup>
                {errors.role && (
                  <p className="text-sm text-destructive">{errors.role.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 gradient-secondary text-white font-semibold rounded-xl hover:opacity-90 focus-ring"
                disabled={isSignupPending}
              >
                {isSignupPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                By creating an account, you agree to our{" "}
                <Link href="#" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </form>

            <div className="mt-8 pt-6 border-t text-center">
              <p className="text-muted-foreground">Already have an account?</p>
              <Link href="/login">
                <Button variant="link" className="mt-1 font-semibold text-primary">
                  Sign in here
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
