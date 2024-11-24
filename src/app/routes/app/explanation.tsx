import { useUser } from '@/lib/auth';

export const ExplanationRoute = () => {
   const user = useUser();

   if (!user.data) return null;
  return <div>Explanation</div>;
};
