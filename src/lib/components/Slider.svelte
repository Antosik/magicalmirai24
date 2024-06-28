<!-- @component Slider component -->

<script lang="ts" generics="T">
  import { createEventDispatcher, onMount } from 'svelte';

  /** Slider items */
  export let items: T[] = [];
  /** Is slider looped */
  export let loop = false;

  let slider: HTMLUListElement;
  let activeElement: HTMLLIElement;
  let previousElement: HTMLLIElement | null;
  let nextElement: HTMLLIElement | null;

  const dispatch = createEventDispatcher<{
    change: T;
  }>();

  function setActiveElement(element: HTMLLIElement) {
    activeElement = element;
    dispatch('change', items[Number(element.dataset.index)]);
    calculateNeighbours();
  }

  function calculateNeighbours() {
    previousElement = (activeElement.previousElementSibling ??
      (loop ? slider.lastChild : null)) as HTMLLIElement;
    nextElement = (activeElement.nextElementSibling ??
      (loop ? slider.firstChild : null)) as HTMLLIElement;
  }

  function toPrevious() {
    if (previousElement) {
      setActiveElement(previousElement);
      activeElement.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  }

  function toNext() {
    if (nextElement) {
      setActiveElement(nextElement);
      activeElement.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  }

  onMount(() => {
    setActiveElement(slider.firstChild as HTMLLIElement);

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries.find((el) => el.isIntersecting);
        if (activeEntry && activeEntry.target) {
          setActiveElement(activeEntry.target as HTMLLIElement);
        }
      },
      {
        root: slider,
        threshold: 1,
      },
    );
    Array.from(slider.children).forEach((node) => {
      observer.observe(node);
    });
  });
</script>

<div>
  <button type="button" on:click={toPrevious} disabled={!previousElement}>
    <img src="../images/arrow.svg" class="arrow arrow--left" alt="" width="24" height="24" />
  </button>
  <ul bind:this={slider}>
    {#each items as item, index}
      <li data-index={index}>
        <slot {item} {index} active={activeElement?.dataset?.index === index.toString()} />
      </li>
    {:else}
      <slot name="raw" />
    {/each}
  </ul>
  <button type="button" on:click={toNext} disabled={!nextElement}>
    <img src="../images/arrow.svg" class="arrow arrow--right" alt="" width="24" height="24" />
  </button>
</div>

<style lang="scss">
  div {
    @include flex_vcenter;

    width: min-content;
    max-width: calc(100% - grid(4));
    height: 100%;
    flex: 0 1;
    margin: 0 auto;
  }

  button {
    @include flex_center;

    padding: grid(1);
    border: none;
    background: none;
    transition: transform 200ms ease-in-out;

    &:hover {
      transform: scale(1.2);
    }

    &:disabled {
      visibility: hidden;
    }
  }

  ul {
    display: flex;
    width: 100%;
    height: 100%;
    gap: grid(5);
    overflow-x: auto;
    overscroll-behavior-x: contain;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
  }

  li {
    @include flex_center;

    width: 100%;
    height: 100%;
    flex-grow: 1;
    flex-shrink: 0;
    scroll-snap-align: center;
    scroll-snap-stop: always;
  }

  .arrow--right {
    transform: rotate(180deg);
  }
</style>
