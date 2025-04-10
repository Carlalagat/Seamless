<template>
  <div class="container mx-auto px-4 py-8 md:py-16 lg:py-20">
    <div class="flex flex-col lg:flex-row gap-8 lg:gap-12">
      <!-- Contact Form Section -->
      <div
        class="w-full lg:w-2/3 xl:w-3/5 bg-white p-6 md:p-10 lg:p-12 rounded-lg shadow-lg"
      >
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
          Get In Touch
        </h2>
        <p class="text-gray-600 text-base md:text-xl mb-6 lg:mb-8">
          Have questions? We are here to help. Send us a message and we will
          reply as soon as possible!
        </p>

        <form @submit.prevent="sendEmail" class="space-y-4 md:space-y-6">
          <div>
            <label
              class="block text-gray-700 font-semibold text-base md:text-lg mb-2"
              >Name</label
            >
            <input
              v-model="form.name"
              type="text"
              placeholder="Your name"
              required
              class="w-full p-3 md:p-4 border rounded-lg bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label
              class="block text-gray-700 font-semibold text-base md:text-lg mb-2"
              >Email</label
            >
            <input
              v-model="form.email"
              type="email"
              placeholder="your@gmail.com"
              required
              class="w-full p-3 md:p-4 border rounded-lg bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label
              class="block text-gray-700 font-semibold text-base md:text-lg mb-2"
              >Subject</label
            >
            <input
              v-model="form.subject"
              type="text"
              placeholder="How can we help?"
              required
              class="w-full p-3 md:p-4 border rounded-lg bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label
              class="block text-gray-700 font-semibold text-base md:text-lg mb-2"
              >Message</label
            >
            <textarea
              v-model="form.message"
              placeholder="Your message"
              rows="6"
              required
              class="w-full p-3 md:p-4 border rounded-lg bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>

          <button
            type="submit"
            class="w-full bg-purple-600 text-white p-3 md:p-4 rounded-lg hover:bg-purple-700 font-semibold transition-colors duration-300"
          >
            Send Message
          </button>
        </form>

        <p
          v-if="responseMessage"
          class="mt-4 text-lg font-semibold text-center"
          :class="{ 'text-green-600': success, 'text-red-600': !success }"
        >
          {{ responseMessage }}
        </p>
      </div>

      <!-- Contact Information Section -->
      <div
        class="w-full lg:w-1/3 xl:w-2/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6"
      >
        <div
          class="bg-purple-100 p-5 md:p-6 rounded-lg shadow-xl flex items-center space-x-4"
        >
          <i
            class="fas fa-map-marker-alt text-purple-600 text-2xl md:text-3xl"
          ></i>
          <div>
            <h3 class="text-base md:text-lg font-semibold">Visit Us</h3>
            <p class="text-gray-600 text-sm md:text-base">
              Nakuru, Kenyatta Avenue<br />Kenya, 20100
            </p>
          </div>
        </div>
        <div
          class="bg-purple-100 p-5 md:p-6 rounded-lg shadow-xl flex items-center space-x-4"
        >
          <i class="fas fa-phone text-purple-600 text-2xl md:text-3xl"></i>
          <div>
            <h3 class="text-base md:text-lg font-semibold">Call Us</h3>
            <p class="text-gray-600 text-sm md:text-base">
              Mon-Fri, 8am to 5pm<br />+254 123 245 678
            </p>
          </div>
        </div>
        <div
          class="bg-purple-100 p-5 md:p-6 rounded-lg shadow-xl flex items-center space-x-4"
        >
          <i class="fas fa-envelope text-purple-600 text-2xl md:text-3xl"></i>
          <div>
            <h3 class="text-base md:text-lg font-semibold">Email Us</h3>
            <p class="text-gray-600 text-sm md:text-base break-words">
              support@seamless.com<br />customercare@seamless.com
            </p>
          </div>
        </div>
        <div
          class="bg-purple-100 p-5 md:p-6 rounded-lg shadow-xl flex items-center space-x-4"
        >
          <i class="fas fa-clock text-purple-600 text-2xl md:text-3xl"></i>
          <div>
            <h3 class="text-base md:text-lg font-semibold">Business Hours</h3>
            <p class="text-gray-600 text-sm md:text-base">
              Monday to Friday<br />24hrs
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emailjs from "emailjs-com";

export default {
  data() {
    return {
      form: { name: "", email: "", subject: "", message: "" },
      responseMessage: "",
      success: false,
    };
  },
  methods: {
    sendEmail() {
      emailjs
        .send(
          "service_exl3s82",
          "template_s5jcnqc",
          this.form,
          "axpEegaKN-SXy50vX",
        )
        .then(() => {
          this.responseMessage = "Message sent successfully!";
          this.success = true;
          this.form = { name: "", email: "", subject: "", message: "" }; // Reset form
        })
        .catch(() => {
          this.responseMessage = "Failed to send message.";
          this.success = false;
        });
    },
  },
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css");
</style>
