<script lang="ts" setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <header class="py-5 shadow-md bg-slate-50 sticky top-0 blurry">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between">
        <RouterLink to="/">
          <img width="125" src="../assets/images/logo.png" />
        </RouterLink>
        <nav>
          <ul class="list-none flex items-center gap-5">
            <li>
              <router-link
                to="/"
                class="text-xl text-slate-700"
                exact-active-class="active-link"
              >
                Products
              </router-link>
            </li>
            <li>
              <router-link
                to="/categories"
                class="text-xl text-slate-700"
                active-class="active-link"
              >
                Categories
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup></script>
