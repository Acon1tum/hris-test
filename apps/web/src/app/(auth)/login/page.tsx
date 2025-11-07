import { LoginForm } from "@/components/login-form"
import Squares from "@/components/Squares"

export default function LoginPage() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 p-6 md:p-10">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full opacity-40">
        <Squares
          direction="diagonal"
          speed={0.3}
          borderColor="rgba(148, 163, 184, 0.15)"
          squareSize={60}
          hoverFillColor="rgba(99, 102, 241, 0.1)"
        />
      </div>
      
      {/* Login Form */}
      <div className="relative z-10 w-full max-w-sm md:max-w-4xl lg:max-w-5xl">
        <LoginForm />
      </div>
    </div>
  )
}

