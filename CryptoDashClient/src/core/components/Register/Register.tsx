import React, { useState } from "react";

import { Button } from "#components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#components/ui/card";
import { Input } from "#components/ui/input";
import { useRegisterMutation } from "@/core/features/auth/api/authApiSlice";
import { useAppDispatch } from "@/core/store";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export interface RegisterProps {
  prop?: string;
}

export function Register({ prop = "default value" }: RegisterProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Хук возвращает функцию-триггер и объект с состоянием запроса
  const [register, { isLoading, error }] = useRegisterMutation();

  const handleRegister = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      // unwrap() разворачивает результат, позволяя перехватить ошибку в блоке catch
      const userData = await register({ email, password }).unwrap();
      if (userData.isSuccess) {
        navigate("/login");
      }
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  const isDifferentPasswords = password !== repeatPassword;

  return (
    <div className="flex h-full w-full items-center justify-center bg-slate-900 px-4 text-white">
      <Card className="w-full max-w-md bg-slate-950 border-slate-800 text-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {t("Register.Title")}
          </CardTitle>
          <CardDescription className="text-slate-400 text-center">
            {t("Register.Description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-400 bg-red-950/50 border border-red-900 rounded-md text-center">
                {t("Register.Errors.BadPasswordOrEmail")}
              </div>
            )}
            {isDifferentPasswords && (
              <div className="p-3 text-sm text-red-400 bg-red-950/50 border border-red-900 rounded-md text-center">
                {t("Register.Errors.DifferentPasswords")}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("Control.Email")}
              </label>
              <Input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-900 border-slate-800 text-white focus-visible:ring-indigo-500"
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("Control.Password")}
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-900 border-slate-800 text-white focus-visible:ring-indigo-500"
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("Control.RepeatPassword")}
              </label>
              <Input
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                className="bg-slate-900 border-slate-800 text-white focus-visible:ring-indigo-500"
                disabled={isLoading}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition mt-2"
              disabled={isLoading || isDifferentPasswords}
            >
              {isLoading ? t("Form.Loading") : t("Button.Register")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
