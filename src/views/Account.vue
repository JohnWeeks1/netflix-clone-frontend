<template>
  <div>
    <Nav/>
    <Carousel/>
  </div>
</template>

<script>
import Nav from "@/components/partials/Nav";
import Carousel from "@/components/account/Carousel";

export default {
  name: 'Account',
  components: {
    Nav,
    Carousel
  },
  data() {
    return {
      options: {
        responsive: [
          {end: 576, size: 1},
          {start: 576, end: 768, size: 2},
          {start: 768, end: 992, size: 3},
          {size: 4}
        ],
        list: {
          // 1200 because @media (min-width: 1200px) and therefore I want to switch to windowed mode
          windowed: 1200,

          // Because: #app {padding: 80px 24px;}
          // padding: 24
        }
      },
      items: [
        {title: 'Item 0'},
        {title: 'Item 0'},
        {title: 'Item 0'},
        {title: 'Item 0'},
        {title: 'Item 0'},
        {title: 'Item 0'},
        {title: 'Item 0'}
      ]
    }
  }
};
</script>
