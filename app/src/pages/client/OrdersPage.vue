<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
  />
  <div class="h-screen w-full bg-gray-100 overflow-auto">
    <div class="h-25 w-full p-7 flex justify-between border-b-2">
      <div>
        <h2 class="text-5xl font-bold text-center text-gray-800 mb-6">
          My Orders
        </h2>
        <p>Manage Your Orders</p>
      </div>
      <div>
        <form action="">
          <input
            type="text"
            class="border border-gray-600 rounded shadow-lg bg-gray-100"
            required
          />
          <button
            class="bg-green-500 rounded px-2 m-2 hover:bg-blue-700 hover:text-white transition duration-500"
          >
            <i class="fa fa-search"></i> Search
          </button>
        </form>
      </div>
    </div>

    <div class="h-screen">
      <table class="w-full text-center border-collapse">
        <thead>
          <tr class="border-b">
            <td class="p-2 font-bold"><i class="fa fa-image"></i> Image</td>
            <td class="p-2 font-bold">
              <i class="fa fa-receipt"></i> Order Number
            </td>
            <td class="p-2 font-bold"><i class="fa fa-user"></i> Customer</td>
            <td class="p-2 font-bold">
              <i class="fa fa-calendar-alt"></i> Order date
            </td>
            <td class="p-2 font-bold">
              <i class="fa fa-circle-check"></i> Status
            </td>
            <td class="p-2 font-bold">
              <i class="fa fa-money-bill-wave"></i> Amount
            </td>
            <td class="p-2 font-bold"><i class="fa fa-credit-card"></i> Pay</td>
            <td class="p-2 font-bold">Share</td>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="p-2 items-center justify-center flex">
              <img
                :src="Kitengeimage"
                alt="Kitenge Image"
                class="w-20 rounded-full items-center justify-center flex"
              />
            </td>
            <td class="p-2" items-center justify-center flex>
              <input type="checkbox" /> 563546274657
            </td>
            <td class="p-2">Jane Cooper</td>
            <td>2/19/21</td>
            <td class="p-2">
              <button class="bg-green-100 text-green-900 rounded w-24">
                Delivered
              </button>
            </td>
            <td>$500.00</td>
            <td class="p-2">
              <button
                class="bg-gray-300 text-gray-700 p-2 rounded shadow-lg w-24"
              >
                Pay
              </button>
            </td>
            <td>
              <a href="#"
                ><i class="fa fa-share-from-square text-[20px]"></i
              ></a>
            </td>
          </tr>

          <tr class="border-b bg-gray-200">
            <td class="p-2 items-center justify-center flex">
              <img
                :src="SuitImage"
                alt="suit Image"
                class="w-20 rounded-full items-center justify-center flex"
              />
            </td>
            <td class="p-2" items-center justify-center flex>
              <input type="checkbox" /> 567600074657
            </td>
            <td class="p-2">Wade Warren</td>
            <td>5/7/16</td>
            <td class="p-2">
              <button class="bg-green-100 text-green-900 rounded w-24">
                Delivered
              </button>
            </td>
            <td>$500.00</td>
            <td class="p-2">
              <button
                class="bg-gray-300 text-gray-700 p-2 rounded shadow-lg w-24"
              >
                Pay
              </button>
            </td>
            <td>
              <a href="#"
                ><i class="fa fa-share-from-square text-[20px]"></i
              ></a>
            </td>
          </tr>
          <tr class="border-b">
            <td class="p-2 items-center justify-center flex">
              <img
                :src="DressImage"
                alt="dress Image"
                class="w-20 rounded-full items-center justify-center flex"
              />
            </td>
            <td class="p-2" items-center justify-center flex>
              <input type="checkbox" /> 679085274657
            </td>
            <td class="p-2">Esther Howard</td>
            <td>9/18/21</td>
            <td class="p-2">
              <button class="bg-red-100 text-red-900 rounded w-24">
                Pending
              </button>
            </td>
            <td>$500.00</td>
            <td class="p-2">
              <button
                class="bg-purple-600 text-white p-2 rounded shadow-lg w-24"
              >
                Pay
              </button>
            </td>
            <td>
              <a href="#"
                ><i class="fa fa-share-from-square text-[20px]"></i
              ></a>
            </td>
          </tr>

          <tr class="border-b bg-gray-200">
            <td class="p-2 items-center justify-center flex">
              <img
                :src="TuxedoImage"
                alt="tuxedo Image"
                class="w-20 rounded-full items-center justify-center flex"
              />
            </td>
            <td class="p-2" items-center justify-center flex>
              <input type="checkbox" /> 8896466274657
            </td>
            <td class="p-2">Cameron Williamson</td>
            <td>2/11/12</td>
            <td class="p-2">
              <button class="bg-green-100 text-green-900 rounded w-24">
                Delivered
              </button>
            </td>
            <td>$500.00</td>
            <td class="p-2">
              <button
                class="bg-gray-300 text-gray-700 p-2 rounded shadow-lg w-24"
              >
                Pay
              </button>
            </td>
            <td>
              <a href="#"
                ><i class="fa fa-share-from-square text-[20px]"></i
              ></a>
            </td>
          </tr>

          <tr class="border-b">
            <td class="p-2 items-center justify-center flex">
              <img
                :src="casualWear"
                alt="casual Image"
                class="w-20 rounded-full items-center justify-center flex"
              />
            </td>
            <td class="p-2" items-center justify-center flex>
              <input type="checkbox" /> 2228888746577
            </td>
            <td class="p-2">Brooklyn Simmons</td>
            <td>9/18/16</td>
            <td class="p-2">
              <button class="bg-red-100 text-red-900 rounded w-24">
                Pending
              </button>
            </td>
            <td>$500.00</td>
            <td class="p-2">
              <button
                class="bg-purple-600 text-white p-2 rounded shadow-lg w-24"
              >
                Pay
              </button>
            </td>
            <td>
              <a href="#"
                ><i class="fa fa-share-from-square text-[20px]"></i
              ></a>
            </td>
          </tr>

          <tr class="border-b bg-gray-200">
            <td class="p-2 items-center justify-center flex">
              <img
                :src="pants"
                alt="pants Image"
                class="w-20 rounded-full items-center justify-center flex"
              />
            </td>
            <td class="p-2" items-center justify-center flex>
              <input type="checkbox" /> 563546274657
            </td>
            <td class="p-2">Leslie Alexander</td>
            <td>1/28/17</td>
            <td class="p-2">
              <button class="bg-red-100 text-red-900 rounded w-24">
                Pending
              </button>
            </td>
            <td>$500.00</td>
            <td class="p-2">
              <button
                class="bg-purple-600 text-white p-2 rounded shadow-lg w-24"
              >
                Pay
              </button>
            </td>
            <td>
              <a href="#"
                ><i class="fa fa-share-from-square text-[20px]"></i
              ></a>
            </td>
          </tr>

          <tr class="border-b">
            <td class="p-2 items-center justify-center flex">
              <img
                :src="formalShirts"
                alt="formal shirts Image"
                class="w-20 rounded-full items-center justify-center flex"
              />
            </td>
            <td class="p-2" items-center justify-center flex>
              <input type="checkbox" /> 475896074657
            </td>
            <td class="p-2">Jenny Wilson</td>
            <td>5/27/15</td>
            <td class="p-2">
              <button class="bg-green-100 text-green-900 rounded w-24">
                Delivered
              </button>
            </td>
            <td>$500.00</td>
            <td class="p-2">
              <button
                class="bg-gray-300 text-gray-700 p-2 rounded shadow-lg w-24"
              >
                Pay
              </button>
            </td>
            <td>
              <a href="#"
                ><i class="fa fa-share-from-square text-[20px]"></i
              ></a>
            </td>
          </tr>

          <tr class="border-b bg-gray-200">
            <td class="p-2 items-center justify-center flex">
              <img
                :src="suitstrousers"
                alt="suitstrousers Image"
                class="w-20 rounded-full items-center justify-center flex"
              />
            </td>
            <td class="p-2" items-center justify-center flex>
              <input type="checkbox" /> 678946274657
            </td>
            <td class="p-2">Guy Hawkins</td>
            <td>8/2/19</td>
            <td class="p-2">
              <button class="bg-green-100 text-green-900 rounded w-24">
                Delivered
              </button>
            </td>
            <td>$500.00</td>
            <td class="p-2">
              <button
                class="bg-purple-600 text-white p-2 rounded shadow-lg w-24"
              >
                Pay
              </button>
            </td>
            <td>
              <a href="#"
                ><i class="fa fa-share-from-square text-[20px]"></i
              ></a>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-center items-center mt-5">
        <a
          href="tel:+254745230498"
          class="bg-purple-500 p-2 rounded shadow-lg text-white hover:bg-blue-500 transition duration-500"
        >
          <i class="fa fa-phone"></i> Contact Support</a
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import Kitengeimage from "@/assets/images/kitenge.webp";
import SuitImage from "@/assets/images/kaunda.webp";
import DressImage from "@/assets/images/dress.webp";
import TuxedoImage from "@/assets/images/tuxedo.webp";
import casualWear from "@/assets/images/casual wear.png";
import pants from "@/assets/images/pants.png";
import formalShirts from "@/assets/images/formal shirts.png";
import suitstrousers from "@/assets/images/suits&trousers.png";
</script>
