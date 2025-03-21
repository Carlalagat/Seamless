<template>
    <div class="h-screen w-full grid grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] gap-3  overflow-auto">
       <div class=" flex justify-center items-center " >
        <form action="" class="flex flex-col p-[30px] rounded shadow-lg">
            <h1 class=" font-bold text-2xl text-center my-3">Post Your Designs</h1>
            <input type="file" class="my-1 p-[10px] border border-purple-300 rounded" accept="image/jpg, image/png, image/jpeg" required >
            <input type="text"  class="my-1 p-[10px] rounded shadow-lg border border-purple-300"  placeholder="Design" required>
            <textarea class="resize-none my-1 p-[10px] rounded shadow-lg border border-purple-300"  name="" id="" cols="30" rows="10" placeholder="Description"></textarea>
            <button type="submit" class="bg-purple-700 p-[10px] rounded text-white font-bold shadow-lg" >UPLOAD</button>

        </form>
       </div> 
    
    <div class=" shadow-lg rounded grid grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] gap-3    " >
        
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
</template>
<script setup>
import Blazerimage from"@/assets/images/card image (1).png";
import TrouserImage from "@/assets/images/card image (2).png";
import TuxedoImage from "@/assets/images/designersuit.png";
import SuitImage from "@/assets/images/card image (3).png";
</script>