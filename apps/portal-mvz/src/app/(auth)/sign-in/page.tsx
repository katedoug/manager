import { LoginForm1 } from "./components/login-form-1"

export default function Page() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl font-bold tracking-tight">Kate & Doug</span>
          <span className="text-sm text-muted-foreground">Portal MVZ</span>
        </div>
        <LoginForm1 />
      </div>
    </div>
  )
}
