import { createSignal, type JSX } from "solid-js";

// para enviarle valores por defecto al counter desde el islands/index.astro necesitas una porperty
interface Props {
  initialValue: number;
  children?: JSX.Element;
}

// para recibir elementos de astro en la isla, tinees que hacer unas pequeñas modificaciones y tienes que añadir en las interfaces el children: JSX (importado de solid-js)

export const Counter = (props: Props) => {
  const [counter, setCounter] = createSignal(props.initialValue);

  return (
    <>
      {/* <h2 class="text-4xl">Counter</h2> */}
      {props.children}
      <h3 class="mt-4">Value: {counter()}</h3>

      <section
        class="flex gap-4 mt-4
    "
      >
        <button
          onclick={() => setCounter((prev) => ++prev)}
          class="bg-yellow-500 px-3 py-2 rounded-full text-lg"
        >
          +1
        </button>
        <button
          onclick={() => setCounter((prev) => --prev)}
          class="bg-yellow-500 px-3 py-2 rounded-full text-lg"
        >
          -1
        </button>
      </section>
    </>
  );
};
