<script lang="ts">
  import HamburgerMenu from "./HamburgerMenu.svelte";
  import Toggle from "./Toggle.svelte";

  const links = [
    { name: "Leaderboard", url: "/" },
    { name: "Award", url: "/award" },
  ];
</script>

<header class="mx-2 my-1 flex items-center justify-between">
  <a class="text-2xl font-semibold lg:text-[1.75em]" href="/">GoldStarboard</a>

  <!-- Desktop Nav -->
  <nav class="hidden items-center gap-6 font-semibold lg:flex">
    {#each links as link}
      <a href={link.url} class="transition-colors hover:text-text text-muted-text">
        {link.name}
      </a>
    {/each}
    <Toggle />
  </nav>

  <!-- Mobile Nav -->
  <HamburgerMenu>
    {#each links as link}
      <a href={link.url} class="transition-colors hover:text-text text-muted-text">
        {link.name}
      </a>
    {/each}
    <div class="border-secondary border-t pt-4">
      <Toggle />
    </div>
  </HamburgerMenu>
</header>
