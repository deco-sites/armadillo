import { useUser } from "apps/vtex/hooks/useUser.ts";

export default function User() {
  const { user } = useUser();

  const username = user?.value?.name ?? user?.value?.givenName ??
    user?.value?.email ?? "";

  return (
    <>
      {user.value
        ? (
          <label tabIndex={0} class="font-bold uppercase text-xs truncate">
            Olá, {username?.substring(0, 10)?.concat("...")}
          </label>
        )
        : (
          <a
            href="/login"
            aria-label="go to login"
            tabIndex={0}
            class="font-bold uppercase text-xs"
          >
            Login
          </a>
        )}
    </>
  );
}
