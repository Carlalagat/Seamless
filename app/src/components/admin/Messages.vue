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

  <div class="flex-1 flex bg-purple-100 ml-1 mt-1 rounded overflow-auto relative">
    <div class="absolute ml-4 mt-6">
      <h1 class="text-2xl ">MESSAGES</h1>
    </div>

    <div class="relative z-10 bg-slate-100 text-white mt-16 ml-3 h-full w-64 rounded-lg shadow-lg overflow-auto">
  <!-- Title Section -->
  <div class="flex justify-between items-center p-4 border-b ">
    <button class="bg-purple-500 text-white px-6 py-1 rounded"><strong>+</strong> Compose</button>
  </div>

  <!-- Email Section -->
  <div class="mt-4 space-y-4 px-4">
  <!-- Repeated list item -->
  <div class="flex items-center justify-between">
    <i class="fa fa-inbox text-purple-500"></i>
    <span class="text-black mr-8 w-32 text-left ml-1">Tenma</span>
    <span class="bg-purple-300 text-white px-2 py-1 rounded text-sm">1253</span>
  </div>
  <div class="flex items-center justify-between">
    <i class="fa fa-inbox text-purple-500"></i>
    <span class="text-black mr-8 w-32 text-left ml-1">Hoop</span>
    <span class="bg-purple-300 text-white px-2 py-1 rounded text-sm">1253</span>
  </div>
  <div class="flex items-center justify-between">
    <i class="fa fa-inbox text-purple-500"></i>
    <span class="text-black mr-8 w-32 text-left ml-1">Ashton</span>
    <span class="bg-purple-300 text-white px-2 py-1 rounded text-sm">1253</span>
  </div>
  <div class="flex items-center justify-between">
    <i class="fa fa-inbox text-purple-500"></i>
    <span class="text-black mr-8 w-32 text-left ml-1">Hall</span>
    <span class="bg-purple-300 text-white px-2 py-1 rounded text-sm">1253</span>
  </div>
  <div class="flex items-center justify-between">
    <i class="fa fa-inbox text-purple-500"></i>
    <span class="text-black mr-8 w-32 text-left ml-1">Lebron</span>
    <span class="bg-purple-300 text-white px-2 py-1 rounded text-sm">1253</span>
  </div>
  <div class="flex items-center justify-between">
    <i class="fa fa-inbox text-purple-500"></i>
    <span class="text-black mr-8 w-32 text-left ml-1">James</span>
    <span class="bg-purple-300 text-white px-2 py-1 rounded text-sm">1253</span>
  </div>
  <div class="flex items-center justify-between">
    <i class="fa fa-inbox text-purple-500"></i>
    <span class="text-black mr-5 w-32 text-left ml-1">Dr.Tenma</span>
    <span class="bg-purple-300 text-white px-2 py-1 rounded text-sm">1253</span>
  </div>
</div>



  <!-- Labels Section -->
  <div class="mt-6 px-4 space-y-4">
    <h2 class="text-black text-sm font-semibold">Label</h2>
    <div class="flex items-center">
      <span class="w-3 h-3 bg-teal-500 rounded-full"></span>
      <span class="ml-2 text-black text-sm">Tailors</span>
    </div>
    <div class="flex items-center">
      <span class="w-3 h-3 bg-purple-500 rounded-full"></span>
      <span class="ml-2  text-black text-sm">Clients</span>
    </div>
    <div class="flex items-center">
      <span class="w-3 h-3 bg-pink-500 rounded-full"></span>
      <span class="ml-2  text-black text-sm">Advertisements</span>
    </div>
    
  </div>

  <!-- Footer Section -->
  <div class="mt-4 px-4">
    <button class="text-sm text-gray-500 hover:text-black">+ Create New Label</button>
  </div>
</div>


    <div class="relative z-10 bg-slate-100 mt-16 ml-3 h-full w-full  rounded">
      
    </div>
    

  </div>
  
  
     
    </div>
  </template>
  
  
  