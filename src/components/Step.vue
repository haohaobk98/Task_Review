<template>
  <div class="wrap" :style="wrapStyle">
    <div v-if="order == 1" class="wrap-up">
     <slot />
    </div>

    <div class="step">
      <div :style="arrowLeftStepStyles" class="arrow-step"></div>
      <div class="main-step" :style="mainStepStyles">
        <span v-if="text" class="text-step">{{ text }} </span>
      </div>
      <div :style="arrowRightStepStyles" class="arrow-step"></div>
    </div>

   <div v-if="order != 1" class="wrap-down">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "Step",
  props: {
    text: {
      type: String,
      required: false,
    },
    padding: {
      type: Number,
      required: false,
    },
    height: {
      type: Number,
      required: false,
    },
    position: {
      type: Number,
      required: false,
      default: ()=> 0
    },
    doubleStep: {
      type: Boolean,
      required: false,
      default: ()=> false
    },
    type: {
      type: String,
      required: false,
      default: "warning",
      validator: function (value) {
        // The value must match one of these strings
        return (
          [
            "success",
            "success-light",
            "warning",
            "warning-light",
            "danger",
            "default",
            "white-dark-text",
          ].indexOf(value) !== -1
        );
      },
    },
    visited: {
      type: Number,
      required: false,
      default: ()=> 0,
    },
    order: {
      type: Number,
      required: false,
      default: ()=> 0,
    }
  },
  computed: {
    bgColor() {
      const bgColor = this.visited == 0 ? '#b4e1e8' : (this.visited == 1 ? '#007bff' : '#d3d3d3')
      return bgColor;
    },

    wrapStyle() {
      const style = this.height ? `
        height: ${this.height}px !important;
        margin-bottom: 2px;
      ` : ''
      return `${style}`
    },

    mainStepStyles() {
      const height =
        this.height && this.height % 2 == 0 ? this.height : this.height + 1;
      const heightStyle = this.height
        ? `height: ${height}px; line-height: ${height}px`
        : "";
      const hPadding = this.padding
        ? `
        padding-left: ${this.padding}px;
        padding-right: ${this.padding}px;
        background-color: ${this.bgColor};
      `
        : "";

      return `${heightStyle};${hPadding};${this.stepStyles}`;
    },

    arrowRightStepStyles() {
      const height = this.height && this.height % 2 == 0 ? this.height : this.height + 1;
      let borderBottom = `${height/2}px solid transparent`;
      let borderTop = `${height/2}px solid transparent`;
      let borderLeft =`${this.height/2}px solid ${this.bgColor}`;

      if (this.doubleStep) {
        if (this.order == 1) {
          borderBottom = '';
          borderTop = this.position == 0 ? '' : `${height}px solid transparent`;
          borderLeft =`${this.height}px solid ${this.bgColor}`;
        } else {
          borderBottom = this.position == 0 ? '' : `${height}px solid transparent`;
          borderTop = '';
          borderLeft =`${this.height}px solid ${this.bgColor}`;
        }
      }

      const borderStyle = this.height ?  `
          border-top: ${borderTop};
          border-left: ${borderLeft};
          border-bottom: ${borderBottom};
          ` : ''
      return `${borderStyle};`;
    },

    arrowLeftStepStyles() {
      const height = this.height && this.height % 2 == 0 ? this.height : this.height + 1;
      let borderBottom = this.position == 0 ? `${height/2}px solid ${this.bgColor}` : `${height/2}px solid ${this.bgColor}`;
      let borderTop = this.position == 0 ? `${height/2}px solid ${this.bgColor}` : `${height/2}px solid ${this.bgColor}`;
      let borderLeft = this.position == 0 ? `${height/2}px solid ${this.bgColor}` : `${this.height/2}px solid transparent`;

      if (this.doubleStep) {
        if (this.order == 1) {
          borderBottom = '';
          borderTop = this.position == 0 ? '' : `${height}px solid ${this.bgColor}`;
          borderLeft =`${this.height}px solid transparent`;
        } else {
          borderBottom = this.position == 0 ? '' : `${height}px solid ${this.bgColor}`;
          borderTop = '';
          borderLeft =`${this.height}px solid transparent`;
        }
      }
      const borderStyle = this.height ?  `
          border-top: ${borderTop};
          border-left: ${borderLeft};
          border-bottom: ${borderBottom};
          ` : ''
      return `${borderStyle};`;
    },
  },
  data() {
    return {
    };
  },
  methods: {},
};
</script>

<style>
.step {
  display: inline-flex;
}
.main-step {
  vertical-align: middle;
  text-align: center;
  color: #ffffff;
  position: relative;
}

.arrow-step {
  width: 0;
  height: 0;
}

.wrap {
  position: relative;
}
.wrap-up {
  position: absolute;
  top: -40px;
  left: 40%;
}

.wrap-down {
  position: absolute;
  bottom: -40px;
  left: 40%;
}
</style>
