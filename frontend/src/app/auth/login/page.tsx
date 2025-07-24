'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext/AuthContext';
import { Card, CardContent } from '@/components/ui/Card/Card';
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import { FiBox, FiEye, FiEyeOff } from 'react-icons/fi';

export default function LoginPage() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      await login(formData);
      // Redirect will be handled by the auth context
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="bg-secondary-50 flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <FiBox className="text-primary-600 h-12 w-12" />
        </div>
        <h2 className="text-secondary-900 mt-6 text-center text-3xl font-bold">
          Sign in to your account
        </h2>
        <p className="text-secondary-600 mt-2 text-center text-sm">
          Or{' '}
          <a href="/auth/register" className="text-primary-600 hover:text-primary-500 font-medium">
            create a new account
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardContent className="px-6 py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.general && (
                <div className="bg-error-50 border-error-200 text-error-600 rounded-md border px-4 py-3">
                  {errors.general}
                </div>
              )}

              <Input
                label="Email address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
                autoComplete="email"
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="text-secondary-400 hover:text-secondary-600 absolute top-9 right-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                </button>
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
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="/auth/forgot-password"
                    className="text-primary-600 hover:text-primary-500 font-medium"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                isLoading={isLoading}
                disabled={!formData.email || !formData.password}
              >
                Sign in
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
