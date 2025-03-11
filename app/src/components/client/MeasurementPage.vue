<template>
    <div class="container mx-auto px-4 py-12">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4 text-[#2C3E50]">Take Your Measurements</h1>
        <p class="text-xl text-gray-600">Follow our step-by-step guide for accurate measurements</p>
      </div>
  
      <el-steps :active="activeStep" finish-status="success" class="mb-8">
        <el-step v-for="step in steps" :key="step.label" :title="step.label" />
      </el-steps>
  
      <el-row :gutter="24">
        <el-col :span="12">
          <el-card class="measurement-card">
            <template #header>
              <div class="flex items-center justify-between">
                <span class="text-lg font-semibold">{{ currentStep.label }}</span>
                <el-button :icon="HelpCircle" circle @click="toggleTips" />
              </div>
            </template>
  
            <p class="text-gray-600 mb-4">{{ currentStep.instructions }}</p>
            
            <el-collapse-transition>
              <div v-show="showTips" class="tips-section">
                <ul class="list-disc pl-4 text-gray-700">
                  <li v-for="tip in currentStep.tips" :key="tip">{{ tip }}</li>
                </ul>
              </div>
            </el-collapse-transition>
  
            <el-form-item :error="measurementError" class="mb-0">
              <el-input-number v-model="measurements[currentStep.label]" :min="currentStep.minValue" :max="currentStep.maxValue" :step="0.5" class="w-full" />
            </el-form-item>
          </el-card>
        </el-col>
  
        <el-col :span="12">
          <el-card>
            <template #header>
              <span class="text-lg font-semibold">Video Tutorial</span>
            </template>
            <div class="aspect-video bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
              Video tutorial for {{ currentStep.label }} measurement
            </div>
          </el-card>
        </el-col>
      </el-row>
  
      <div class="flex justify-between mt-4">
        <el-button :icon="ArrowLeft" @click="previousStep" :disabled="activeStep === 0">Back</el-button>
        <el-button v-if="isLastStep" type="primary" :icon="Save" :loading="saving" @click="saveMeasurements" :disabled="!isCurrentStepValid">Save</el-button>
        <el-button v-else type="primary" @click="nextStep" :disabled="!isCurrentStepValid">Next</el-button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { HelpCircle, ArrowLeft, Save } from 'lucide-vue-next';

  
  const steps = [
    { label: 'Chest', instructions: 'Measure around the fullest part of your chest, keeping the tape parallel to the ground.', minValue: 30, maxValue: 60, unit: 'inches', tips: ['Keep tape level.'] },
    { label: 'Waist', instructions: 'Measure your natural waistline.', minValue: 24, maxValue: 50, unit: 'inches', tips: ['Don’t hold your breath.'] },
    { label: 'Shoulders', instructions: 'Measure from the edge of one shoulder to the edge of the other.', minValue: 14, maxValue: 24, unit: 'inches', tips: ['Stand straight.'] },
  ];
  
  const activeStep = ref(0);
  const showTips = ref(false);
  const measurements = ref({});
  const saving = ref(false);
  
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
  const nextStep = () => { if (activeStep.value < steps.length - 1) activeStep.value++; };
  const previousStep = () => { if (activeStep.value > 0) activeStep.value--; };
  const saveMeasurements = async () => {
    saving.value = true;
    await new Promise(resolve => setTimeout(resolve, 1500));
    saving.value = false;
    alert('Measurements saved successfully!');
  };
  </script>
  
  <style scoped>
  .measurement-card { height: 100%; }
  .tips-section { margin-top: 10px; padding: 10px; background: #f5f5f5; border-left: 4px solid #007bff; }
  </style>
