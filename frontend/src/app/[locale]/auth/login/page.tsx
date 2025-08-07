import type { Locale } from '@/middleware';
import { getDictionary } from '@/dictionaries';
import { LoginForm } from '@/components/auth';

interface LoginPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return <LoginForm locale={locale} dict={dict} />;
}
