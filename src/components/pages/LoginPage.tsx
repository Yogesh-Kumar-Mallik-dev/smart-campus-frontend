import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import FormField from "@components/ui/FormField";
import Input from "@components/ui/Input";
import Button from "@components/ui/Buttons";
import { toastError, toastSuccess } from "@/lib/toast";

/* ---------- SCHEMA ---------- */
const schema = z.object({
  memberId: z.string().min(1, "Member ID is required"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof schema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  /* ---------- SUBMIT ---------- */
  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 800));
    toastSuccess(`Welcome ${data.memberId}`);
  };

  const onError = () => {
    toastError("Please fill required fields");

    if (errors.memberId) setFocus("memberId");
    else if (errors.password) setFocus("password");
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-bg relative overflow-hidden">
        {/* subtle background gradient */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        </div>

        {/* auth card */}
        <div className="relative w-full max-w-sm">
          <div className="bg-surface border border-border rounded-2xl shadow-xl p-8 space-y-6">

            {/* ---------- LOGO PLACEHOLDER ---------- */}
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-surface-muted border border-border flex items-center justify-center">
                <span className="text-text-muted text-sm">LOGO</span>
              </div>
            </div>

            {/* ---------- TITLE ---------- */}
            <div className="text-center space-y-1">
              <h1 className="text-xl font-semibold">Member Login</h1>
              <p className="text-sm text-text-muted">
                Access your campus portal
              </p>
            </div>

            {/* ---------- FORM ---------- */}
            <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className="space-y-4"
            >
              <FormField label="Member ID" error={errors.memberId?.message}>
                <Input placeholder="Enter member ID" {...register("memberId")} />
              </FormField>

              <FormField label="Password" error={errors.password?.message}>
                <Input
                    type="password"
                    placeholder="Enter password"
                    {...register("password")}
                />
              </FormField>

              <Button
                  type="submit"
                  variant="primary"
                  intent="fill"
                  className="w-full"
                  disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default LoginPage;