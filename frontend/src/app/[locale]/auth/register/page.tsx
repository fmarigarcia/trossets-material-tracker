import type { Locale } from '@/middleware';
import { getDictionary } from '@/dictionaries';
import { RegisterForm } from '@/components/auth';

interface RegisterPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return <RegisterForm locale={locale} dict={dict} />;
}
