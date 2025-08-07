'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import type { Locale } from '@/middleware';
import { Button, Card, Input } from '@/components/ui';
import { useLogin } from '@/hooks/useLogin';

interface LoginFormProps {
  locale: Locale;
  dict: {
    auth: {
      signIn: string;
      signUp: string;
      email: string;
      password: string;
      rememberMe: string;
      forgotPassword: string;
      dontHaveAccount: string;
      emailRequired: string;
      emailInvalid: string;
      passwordRequired: string;
      passwordTooShort: string;
      loginFailed: string;
    };
    common: {
      loading: string;
    };
  };
}

export default function LoginForm({ locale, dict }: LoginFormProps) {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo') || undefined;

  const { formData, errors, isLoading, setEmail, setPassword, setRememberMe, handleSubmit } =
    useLogin({
      locale,
      returnTo,
      dict,
    });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{dict.auth.signIn}</h2>
          <p className="mt-2 text-sm text-gray-600">
            {dict.auth.dontHaveAccount}{' '}
            <Link
              href={`/${locale}/auth/register`}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {dict.auth.signUp}
            </Link>
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {errors.general}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {dict.auth.email}
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                error={errors.email}
                disabled={isLoading}
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {dict.auth.password}
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                error={errors.password}
                disabled={isLoading}
                className="mt-1"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRememberMe(e.target.checked)
                  }
                  disabled={isLoading}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  {dict.auth.rememberMe}
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href={`/${locale}/auth/forgot-password`}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {dict.auth.forgotPassword}
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              isLoading={isLoading}
              className="w-full"
            >
              {isLoading ? dict.common.loading : dict.auth.signIn}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
