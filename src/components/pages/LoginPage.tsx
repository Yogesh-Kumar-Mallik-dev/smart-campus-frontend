import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import FormField from "@components/ui/FormField";
import Input from "@components/ui/Input";
import Button from "@components/ui/Buttons";

import { toastError, toastSuccess } from "@/lib/toast";
import { API_BASE_URL } from "@/config/api";
import { setAuth } from "@/lib/auth";

import logo from "@/assets/logo_bbdit.png";

/* ---------- SCHEMA ---------- */
const schema = z.object({
  memberId: z.string().min(1, "Member ID is required"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof schema>;

const LoginPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch(
          `${API_BASE_URL}/api/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              identifier: data.memberId,
              password: data.password,
            }),
          }
      );

      const result = await response.json();

      if (!response.ok) {
        toastError(result.message || "Authentication failed");
        return;
      }

      // Securely store auth
      setAuth(result.token);

      toastSuccess(`Welcome ${result.user.name}`);

      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 1200);

    } catch {
      toastError("Unable to connect to server");
    }
  };

  const onError = () => {
    toastError("Please fill required fields");

    if (errors.memberId) setFocus("memberId");
    else if (errors.password) setFocus("password");
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-bg relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        </div>

        <div className="relative w-full max-w-sm">
          <div className="bg-surface border border-border rounded-2xl shadow-xl p-8 space-y-6">

            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-surface-muted border border-border flex items-center justify-center">
                <img
                    src={logo}
                    alt="Logo"
                    className="w-16 h-16 object-contain"
                />
              </div>
            </div>

            <div className="text-center space-y-1">
              <h1 className="text-xl font-semibold">Member Login</h1>
              <p className="text-sm text-text-muted">
                Access your campus portal
              </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className="space-y-4"
            >
              <FormField label="Member ID" error={errors.memberId?.message}>
                <Input
                    placeholder="Enter member ID"
                    {...register("memberId")}
                />
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