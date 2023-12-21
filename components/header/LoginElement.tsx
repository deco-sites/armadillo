import User from "$store/islands/User.tsx";

export default function LoginElement() {
  return (
    <div class="dropdown dropdown-hover dropdown-end">
      <User />

      <ul
        tabIndex={0}
        class="dropdown-content translate-x-[25%] z-[1] shadow bg-base-100 rounded-none w-48 text-black font-semibold pb-2 pt-5 uppercase text-[13px] tracking-[1px]"
      >
        <li class="flex hover:bg-[#3cb14e] py-0.5 pl-2 my-3 w-full">
          <a href="/account" class="flex w-full">Minha Conta</a>
        </li>

        <li class="flex hover:bg-[#3cb14e] py-0.5 pl-2 my-3 w-full">
          <a href="/account/orders" class="flex w-full">Meus Pedidos</a>
        </li>
      </ul>
    </div>
  );
}
