<template>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
    />
  
    <div class="flex h-screen">
      <!-- Sidebar -->
      <div class="text-sm w-1/5 md:w-[16%] lg:w-[10%] w-70 bg-purple-100 p-4 flex flex-col items-center md:items-start rounded mt-1">
    
    <RouterLink
      to="/admin-dashboard"
      class="bg-purple-500 text-white py-2 px-1 rounded my-2 mx-1 w-full flex flex-col md:flex-row items-center text-sm md:text-base"
      active-class="bg-purple-700"
    >
      <i class="fa fa-home text-sm"></i>
      <span class="md:ml-1 text-sm">Dashboard</span>
    </RouterLink>
  
    <RouterLink
      to="/clients"
      class="bg-purple-500 text-white py-2 px-1 rounded my-2 mx-1 w-full flex flex-col md:flex-row items-center text-sm md:text-base"
      active-class="bg-purple-700"
    >
      <i class="fa fa-user text-sm"></i>
      <span class="md:ml-2 text-sm">Clients</span>
    </RouterLink>
  
    <RouterLink
      to="/tailors"
      class="bg-purple-500 text-white py-2 px-1 rounded my-2 mx-1 w-full flex flex-col md:flex-row items-center text-sm md:text-base"
      active-class="bg-purple-700"
    >
      <i class="fa fa-scissors text-sm"></i>
      <span class="md:ml-2 text-sm">Tailors</span>
    </RouterLink>
  
    <RouterLink
      to="/messages"
      class="bg-purple-500 text-white py-2 px-1 rounded my-2 mx-1 w-full flex flex-col md:flex-row items-center text-sm md:text-base"
      active-class="bg-purple-700"
    >
      <i class="fa fa-comments text-sm"></i>
      <span class="md:ml-1 text-sm">Messages</span>
    </RouterLink>
  
  </div>

  <div class="flex-1 bg-purple-100 ml-1 mt-1 rounded overflow-auto relative">
    <div class="absolute ml-4 mt-6">
      <h1 class="text-2xl ">MESSAGES</h1>
    </div>

    <div class="absolute">
      <h1>tried</h1>
    </div>
    

  </div>
  
  
     
    </div>
  </template>
  
  
  