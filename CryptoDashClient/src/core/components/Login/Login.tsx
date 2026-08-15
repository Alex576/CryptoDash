import { Button } from "#components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#components/ui/card";
import { Input } from "#components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/api/authApiSlice";
import { setCredentials } from "../../features/auth/authSlice";
import { useAppDispatch } from "../../store";

export interface LoginProps {
  prop?: string;
}

export function Login({ prop = "default value" }: LoginProps) {
  const [email, setEmail] = useState("admin@admin.com");
  const [password, setPassword] = useState("admin");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Хук возвращает функцию-триггер и объект с состоянием запроса
  const [login, { isLoading, error }] = useLoginMutation();

  const handleLogin = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      // unwrap() разворачивает результат, позволяя перехватить ошибку в блоке catch
      const userData = await login({ email, password }).unwrap();

      // Сохраняем полученные данные (user и token) в локальный стейт Redux
      dispatch(setCredentials(userData));

      navigate("/");
    } catch (err) {
      console.error("Ошибка авторизации:", err);
    }
  };
  return (
    <div className="flex h-full w-full items-center justify-center bg-slate-900 px-4 text-white">
      <Card className="w-full max-w-md bg-slate-950 border-slate-800 text-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Войти в CryptoDash
          </CardTitle>
          <CardDescription className="text-slate-400 text-center">
            Введите ваш email и пароль для доступа к портфелю
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-400 bg-red-950/50 border border-red-900 rounded-md text-center">
                Неверный email или пароль
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
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
              <label className="text-sm font-medium">Пароль</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-900 border-slate-800 text-white focus-visible:ring-indigo-500"
                disabled={isLoading}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition mt-2"
              disabled={isLoading}
            >
              {isLoading ? "Загрузка..." : "Войти"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
