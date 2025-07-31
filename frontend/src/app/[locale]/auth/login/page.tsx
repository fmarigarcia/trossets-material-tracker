import type { Locale } from '@/middleware';
import { getDictionary } from '@/dictionaries';
import Link from 'next/link';

interface LoginPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="bg-secondary-50 flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="text-secondary-900 mt-6 text-center text-3xl font-extrabold">
            {dict.auth.signIn}
          </h2>
          <p className="text-secondary-600 mt-2 text-center text-sm">
            {dict.auth.dontHaveAccount}{' '}
            <Link
              href={`/${locale}/auth/register`}
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              {dict.auth.signUp}
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                {dict.auth.email}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="border-secondary-300 placeholder-secondary-500 text-secondary-900 focus:ring-primary-500 focus:border-primary-500 relative block w-full appearance-none rounded-none rounded-t-md border px-3 py-2 focus:z-10 focus:outline-none sm:text-sm"
                placeholder={dict.auth.email}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                {dict.auth.password}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="border-secondary-300 placeholder-secondary-500 text-secondary-900 focus:ring-primary-500 focus:border-primary-500 relative block w-full appearance-none rounded-none rounded-b-md border px-3 py-2 focus:z-10 focus:outline-none sm:text-sm"
                placeholder={dict.auth.password}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="text-primary-600 focus:ring-primary-500 border-secondary-300 h-4 w-4 rounded"
              />
              <label htmlFor="remember-me" className="text-secondary-900 ml-2 block text-sm">
                {dict.auth.rememberMe}
              </label>
            </div>

            <div className="text-sm">
              <Link
                href={`/${locale}/auth/forgot-password`}
                className="text-primary-600 hover:text-primary-500 font-medium"
              >
                {dict.auth.forgotPassword}
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 relative flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              {dict.auth.signIn}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
