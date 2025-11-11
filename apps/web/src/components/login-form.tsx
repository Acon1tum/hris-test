'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, BriefcaseIcon } from "lucide-react"
import { useLogin } from '@/hooks/useAuth';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: login, isPending, error } = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ email, password });
  };

  const errorMessage = error instanceof Error 
    ? error.message 
    : (error as any)?.response?.data?.error || 'Login failed. Please check your credentials.';

  return (
    <div className={cn("flex flex-col gap-8", className)} {...props}>
      <Card className="overflow-hidden shadow-xl border-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Left Section - Login Form */}
          <form className="p-8 md:p-10 lg:p-12" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-7">
              {/* Header */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <Image
                    src="/qb-logo-2.png"
                    alt="Quanby HRIS"
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                  <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back</h1>
                </div>
                <p className="text-base text-muted-foreground">
                  Login to your HRIS account
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive border border-destructive/20">
                  {errorMessage}
                </div>
              )}

              {/* Form Fields */}
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isPending}
                    className="h-11"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <a
                      href="#"
                      className="text-sm text-primary hover:underline underline-offset-2 font-medium"
                      onClick={(e) => {
                        e.preventDefault();
                        // TODO: Implement forgot password
                      }}
                    >
                      Forgot password?
                    </a>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Enter your password"
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isPending}
                    className="h-11"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full h-11 text-base font-semibold" 
                disabled={isPending}
              >
                {isPending ? 'Signing in...' : 'Login'}
              </Button>
            </div>
          </form>

          {/* Right Section - Branding & Job Openings */}
          <div className="relative hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 md:flex flex-col items-center justify-center p-8 md:p-10 lg:p-12">
            <div className="text-center text-white space-y-8 max-w-xs">
              {/* Branding */}
              <div className="space-y-3">
                <div className="flex justify-center">
                  <Image
                    src="/qb-logo-2.png"
                    alt="Quanby HRIS"
                    width={80}
                    height={80}
                    className="h-20 w-20 object-contain"
                  />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Quanby HRIS</h2>
                <p className="text-base md:text-lg text-white/90 leading-relaxed">
                  Human Resource Information System
                </p>
              </div>
              
              {/* Job Openings Section */}
              <div className="pt-8 border-t border-white/30 space-y-5">
                <p className="text-sm md:text-base text-white/90 leading-relaxed">
                  Looking for career opportunities? Browse our open positions.
                </p>
                <Link href="/jobs" className="block">
                  <Button 
                    variant="secondary" 
                    className="w-full h-11 bg-white/15 hover:bg-white/25 text-white border-white/30 backdrop-blur-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <BriefcaseIcon className="mr-2 h-4 w-4" />
                    View Job Openings
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legal Text */}
      <div className="text-center text-xs md:text-sm text-muted-foreground leading-relaxed">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary font-medium transition-colors">
          Terms of Service
        </a>
        {" "}and{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary font-medium transition-colors">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  )
}
