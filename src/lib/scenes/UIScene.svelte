<script lang="ts">
  import { linear } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  import BigCloud from '$lib/components/clouds/BigCloud.svelte';
  import LongCloud from '$lib/components/clouds/LongCloud.svelte';
  import SmallCloud from '$lib/components/clouds/SmallCloud.svelte';
  import { DEFAULT_CLOUD_ANIMATION_DURATION } from '$lib/game/constants';

  let animationDuration = DEFAULT_CLOUD_ANIMATION_DURATION;
</script>

<main
  in:fly={{
    delay: 200,
    duration: 500,
    x: -window.innerWidth,
    opacity: 0.5,
    easing: linear,
  }}
>
  <SmallCloud {animationDuration} pause />
  <BigCloud {animationDuration} pause />
  <LongCloud {animationDuration} />

  <div class="content">
    <slot />
  </div>
</main>
