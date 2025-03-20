<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  

  <div class="h-screen w-full bg-purple-100 overflow-auto "> 
<div class="h-20  flex justify-center items-center">
  <button class=" bg-purple-500 text-white py-2 rounded m-2 w-full"><i class="fa fa-home text-1xl"></i> Dashboard</button>
  <button class=" bg-purple-500 text-white py-2 rounded m-2 w-full"><i class="fa fa-user text-1xl"></i> Clients</button>
  <button class=" bg-purple-500 text-white py-2 rounded m-2 w-full"><i class="fa fa-scissors text-1xl"></i> Tailors</button>
  <a href="#" class="text-purple-500"><i class="fa fa-comments m-4"></i></a>
  <a href="#"><i class="fa fa-sign-out m-4 text-purple-500"></i></a>
  
</div>
<div class="  h-screen p-5 flex flex-col ">
  <div class="bg-purple-200 h-80 flex flex-col rounded m-1 p-4">
  
  <!-- Title & Icon -->
  <div class="h-10 flex justify-between">
    <div class="text-2xl">Total Appointments</div>
    <div><i class="fa-solid fa-calendar-days text-purple-600 text-4xl"></i></div>
  </div>

  <!-- Chart Placeholder (takes up flex space) -->
   <div class="flex-1 flex justify-center items-center">
      <canvas ref="chartCanvas"></canvas>
    </div>

  <!-- Number & Growth Percentage -->
  <div class="h-10 flex justify-between">
    <span class="text-2xl px-3">224</span>
    <div class="flex items-center">
      <i class="fa-solid fa-arrow-up text-green-600 text-3xl"></i>
      <span class="text-2xl p-2">12%</span>
    </div>
  </div>

  

</div>


  <div class="bg-purple-200 h-80 flex flex-col rounded m-1 p-4">
    <!-- Header -->
    <div class="h-10 flex justify-between">
      <div class="text-2xl p-3">Total Revenue</div>
      <div><i class="fa-solid fa-bank text-purple-600 text-4xl p-2"></i></div>
    </div>

    <!-- Bar Chart -->
    <div class="flex-1 flex justify-center items-center">
      <canvas ref="revenueChart"></canvas>
    </div>

    <!-- Footer -->
    <div class="h-10 flex justify-between">
      <span class="text-2xl px-3">KES 240,000</span>
      <div class="flex items-center">
        <i class="fa-solid fa-arrow-up text-green-600 text-3xl"></i>
        <span class="text-2xl p-2">8%</span>
      </div>
    </div>

  </div>

  <div class="bg-purple-200 h-80  flex flex-col rounded m-1">
    <!-- header -->
    <div class=" h-10  flex justify-between">
<div class="text-2xl p-3"> New Clients</div>
<div><i class="fa-solid fa-user text-purple-600 text-4xl p-2 "></i></div>
</div>
<!-- chart -->
<div class="flex-1 flex justify-center items-center">
  <canvas ref="clientsChart"></canvas>
</div>

<!-- footer -->
<div class=" h-10  flex justify-between">
<span class="text-2xl px-3"> 1500</span>
<div class="flex items-center">
  <i class="fa-solid fa-arrow-down text-red-600 text-3xl "></i>
<span class="text-2xl p-2">2%</span></div>
</div>

  </div>

  <div class="bg-purple-200 h-80  flex flex-col rounded m-1">
    <!-- header -->
    <div class=" h-10  flex justify-between">
<div class="text-2xl p-3"> New Tailors</div>
<div><i class="fa-solid fa-scissors text-purple-600 text-3xl p-2 "></i></div>
</div>

<!-- chart -->
<div class="flex-1 flex justify-center items-center">
  <canvas ref="tailorsChart"></canvas>
</div>

<!-- footer -->
<div class=" h-10  flex justify-between">
<span class="text-2xl px-3"> 100</span>
<div class="flex items-center">
  <i class="fa-solid fa-arrow-down text-red-600 text-3xl  "></i>
<span class="text-2xl p-2">50%</span></div>
</div>

  </div>






</div>

  </div>
</template>

<!-- chart.js implementation -->

<script setup>
import { onMounted, ref } from "vue";
import Chart from "chart.js/auto";

// initialization for ref in each row

const chartCanvas = ref(null);
const revenueChart = ref(null);
const clientsChart = ref(null);
const tailorsChart = ref(null);

onMounted(() => {
  // chartcanvas
  if (chartCanvas.value) {
    new Chart(chartCanvas.value, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "july", "sep", "oct", "nov", "dec"],
        datasets: [
          {
            label: "Appointments",
            data: [50000, 40000, 30000, 60000, 20000, 40000, 60000, 70000, 90000, 100000, 150000],
            backgroundColor: "rgba(153, 102, 255, 0.6)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 2,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  //  revenueChart

  if (revenueChart.value) {
    new Chart(revenueChart.value, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "july", "sep", "oct", "nov", "dec"],
        datasets: [
          {
            label: "Revenue (KES)",
            data: [50000, 40000, 30000, 60000, 20000, 40000, 60000, 70000, 90000, 100000, 150000],
            backgroundColor: "rgba(153, 102, 255, 0.6)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  // clientsChart

  if (clientsChart.value) {
    new Chart(clientsChart.value, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "july", "sep", "oct", "nov", "dec"],
        datasets: [
          {
            label: "no of New Clients",
            data: [480, 1000, 346, 1500, 1559, 1299, 1200, 1300, 1500, 1100, 700, 500],
            backgroundColor: "rgba(153, 102, 255, 0.6)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 2,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },   
    });
  }

  // tailorsChart

  if (tailorsChart.value) {
    new Chart(tailorsChart.value, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "july", "sep", "oct", "nov", "dec"],
        datasets: [
          {
            label: "no of new tailors",
            data: [1480, 10000, 16006, 15000, 9000, 8100, 7500, 7100, 6500, 5500, 2500, 1000 ],
            backgroundColor: "rgba(153, 102, 255, 0.6)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }


});
</script>