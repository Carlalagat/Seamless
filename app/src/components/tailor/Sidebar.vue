<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
  />

  <!-- Sidebar Overlay (Mobile) -->
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black opacity-50 md:hidden"
    @click="toggleSidebar"
  ></div>

  <!-- Sidebar -->
  <aside
    :class="[ 
      'bg-gray-200 h-screen p-6 shadow-lg fixed md:static transition-transform duration-300',
      isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
    ]"
    :style="{ height: isMobile && isOpen ? '' : '100vh' }"
  >
    <!-- Close Button (Mobile) -->
    <button
      @click="toggleSidebar"
      class="absolute top-4 right-4 md:hidden text-gray-600"
      aria-label="Close sidebar"
    >
      <font-awesome-icon icon="times" class="text-2xl" />
    </button>

    <!-- Logo linking to Client Dashboard -->
    <RouterLink to="/client-dashboard" class="flex items-center space-x-2">
      <img src="@/assets/logo.png" alt="SeamLess" class="w-40 center" />
    </RouterLink>

    <!-- Navigation Menu -->
    <nav class="mt-8">
      <ul>
        <li
          v-for="(item, index) in menuItems"
          :key="index"
          class="flex items-center gap-2 p-3 rounded-lg cursor-pointer hover:text-purple-700 transition duration-500"
          @click="setActiveContent(item.content)"
        >
          <component :is="item.icon" />
          {{ item.name }}
        </li>
      </ul>
    </nav>

    <!-- Profile Section -->
    <div class="mt-12 border-t pt-4">
      <div 
        class="flex items-center space-x-3 cursor-pointer hover:bg-gray-300 p-2 rounded-lg transition duration-200"
        @click="navigateToProfile"
      >
        <div class="flex flex-col space-y-4">
          <div 
            v-if="!user.profileImage"
            class="rounded-full w-10 h-10 bg-gray-400 flex items-center justify-center text-white font-bold text-xl"
          >
            {{ userInitials }}
          </div>
          <img
            v-else
            :src="user.profileImage"
            class="rounded-full w-10 h-10 object-cover"
            :alt="user.username"
          />
          <h4 class="font-semibold">{{ user.username }}</h4>
          <p class="text-xs text-gray-500">{{ user.email }}</p>
          <button
            @click.stop="logout"
            class="text-white bg-red-600 shadow-lg p-2 space-x-2 rounded items-center justify-center flex font-bold hover:bg-red-700 transition duration-200"
            id="logout"
          >
            <i class="fa fa-sign-out"></i> <p>Logout</p>
          </button>
        </div>
      </div>
    </div>
  </aside>

  <!-- Main Content Area -->
  <div class="w-full p-6" id="maincontent" v-show="activeContent.name !== 'Dashboard'">
    <!-- Profile Content (shown when profile is active) -->
    <div v-if="showProfile" class="profile-content">
      <h1 class="text-2xl font-semibold mb-6 text-center">My Profile</h1>
      
      <div class="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
        <div class="flex flex-col md:flex-row gap-6">
          <!-- Profile Picture Section -->
          <div class="flex flex-col items-center">
            <div class="relative mb-4">
              <div 
                v-if="!user.profileImage"
                class="rounded-full w-32 h-32 bg-gray-400 flex items-center justify-center text-white font-bold text-4xl"
              >
                {{ userInitials }}
              </div>
              <img
                v-else
                :src="user.profileImage"
                class="rounded-full w-32 h-32 object-cover border-4 border-purple-200"
                :alt="user.username"
              />
              <button 
                @click="triggerFileInput"
                class="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition duration-200"
              >
                <i class="fas fa-camera"></i>
              </button>
              <input 
                type="file" 
                ref="fileInput"
                class="hidden"
                accept="image/*"
                @change="handleProfileImageChange"
              />
            </div>
            <h2 class="text-xl font-bold">{{ user.username }}</h2>
            <p class="text-gray-600">{{ user.email }}</p>
          </div>

          <!-- Profile Form -->
          <div class="flex-1">
            <form @submit.prevent="updateProfile">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    v-model="profileForm.firstName"
                    type="text"
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    v-model="profileForm.lastName"
                    type="text"
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  >
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    v-model="profileForm.email"
                    type="email"
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  >
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    v-model="profileForm.bio"
                    rows="3"
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  ></textarea>
                </div>
              </div>

              <div class="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  @click="showProfile = false"
                  class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Original Content (shown when not viewing profile) -->
    <div v-else>
      <!-- Rest of your existing content for Orders, Products, etc. -->
      <h1 class="text-2xl font-semibold">{{ activeContent.title }}</h1>

      <!-- Display Orders when Orders Section is Active -->
      <div v-if="activeContent.name === 'Orders'" class="mt-6">
  <div class="flex justify-between items-center mb-6">
    <div>
      
      <p class="text-gray-500">Review and track your recent purchases</p>
    </div>
    <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition duration-200">
      <i class="fas fa-plus mr-2"></i>New Order
    </button>
  </div>

  <!-- Order Filter/Search -->
  <div class="bg-white p-4 rounded-lg shadow-sm mb-6">
    <div class="flex flex-col md:flex-row gap-4">
      <div class="relative flex-1">
        <input 
          type="text" 
          placeholder="Search orders..." 
          class="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
        >
        <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
      </div>
      <select class="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-200 focus:border-purple-500">
        <option>All Statuses</option>
        <option>Processing</option>
        <option>Completed</option>
        <option>Cancelled</option>
      </select>
      <select class="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-200 focus:border-purple-500">
        <option>Sort by: Newest</option>
        <option>Sort by: Oldest</option>
        <option>Sort by: Price (High-Low)</option>
        <option>Sort by: Price (Low-High)</option>
      </select>
    </div>
  </div>

  <!-- Orders List -->
  <div class="space-y-4">
    <!-- Order Card 1 -->
    <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition duration-200">
      <div class="p-5">
        <div class="flex justify-between items-start">
          <div>
            <div class="flex items-center">
              <span class="font-bold text-lg text-gray-800">Order #12345</span>
              <span class="ml-3 px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">Completed</span>
            </div>
            <p class="text-sm text-gray-500 mt-1">
              <i class="far fa-calendar-alt mr-1"></i>Placed on March 20, 2025
            </p>
          </div>
          <button class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-ellipsis-v"></i>
          </button>
        </div>

        <div class="mt-4 border-t pt-4">
          <div class="flex flex-col md:flex-row gap-4">
            <!-- Product Images -->
            <div class="flex -space-x-2">
              <div class="w-16 h-16 rounded-lg border-2 border-white bg-gray-100 overflow-hidden shadow-sm">
                <img src="@/assets/images/designersuit.png" alt="Product" class="w-full h-full object-cover">
              </div>
              <div class="w-16 h-16 rounded-lg border-2 border-white bg-gray-100 overflow-hidden shadow-sm">
                <img src="" alt="Product" class="w-full h-full object-cover">
              </div>
            </div>
            
            <!-- Product Details -->
            <div class="flex-1">
              <h4 class="font-semibold text-gray-700 mb-2">Ordered Items (2)</h4>
              <ul class="space-y-2">
                <li class="flex justify-between">
                  <span class="text-gray-600">Men's Designer Suit</span>
                  <span class="font-medium">$29.99</span>
                </li>
                <li class="flex justify-between">
                  <span class="text-gray-600">Women's Blazer</span>
                  <span class="font-medium">$49.99</span>
                </li>
              </ul>
            </div>
            
            <!-- Order Summary -->
            <div class="md:w-48">
              <div class="bg-gray-50 p-3 rounded-lg">
                <div class="flex justify-between mb-1">
                  <span class="text-gray-600">Subtotal:</span>
                  <span>$79.98</span>
                </div>
                <div class="flex justify-between mb-1">
                  <span class="text-gray-600">Shipping:</span>
                  <span>$5.99</span>
                </div>
                <div class="flex justify-between font-semibold text-gray-800 border-t pt-2 mt-2">
                  <span>Total:</span>
                  <span>$85.97</span>
                </div>
              </div>
              <button class="w-full mt-3 bg-purple-100 hover:bg-purple-200 text-purple-700 py-2 rounded-lg text-sm font-medium transition duration-200">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Order Card 2 -->
    <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition duration-200">
      <div class="p-5">
        <div class="flex justify-between items-start">
          <div>
            <div class="flex items-center">
              <span class="font-bold text-lg text-gray-800">Order #12346</span>
              <span class="ml-3 px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">Processing</span>
            </div>
            <p class="text-sm text-gray-500 mt-1">
              <i class="far fa-calendar-alt mr-1"></i>Placed on March 19, 2025
            </p>
          </div>
          <button class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-ellipsis-v"></i>
          </button>
        </div>

        <div class="mt-4 border-t pt-4">
          <div class="flex flex-col md:flex-row gap-4">
            <!-- Product Images -->
            <div class="flex -space-x-2">
              <div class="w-16 h-16 rounded-lg border-2 border-white bg-gray-100 overflow-hidden shadow-sm">
                <img src="" alt="Product" class="w-full h-full object-cover">
              </div>
            </div>
            
            <!-- Product Details -->
            <div class="flex-1">
              <h4 class="font-semibold text-gray-700 mb-2">Ordered Items (1)</h4>
              <ul class="space-y-2">
                <li class="flex justify-between">
                  <span class="text-gray-600">Tailored Trousers</span>
                  <span class="font-medium">$39.99</span>
                </li>
              </ul>
            </div>
            
            <!-- Order Summary -->
            <div class="md:w-48">
              <div class="bg-gray-50 p-3 rounded-lg">
                <div class="flex justify-between mb-1">
                  <span class="text-gray-600">Subtotal:</span>
                  <span>$39.99</span>
                </div>
                <div class="flex justify-between mb-1">
                  <span class="text-gray-600">Shipping:</span>
                  <span>Free</span>
                </div>
                <div class="flex justify-between font-semibold text-gray-800 border-t pt-2 mt-2">
                  <span>Total:</span>
                  <span>$39.99</span>
                </div>
              </div>
              <button class="w-full mt-3 bg-purple-100 hover:bg-purple-200 text-purple-700 py-2 rounded-lg text-sm font-medium transition duration-200">
                Track Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Pagination -->
  <div class="mt-8 flex justify-center">
    <nav class="flex items-center space-x-2">
      <button class="w-10 h-10 flex items-center justify-center rounded-lg border text-gray-500 hover:bg-gray-100">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button class="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-600 text-white font-medium">1</button>
      <button class="w-10 h-10 flex items-center justify-center rounded-lg border text-gray-700 hover:bg-gray-100">2</button>
      <button class="w-10 h-10 flex items-center justify-center rounded-lg border text-gray-700 hover:bg-gray-100">3</button>
      <span class="px-2">...</span>
      <button class="w-10 h-10 flex items-center justify-center rounded-lg border text-gray-700 hover:bg-gray-100">8</button>
      <button class="w-10 h-10 flex items-center justify-center rounded-lg border text-gray-500 hover:bg-gray-100">
        <i class="fas fa-chevron-right"></i>
      </button>
    </nav>
  </div>
</div>
      <div v-if="activeContent.name === 'Products'">
        <h1 class="text-center font-bold text-3xl">Manage Products</h1>
        <div class="h-screen w-full flex flex-col gap-3 overflow-auto p-[30px]">
         <div class=" flex justify-center items-center  " >
          <form action="" class="flex flex-col p-[30px] bg-white  rounded shadow-lg">
              <h1 class=" font-bold text-2xl text-center my-3">Post Your Designs</h1>
              <input type="file" class="my-1 p-[10px] border border-purple-300 rounded" accept="image/jpg, image/png, image/jpeg" required >
              <input type="text"  class="my-1 p-[10px] rounded shadow-lg border border-purple-300"  placeholder="Design" required>
              <textarea class="resize-none my-1 p-[10px] rounded shadow-lg border border-purple-300"  name="" id="" cols="30" rows="10" placeholder="Description"></textarea>
              <button type="submit" class="bg-purple-700 p-[10px] rounded text-white font-bold shadow-lg" >UPLOAD</button>
  
          </form>
         </div> 
      
      <div class=" shadow-lg rounded  grid grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] gap-3    " >
          
          <div class=" w-[400px] bg-fuchsia-100 rounded-lg shadow-lg h-[400px]  p-[20px] m-[15px]">
              <img
                  :src="TuxedoImage"
                  alt="tuxedo Image"
                  class="w-full  rounded-lg h-[200px] items-center justify-center "
                />
              <h1 class="font-bold text-2xl my-[7px]">Men's Designer Suit</h1>
              <p class="text-sm my-[7px]">Specializing in bespoke suits and formal wear</p>
              <div class="flex mt-[30px]">
                  <button class="bg-purple-600 w-full p-[10px] m-[10px] text-white rounded hover:bg-purple-400 hover:text-black  transition duration-500">Update</button>
                  <button class="bg-stone-600  w-full  p-[10px] m-[10px] text-white rounded hover:bg-red-600 hover:text-white  transition duration-500">Delete</button>
              </div>
  
  
          </div>
          <div  class=" w-[400px] bg-fuchsia-100 rounded-lg shadow-lg h-[400px]  p-[20px] m-[15px]">
              <img
                  :src="Blazerimage"
                  alt="tuxedo Image"
                  class="w-full  rounded-lg h-[200px] items-center justify-center "
                />
              <h1 class="font-bold text-2xl my-[7px]">Women's Blazer</h1>
              <p class="text-sm my-[7px]">High-end trench coat by women for women</p>
              <div class="flex mt-[30px]">
                  <button class="bg-purple-600 w-full p-[10px] m-[10px] text-white rounded hover:bg-purple-400 hover:text-black  transition duration-500">Update</button>
                  <button class="bg-stone-600  w-full  p-[10px] m-[10px] text-white rounded hover:bg-red-600 hover:text-white  transition duration-500">Delete</button>
              </div>
  
  
          </div>
          <div  class=" w-[400px] bg-fuchsia-100 rounded-lg shadow-lg h-[400px]  p-[20px] m-[15px]">
              <img
                  :src="TrouserImage"
                  alt="tuxedo Image"
                  class="w-full  rounded-lg h-[200px] items-center justify-center "
                />
              <h1 class="font-bold text-2xl my-[7px]">Tailored Trousers</h1>
              <p class="text-sm my-[7px]">Women tailored trousers perfect for every work day</p>
              <div class="flex mt-[30px]">
                  <button class="bg-purple-600 w-full p-[10px] m-[10px] text-white rounded hover:bg-purple-400 hover:text-black  transition duration-500">Update</button>
                  <button class="bg-stone-600  w-full  p-[10px] m-[10px] text-white rounded hover:bg-red-600 hover:text-white  transition duration-500">Delete</button>
              </div>
  
  
          </div>
          <div  class=" w-[400px] bg-fuchsia-100 rounded-lg shadow-lg h-[400px]  p-[20px] m-[15px]">
              <img
                  :src="SuitImage"
                  alt="tuxedo Image"
                  class="w-full  rounded-lg h-[200px] items-center justify-center "
                />
              <h1 class="font-bold text-2xl my-[7px]">Men's Double-Breasted Coat</h1>
              <p class="text-sm my-[7px]">A stylish, custom-tailored men's suit in charcoal gray</p>
              <div class="flex mt-[30px]">
                  <button class="bg-purple-600 w-full p-[10px] m-[10px] text-white rounded hover:bg-purple-400 hover:text-black  transition duration-500">Update</button>
                  <button class="bg-stone-600  w-full  p-[10px] m-[10px] text-white rounded hover:bg-red-600 hover:text-white  transition duration-500">Delete</button>
              </div>
  
  
          </div>
      </div> 
  </div>
      </div>
            <!-- Display Customers when Customers Section is Active -->
            <div v-if="activeContent.name === 'Customers'" class="mt-6">
  <div class="mb-8">
    
    <p class="text-gray-500 mt-1">View and manage your customer relationships</p>
  </div>

  <!-- Customer Cards Grid -->
  <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    <!-- Customer Card 1 -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 p-5">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center">
          <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
            <span class="text-purple-700 font-bold">AJ</span>
          </div>
          <div>
            <h3 class="font-semibold text-gray-800">Alex Johnson</h3>
            <span class="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Premium</span>
          </div>
        </div>
        <button class="text-gray-400 hover:text-gray-600">
          <i class="fas fa-ellipsis-v"></i>
        </button>
      </div>

      <div class="space-y-3 text-sm text-gray-600 border-t pt-4">
        <div class="flex items-center">
          <i class="fas fa-envelope text-gray-400 w-5 mr-3"></i>
          <span>alex.j@example.com</span>
        </div>
        <div class="flex items-center">
          <i class="fas fa-shopping-bag text-gray-400 w-5 mr-3"></i>
          <span>Last: Mar 18, 2025</span>
        </div>
        <div class="flex items-center">
          <i class="fas fa-wallet text-gray-400 w-5 mr-3"></i>
          <span>Total: $159.99</span>
        </div>
      </div>

      <div class="flex space-x-2 mt-4 pt-3 border-t">

        <router-link 
          to="/tailor-dashboard/Chat" 
          class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm text-center"
        >
        <i class="fas fa-comment-dots mr-1"></i> Message
        </router-link>

        
        <button class="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm">
          View Profile
        </button>
      </div>
    </div>

    <!-- Customer Card 2 -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 p-5">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center">
          <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3 overflow-hidden">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah" class="w-full h-full object-cover">
          </div>
          <div>
            <h3 class="font-semibold text-gray-800">Sarah Williams</h3>
            <span class="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">Regular</span>
          </div>
        </div>
        <button class="text-gray-400 hover:text-gray-600">
          <i class="fas fa-ellipsis-v"></i>
        </button>
      </div>

      <div class="space-y-3 text-sm text-gray-600 border-t pt-4">
        <div class="flex items-center">
          <i class="fas fa-envelope text-gray-400 w-5 mr-3"></i>
          <span>sarah.w@example.com</span>
        </div>
        <div class="flex items-center">
          <i class="fas fa-shopping-bag text-gray-400 w-5 mr-3"></i>
          <span>Last: Mar 16, 2025</span>
        </div>
        <div class="flex items-center">
          <i class="fas fa-wallet text-gray-400 w-5 mr-3"></i>
          <span>Total: $89.99</span>
        </div>
      </div>

      <div class="flex space-x-2 mt-4 pt-3 border-t">
        <router-link 
          to="/tailor-dashboard/Chat" 
          class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm text-center"
        >
        <i class="fas fa-comment-dots mr-1"></i> Message
      </router-link>
        <button class="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm">
          View Profile
        </button>
      </div>
    </div>

    <!-- Customer Card 3 -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 p-5">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center">
          <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
            <span class="text-purple-700 font-bold">MC</span>
          </div>
          <div>
            <h3 class="font-semibold text-gray-800">Michael Chen</h3>
            <span class="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Premium</span>
          </div>
        </div>
        <button class="text-gray-400 hover:text-gray-600">
          <i class="fas fa-ellipsis-v"></i>
        </button>
      </div>

      <div class="space-y-3 text-sm text-gray-600 border-t pt-4">
        <div class="flex items-center">
          <i class="fas fa-envelope text-gray-400 w-5 mr-3"></i>
          <span>michael.c@example.com</span>
        </div>
        <div class="flex items-center">
          <i class="fas fa-shopping-bag text-gray-400 w-5 mr-3"></i>
          <span>Last: Mar 20, 2025</span>
        </div>
        <div class="flex items-center">
          <i class="fas fa-wallet text-gray-400 w-5 mr-3"></i>
          <span>Total: $245.50</span>
        </div>
      </div>

      <div class="flex space-x-2 mt-4 pt-3 border-t">
        <router-link 
          to="/tailor-dashboard/Chat" 
          class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm text-center"
        >
        <i class="fas fa-comment-dots mr-1"></i> Message
      </router-link>
        <button class="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm">
          View Profile
        </button>
      </div>
    </div>
  </div>
</div>
     <!-- Chat Notifications -->
     <div v-if="activeContent.name === 'Chats'" class="mt-6">
  <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Chats</h2>
  
  <div class="space-y-4">
    <!-- Chat Item 1 -->
    <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-4 max-w-2xl mx-auto">
      <div class="flex items-center space-x-4">
        <div class="relative">
          <img 
            :src="TrouserImage" 
            alt="Customer" 
            class="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
          >
          <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex justify-between items-center">
            <h3 class="font-semibold text-gray-800 truncate">James Wilson</h3>
            <span class="text-xs text-gray-500">2 min ago</span>
          </div>
          <p class="text-gray-600 text-sm truncate">Hey, I wanted to check on my trouser order...</p>
        </div>
        <router-link 
          to="/tailor-dashboard/Chat" 
          class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Reply
        </router-link>
      </div>
    </div>

    <!-- Chat Item 2 -->
    <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-4 max-w-2xl mx-auto">
      <div class="flex items-center space-x-4">
        <div class="relative">
          <img 
            :src="Blazerimage" 
            alt="Customer" 
            class="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
          >
          <span class="absolute bottom-0 right-0 w-3 h-3 bg-gray-400 rounded-full border-2 border-white"></span>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex justify-between items-center">
            <h3 class="font-semibold text-gray-800 truncate">Sarah Johnson</h3>
            <span class="text-xs text-gray-500">1 hour ago</span>
          </div>
          <p class="text-gray-600 text-sm truncate">About the blazer design, I had some ideas...</p>
        </div>
        <router-link 
          to="/tailor-dashboard/Chat" 
          class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Reply
        </router-link>
      </div>
    </div>

    <!-- Chat Item 3 -->
    <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-4 max-w-2xl mx-auto">
      <div class="flex items-center space-x-4">
        <div class="relative">
          <img 
            :src="TuxedoImage" 
            alt="Customer" 
            class="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
          >
          <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex justify-between items-center">
            <h3 class="font-semibold text-gray-800 truncate">Michael Brown</h3>
            <span class="text-xs text-gray-500">Yesterday</span>
          </div>
          <p class="text-gray-600 text-sm truncate">The tuxedo fitting was perfect, thank you!</p>
        </div>
        <router-link 
          to="/tailor-dashboard/Chat" 
          class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Reply
        </router-link>
      </div>
    </div>
  </div>
</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store';
import { CogIcon, Home, List, MessageSquareIcon, ShoppingCart, Users } from 'lucide-vue-next';
import Blazerimage from"@/assets/images/card image (1).png";
  import TrouserImage from "@/assets/images/card image (2).png";
  import TuxedoImage from "@/assets/images/designersuit.png";
  import SuitImage from "@/assets/images/card image (3).png";

const router = useRouter();
const authStore = useAuthStore();

// Props for Sidebar visibility
const props = defineProps({
  isOpen: Boolean,
  activeContent: Object
});

// Emit function to toggle the sidebar
const emit = defineEmits(['toggleSidebar', 'update:activeContent']);
const toggleSidebar = () => {
  emit('toggleSidebar');
};

// Profile state
const showProfile = ref(false);
const fileInput = ref(null);
const profileForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  bio: ''
});

// Fetch user data from the store
const user = computed(() => authStore.user);
const logout = () => {
  authStore.logout();
}

// compute user initials from username
const userInitials = computed(() => {
  if (!user.value.username) return '';
  return user.value.username
    .split(' ')
    .map((name) => name[0])
    .join('')
    .toUpperCase();
});

// Profile navigation
const navigateToProfile = () => {
  showProfile.value = true;
  if (isMobile.value) {
    toggleSidebar();
  }
  // Initialize form with user data
  profileForm.value = {
    firstName: user.value.firstName || '',
    lastName: user.value.lastName || '',
    email: user.value.email || '',
    bio: user.value.bio || ''
  };
};

// Profile image handling
const triggerFileInput = () => {
  fileInput.value.click();
};

const handleProfileImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      // Update user profile image in store
      authStore.updateUser({ profileImage: e.target.result });
    };
    reader.readAsDataURL(file);
  }
};

const updateProfile = () => {
  // Update user profile in store
  authStore.updateUser(profileForm.value);
  showProfile.value = false;
};

// Menu items with content linked to each section
const menuItems = [
  { name: 'Dashboard', icon: Home, content: { name: 'Dashboard', content: 'Social Media Feed, Promotions, and Legal/Compliance' } },
  { name: 'Orders', icon: ShoppingCart, content: { name: 'Orders', title: 'Your Orders', content: 'Here are your orders and details.' } },
  { name: 'Products', icon: List, content: { name: 'Products', title: '', content: 'Add and update products.' } },
  { name: 'Customers', icon: Users, content: { name: 'Customers', title: 'Customer Insights', content: 'Manage and view customer data.' } },
  { name: 'Chats', icon: MessageSquareIcon, content: { name: 'Chats', title: '', content: 'Manage Notifications.' } },

];

// set active content and handle sidebar toggle for mobile view
const setActiveContent = (content) => {
  showProfile.value = false;
  emit('update:activeContent', content);
  if (isMobile.value) {
    toggleSidebar();
  }
};

// Handle resizing for mobile view
const isMobile = ref(window.innerWidth <= 768);
const updateIsMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};
window.addEventListener('resize', updateIsMobile);
onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile);
});
</script>

<style scoped>
/* Styling for sidebar links */
.sidebar-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a5568;
  transition: color 0.2s;
}

.sidebar-link:hover {
  color: #6b46c1;
}

.active {
  color: #6b46c1;
  font-weight: 600;
}

/* Profile section styling */
.profile-content {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Logout button styling */
#logout {
  color: #f5f5f5;
}

#logout:hover {
  transform: translateY(-3px);
  color: #e0e0e0;
}

@media (max-width: 768px) {
  aside {
    width: 75%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 50;
  }
}

</style>