import { LoginForm } from "./components/LoginForm";

function LoginPage() {
  return (
    <main className="relative w-full h-dvh bg-white">
      <section className=" h-full p-4 tablet:p-5 flex items-center justify-center">
        <div className="w-full mx-auto tablet:w-md">
          <h2 className="text-2xl text-b tablet:text-3xl font-semibold text-center text-wrap mb-1">
            Welcome to
          </h2>
          <h1 className="text-2xl tablet:text-3xl font-semibold text-center text-wrap mb-5">
            Food Ordering Management
          </h1>
          <LoginForm />
        </div>
      </section>
      <footer className=" absolute bottom-0 w-full py-2 bg-gray-100">
        <p className="text-center text-sm text-gray-500">
          Made with ❤️ by NRC Dev | 2026
        </p>
      </footer>
    </main>
  );
}

export default LoginPage;
