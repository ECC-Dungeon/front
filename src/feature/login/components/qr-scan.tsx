import { useQrScanner } from '@/hooks/use-qr-scanner';
import { Form, Input } from '@/components/ui/form';
import { useLogin, loginInputSchema } from '@/lib/auth';

type LoginFormProps = {
  onSuccess: () => void;
};

export const QrScan = ({ onSuccess }: LoginFormProps) => {
  const { videoRef, canvasRef, result, error } = useQrScanner();

  const login = useLogin({
    onSuccess,
  });

  return (
    <section>
      {!result && (
        <div className="size-72">
          <div className="relative h-72 w-72">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="absolute left-0 top-0 -z-50 h-72 w-72"
            />
            <canvas
              ref={canvasRef}
              width="288"
              height="288"
              className="absolute left-0 top-0"
            />
          </div>
        </div>
      )}
      {error && <p className="text-center text-xs text-red-500">{error}</p>}
      {!result && !error && (
        // TODO: ローディングコンポーネントに切り替える
        <p className="text-center text-gray-500">読み取り中...</p>
      )}
      {result && (
        <div>
          <p className="text-center text-gray-500">{result}</p>
          {/* TODO: 仮のフォーム */}
          <Form
            onSubmit={(values) => {
              login.mutate(values);
            }}
            schema={loginInputSchema}
          >
            {({ register, formState }) => (
              <>
                <Input
                  type="email"
                  label="Email Address"
                  error={formState.errors['email']}
                  registration={register('email')}
                  // value={"222@gmail.com"}
                />
                <Input
                  type="password"
                  label="Password"
                  error={formState.errors['password']}
                  registration={register('password')}
                  value={"testtest"}
                />
                <div>
                  <button
                    type="submit"
                    className="w-full"
                  >
                    Log in
                  </button>
                </div>
              </>
            )}
          </Form>
        </div>
      )}
    </section>
  );
};
