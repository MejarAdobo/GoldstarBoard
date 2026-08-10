<script lang="ts">
  import { page } from "$app/state";

  let title = $state("");
  let desc = $state("");

  if (page.status === 500) {
    title = "Something went wrong";
    desc = "Our servers hit an unexpected bump. Please try returning to the main page.";
  } else if (page.status === 404) {
    title = "Page not found";
    desc = "The page you are looking for does not exist. Please return to the main page.";
  } else {
    title = "Error";
    desc = page.error?.message ?? "An unexpected error occurred. Please return to the main page.";
  }
</script>

<svelte:head>
  <title>{page.status}</title>
</svelte:head>

<main class="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
  <span class="text-text text-8xl font-extrabold tracking-tight opacity-20 select-none sm:text-9xl">
    {page.status}
  </span>

  <h1 class="text-text mt-6 mb-3 text-3xl font-semibold sm:text-4xl">{title}</h1>

  <p class="text-text/70 mb-8 max-w-md text-base sm:text-lg">{desc}</p>

  <a
    href="/"
    class="bg-primary hover:bg-tertiary hover:text-primary text-text rounded-[0.67em] px-6 py-3 text-lg font-semibold shadow-sm transition-colors duration-200"
  >
    Go to Leaderboard
  </a>
</main>
