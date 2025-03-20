<template>
    <div class="min-h-screen flex items-center justify-center">
        <div class="flex flex-col bg-slate-200 rounded-lg shadow-lg p-8 w-full max-w-md">
            <form @submit.prevent="onsubmit" class="flex space-y-4">
                <h2 class="text-2xl text-gray-800 mb-6">
                Post a Product
            </h2>
            <img src="https://fakeimg.pl/400x400" alt="product" class="shadow-md rounded-md mb-4">
            <h3 class="text-gray-700 font-bold"> 
                <!-- {{ card.title }} -->
            </h3>
            <p>
                <!-- {{ card.description }} -->
            </p>
            <button 
              type="submit"
              class="bg-[ac1bf5] rounded-lg py-2 px-6 flex justify-center items-center text-white text-base hover:bg-purple-600 w-full"
            >
            Post
            </button>
            </form>
        </div>
    </div>
</template>

<script>
// const onSubmit = 
</script>