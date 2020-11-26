<template>
  <div id="app">
    <div style="float: left">
      <button class="btn btn-primary" @click="start()" :disabled="startClicked">
        Start Process
      </button>
    </div>

    <div style="display: inline-flex">
      <div
        v-for="step in mockData"
        :key="step.id"
        :class="step.arrayStep.length > 1 ? 'double-step' : 'single-step'"
      >
        <Step
          v-for="subStep in step.arrayStep"
          :key="subStep.id"
          :text="subStep.text"
          :padding="subStep.padding"
          :height="subStep.height"
          :visited="subStep.visited"
          :position="subStep.position"
          :doubleStep="subStep.doubleStep"
          :order="subStep.order"
        >
          <button
            v-if="subStep.visited == 1"
            class="btn btn-primary btn-done"
            @click="moveNextStep(subStep)"
          >
            Done
          </button>
        </Step>
      </div>
    </div>
  </div>
</template>

<script>
import Step from "@/components/Step";
import Data from "@/mocks/stepData";
const DataStep = Data.mockData;
console.log("mock", DataStep);

export default {
  name: "App",
  components: {
    Step,
  },
  data() {
    return {
      mockData: [...DataStep],
      startClicked: false,
      currentStepItem: null,
      totalStep: DataStep.length,
      currentStepCount: 0,
      countDoubleStep: 0,
    };
  },
  methods: {
    start() {
      this.currentStepCount = 1
      this.startClicked = true;
      let currentStep = null;

      // find step and mark visited
      for (let index = 0; index < this.mockData.length; index++) {
        const element = this.mockData[index];
        currentStep = element.arrayStep.filter(
          (item) => item.step == this.currentStepCount
        );

        // case double step at the begining
        if (currentStep && currentStep.length > 0) {
          currentStep.forEach((step) => {
            step.visited = 1;
          });
          return
        }
      }
    },

    moveNextStep(step) {
      step.visited = 0;
      let currentStep = null;

      // find current step
      for (let index = 0; index < this.mockData.length; index++) {
        const element = this.mockData[index];
        currentStep = element.arrayStep.filter((item) => item.step == step.step);
        if (currentStep && currentStep.length > 0) {
          break;
        }
      }
      // double step
      if (currentStep && currentStep.length > 1) {
        this.countDoubleStep++;

        // complete all doudle step
        if (this.countDoubleStep < currentStep.length) {
          return;
        }
      }

      // finish all steps
      if (this.currentStepCount == this.totalStep) {
          this.startClicked = false;
          this.clearData()
          return;
      } else {
        this.currentStepCount++;
      }

      // find next step in array and mark visited
      for (let index = 0; index < this.mockData.length; index++) {
        const element = this.mockData[index];
        currentStep = element.arrayStep.filter((item) => item.step == this.currentStepCount);
        if (currentStep && currentStep.length > 0) {
            currentStep.forEach((step) => {
            step.visited = 1;
          });
          return
        }
      }
    },

    clearData() {
      this.currentStepCount = 0
      this.countDoubleStep = 0
      for (let index = 0; index < this.mockData.length; index++) {
        const element = this.mockData[index];
        element.arrayStep.forEach(item => {
          item.visited = 2
        });
      }
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.btn-done {
  height: 60%;
  text-align: center;
}
</style>
