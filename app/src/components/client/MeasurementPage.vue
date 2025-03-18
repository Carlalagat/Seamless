<template>
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-10">
      <h1 class="text-4xl font-bold mb-2 text-[#2C3E50]">Take Your Measurements</h1>
      <p class="text-lg text-gray-600">Follow our step-by-step guide for accurate measurements</p>
    </div>

    <!-- Progress Steps -->
    <div class="w-full mb-10">
      <el-steps :active="activeStep" finish-status="success" simple class="custom-steps">
        <el-step 
          v-for="(step, index) in steps" 
          :key="step.label" 
          :title="step.label" 
          :icon="index + 1"
        />
      </el-steps>
    </div>

    <!-- Success Alert (shown when measurements are saved) -->
    <div v-if="measurementsSaved" class="flex items-center p-4 mb-6 bg-green-50 border border-green-200 rounded-lg">
      <div class="flex items-center justify-center w-6 h-6 bg-green-500 text-white rounded-full mr-3">
        <CheckIcon class="w-4 h-4" />
      </div>
      <p class="text-green-700">Your measurements have been saved successfully!</p>
    </div>

    <!-- Start New Measurements Button (shown after measurements are saved) -->
    <button 
      v-if="measurementsSaved"
      @click="startNewMeasurements" 
      class="flex items-center px-4 py-2 mb-6 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
    >
      <PlusCircleIcon class="w-4 h-4 mr-2" />
      Start New Measurements
    </button>

    <!-- Measurement Cards -->
    <div v-if="!measurementsSaved" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Left Card: Measurement Input -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 class="text-lg font-medium">{{ currentStep.label }}</h2>
          <el-button :icon="HelpCircle" circle size="small" @click="toggleTips" class="text-gray-400" />
        </div>
        
        <div class="p-6">
          <p class="text-gray-600 mb-6">{{ currentStep.instructions }}</p>
          
          <el-collapse-transition>
            <div v-show="showTips" class="tips-section mb-6">
              <ul class="list-disc pl-4 text-gray-700">
                <li v-for="tip in currentStep.tips" :key="tip">{{ tip }}</li>
              </ul>
            </div>
          </el-collapse-transition>
          
          <div class="flex items-center">
            <button 
              @click="decrementValue" 
              class="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50"
            >
              <span class="text-xl">−</span>
            </button>
            
            <div class="flex-1 mx-2">
              <input 
                type="text" 
                :placeholder="`Enter ${currentStep.label.toLowerCase()} measurement`"
                v-model="measurements[currentStep.label]"
                class="w-full border border-gray-300 rounded-md px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <button 
              @click="incrementValue" 
              class="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50"
            >
              <span class="text-xl">+</span>
            </button>
          </div>
          
          <div v-if="measurementError" class="text-red-500 text-sm mt-2">
            {{ measurementError }}
          </div>
        </div>
      </div>
      
      <!-- Right Card: Video Tutorial -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-4 border-b border-gray-200">
          <h2 class="text-lg font-medium">Video Tutorial</h2>
        </div>
        
        <div class="p-6">
          <!-- Video tutorial container -->
          <div class="aspect-video mb-6 rounded-md overflow-hidden">
            <!-- Replace the placeholder div with actual video content when available -->
            <div v-if="!videoUrls[currentStep.label]" class="flex items-center justify-center w-full h-full bg-gray-100">
              <p class="text-gray-500">Video tutorial for {{ currentStep.label.toLowerCase() }} measurement</p>
            </div>
            <iframe 
              v-else
              :src="videoUrls[currentStep.label]" 
              class="w-full h-full" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
            ></iframe>
          </div>
          
          <div class="flex justify-between items-center">
            <button 
              @click="previousStep" 
              :disabled="activeStep === 0" 
              class="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeftIcon class="h-4 w-4 mr-1" />
              Back
            </button>
            
            <button 
              v-if="!isLastStep"
              @click="nextStep" 
              :disabled="!isCurrentStepValid" 
              class="flex items-center px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ArrowRightIcon class="h-4 w-4 ml-1" />
            </button>
            
            <button 
              v-else
              @click="saveMeasurements" 
              :disabled="!isCurrentStepValid" 
              class="flex items-center px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SaveIcon class="h-4 w-4 mr-1" />
              Save Measurements
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { HelpCircle } from 'lucide-vue-next';
import { 
  CheckIcon, 
  PlusCircleIcon, 
  SaveIcon, 
  ArrowLeftIcon, 
  ArrowRightIcon 
} from 'lucide-vue-next';

const steps = [
  { 
    label: 'Chest', 
    instructions: 'Measure around the fullest part of your chest, keeping the tape parallel to the ground.', 
    minValue: 30, 
    maxValue: 60, 
    unit: 'inches', 
    tips: ['Keep tape level.', 'Ensure the tape is snug but not tight.'] 
  },
  { 
    label: 'Waist', 
    instructions: 'Measure your natural waistline.', 
    minValue: 24, 
    maxValue: 50, 
    unit: 'inches', 
    tips: ["Don't hold your breath.", 'Stand relaxed for accurate measurements.'] 
  },
  { 
    label: 'Shoulders', 
    instructions: 'Measure from the edge of one shoulder to the edge of the other.', 
    minValue: 14, 
    maxValue: 24, 
    unit: 'inches', 
    tips: ['Stand straight.', 'Keep shoulders relaxed, not hunched.'] 
  },
];

// Video URLs for each measurement type
const videoUrls = {
  'Chest': 'https://www.youtube.com/embed/example_chest',
  'Waist': 'https://www.youtube.com/embed/example_waist',
  'Shoulders': 'https://www.youtube.com/embed/example_shoulders'
};

const activeStep = ref(0);
const showTips = ref(false);
const measurements = ref({});
const measurementsSaved = ref(false);

const currentStep = computed(() => steps[activeStep.value]);
const isLastStep = computed(() => activeStep.value === steps.length - 1);

const measurementError = computed(() => {
  const value = measurements.value[currentStep.value.label];
  if (!value) return '';
  if (value < currentStep.value.minValue || value > currentStep.value.maxValue) {
    return `Value must be between ${currentStep.value.minValue} and ${currentStep.value.maxValue} inches.`;
  }
  return '';
});

const isCurrentStepValid = computed(() => {
  const value = measurements.value[currentStep.value.label];
  return value !== undefined && !measurementError.value;
});

const toggleTips = () => (showTips.value = !showTips.value);

const nextStep = () => { 
  if (activeStep.value < steps.length - 1) activeStep.value++; 
};

const previousStep = () => { 
  if (activeStep.value > 0) activeStep.value--; 
};

const incrementValue = () => {
  const label = currentStep.value.label;
  if (!measurements.value[label]) {
    measurements.value[label] = currentStep.value.minValue;
  } else if (measurements.value[label] < currentStep.value.maxValue) {
    measurements.value[label] += 0.5;
  }
};

const decrementValue = () => {
  const label = currentStep.value.label;
  if (!measurements.value[label]) {
    measurements.value[label] = currentStep.value.minValue;
  } else if (measurements.value[label] > currentStep.value.minValue) {
    measurements.value[label] -= 0.5;
  }
};

// Save measurements function
const saveMeasurements = () => {
  // Here you would typically send the measurements to your backend
  console.log('Saving measurements:', measurements.value);
  
  // Show success message
  measurementsSaved.value = true;
};

// Start new measurements function
const startNewMeasurements = () => {
  // Reset all values
  measurements.value = {};
  activeStep.value = 0;
  measurementsSaved.value = false;
  showTips.value = false;
};
</script>

<style scoped>
.custom-steps :deep(.el-step__icon) {
  width: 32px;
  height: 32px;
  font-size: 14px;
  border: 2px solid;
}

.custom-steps :deep(.el-step__title) {
  font-size: 16px;
  font-weight: 500;
}

.custom-steps :deep(.el-step__line) {
  height: 2px;
  margin-top: 15px;
}

.custom-steps :deep(.is-process .el-step__icon) {
  background-color: #409eff;
  border-color: #409eff;
  color: white;
}

.custom-steps :deep(.is-wait .el-step__icon) {
  border-color: #c0c4cc;
  color: #c0c4cc;
}

.custom-steps :deep(.is-finish .el-step__icon) {
  background-color: #67c23a;
  border-color: #67c23a;
  color: white;
}

.tips-section {
  padding: 12px;
  background: #f5f7fa;
  border-left: 4px solid #409eff;
  border-radius: 4px;
}
</style>