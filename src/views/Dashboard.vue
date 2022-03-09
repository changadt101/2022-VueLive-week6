<template>
  <DashboardNavbar></DashboardNavbar>

  <router-view></router-view>
</template>

<script>
import DashboardNavbar from '@/components/DashboardNavbar.vue';

export default {
  components: {
    DashboardNavbar,
  },
};
</script>
